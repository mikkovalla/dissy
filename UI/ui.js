// Access imported socket io
const socket = io();

// Emit message
socket.on('message', message => {
    console.log(message)
})

// Access dice roll button
const rollButton = document.getElementById('game-form')
rollButton.addEventListener('submit', e => {
    e.preventDefault()
    const dieValue = rolledDieNumber()
    //console.log(dieValue)
    // Emit Die value to server
    socket.emit('dieValue', dieValue)
})

function rolledDieNumber() {
    return Math.floor(Math.random() * 6) + 1
}