// Access imported socket io
const socket = io();

// Emit welcome message
socket.on('message', message => {
    console.log(message)
})