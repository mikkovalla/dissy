// Imports
const express = require('express')
const path = require('path')
const http = require('http')
const sockets = require('socket.io')

// Server Creation
const app = express()
// Direct access to http package method required in order to use socketio
const server = http.createServer(app)
// Create socket io server
const io = sockets(server)

// Socket io connection
io.on('connection', socket => {

    // Emit welcome message - Emits only to the connected player
    socket.emit('message', 'Welcome player # NameHere #')

    // Broadcast to other players that new player has joined
    socket.broadcast.emit('message', 'New player has joined the game # NameHere #')

    // Player leaves the game
    socket.on('forfeit', () => {
        io.emit('message', '# NameHere # is a looser and gave up!')
    })

    // Record rolled die value
    socket.on('dieValue', dieValue => {
        console.log(dieValue)
    })
})

// env.PORT specified here for future deployment
const PORT = 3000 || process.env.PORT
// Set static folder for UI
app.use(express.static(path.join(__dirname, 'UI')))

// run server
server.listen(PORT, () => console.log(`Server running at ${PORT}`))