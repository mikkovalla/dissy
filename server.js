// Imports
const express = require('express')
const path = require('path')
const http = require('http')
const sockets = require('socket.io')
const resultFormatter = require('./results')
const {
    playerJoinGame,
    getPlayer,
    playerForfeit,
    getGamePlayers,
    updateScore,
    getPlayerScore,
    updateWins,
    updateRolls,
    getPlayerRolls,
    getGamePlayerScoresAfterNRolls
} = require('./players')

// Server Creation
const app = express()
// Direct access to http package method required in order to use socketio
const server = http.createServer(app)
// Create socket io server
const io = sockets(server)

// Generic variable for game bot
const gameBot = 'Game Bot'

// Global number of rolls in the game
let numberOfRolls = 0

// Socket io connection
io.on('connection', socket => {
    let player = {}
    // Join player to a game
    socket.on('joinGame', ({
        username,
        game
    }) => {
        //create player object and join it to a game. Using socket ID for player ID to differentiate players since no DB is used.
        player = playerJoinGame(socket.id, username, game)
        console.log('Player joins', player)
        numberOfRolls = parseInt(player.game.substring(0, 1))
        socket.join(player.game)

        // Emit welcome message - Emits only to the connected player
        socket.emit('message', resultFormatter(gameBot, `Welcome to Dice Game!`))

        // Broadcast to other players in the specifix game that new player has joined
        socket.broadcast.to(player.game).emit('message', resultFormatter(gameBot, `${username} has joined the game`))

        // Emit players and game info
        io.to(player.game).emit('gamePlayers', {
            game: player.game,
            players: getGamePlayers(player.game)
        })
    })

    // Player leaves the game
    socket.on('forfeit', () => {
        //const player = getPlayer(socket.id)
        playerForfeit(socket.id)
        io.to(player.game).emit('message', resultFormatter(gameBot, `${player.username} is a looser and gave up!`))
        // Emit players and game info
        io.to(player.game).emit('gamePlayers', {
            game: player.game,
            players: getGamePlayers(player.game)
        })
    })

    // Record rolled die value
    socket.on('dieValue', dieValue => {
        //const player = getPlayer(socket.id)

        if (player.rolls === numberOfRolls - 1) {
            //emit die value to all players
            io.to(player.game).emit('message', resultFormatter(player.username, ` rolled ${dieValue}`))
            //save die value to player score
            updateScore(socket.id, dieValue)
            updateRolls(socket.id)
            // winner constant can be used to calculate the winner
            const winner = getGamePlayerScoresAfterNRolls(player.game)
            io.to(player.game).emit('message', resultFormatter(player.username, ` Has rolled ${numberOfRolls} times and reached the score ${getPlayerScore(socket.id)}`))
        } else {
            //emit die value to all players
            io.to(player.game).emit('message', resultFormatter(player.username, ` rolled ${dieValue}`))
            //save die value to player score
            updateScore(socket.id, dieValue)
            updateRolls(socket.id)
        }

        io.to(player.game).emit('gamePlayers', {
            game: player.game,
            players: getGamePlayers(player.game)
        })
        console.log('Player rolled the dice: ', player)
    })
})

// env.PORT specified here for future deployment
const PORT = 3000 || process.env.PORT
// Set static folder for UI
app.use(express.static(path.join(__dirname, 'UI')))

// run server
server.listen(PORT, () => console.log(`Server running at ${PORT}`))