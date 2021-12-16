// Imports
const express = require('express')
const path = require('path')
const http = require('http')
const sockets = require('socket.io')
const resultFormatter = require('./results')
const {
    playerJoinGame,
    getPlayer
} = require('./players')

// Server Creation
const app = express()
// Direct access to http package method required in order to use socketio
const server = http.createServer(app)
// Create socket io server
const io = sockets(server)

// Generic variable for game bot
const gameBot = 'Game Bot'

// Socket io connection
io.on('connection', socket => {

    // Join player to a game
    socket.on('joinGame', ({
        username,
        game
    }) => {
        //create player object and join it to a game. Using socket ID for player ID to differentiate players since no DB is used.
        const player = playerJoinGame(socket.id, username, game)
        socket.join(player.game)

        // Emit welcome message - Emits only to the connected player
        socket.emit('message', resultFormatter(gameBot, `Welcome to Dice Game!`))

        // Broadcast to other players in the specifix game that new player has joined
        socket.broadcast.to(player.game).emit('message', resultFormatter(gameBot, `${player.username} has joined the game`))
    })

    // Player leaves the game
    socket.on('forfeit', () => {
        const player = getPlayer(socket.id)
        io.emit('message', resultFormatter(gameBot, `${player.username} is a looser and gave up!`))
    })

    // Record rolled die value
    socket.on('dieValue', dieValue => {
        //console.log(dieValue)
        const player = getPlayer(socket.id)
        //emit die value to all players
        io.to(player.room).emit('message', resultFormatter(player.username, ` rolled ${dieValue}`))
    })
})

// env.PORT specified here for future deployment
const PORT = 3000 || process.env.PORT
// Set static folder for UI
app.use(express.static(path.join(__dirname, 'UI')))

// run server
server.listen(PORT, () => console.log(`Server running at ${PORT}`))