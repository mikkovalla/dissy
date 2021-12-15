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
    console.log('New connection established!')
})
// env.PORT specified here for future deployment
const PORT = 3000 || process.env.PORT
// Set static folder for UI
app.use(express.static(path.join(__dirname, 'UI')))

// run server
server.listen(PORT, () => console.log(`Server running at ${PORT}`))