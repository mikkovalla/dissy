// Access imported socket io
const socket = io();

const gameRolls = document.querySelector('.game-rolls')

// Grap username and game from URL
const { username, game } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// Emit message
socket.on('message', message => {
    //console.log(message)
    renderMessage(message)
    gameRolls.scrollTop = gameRolls.scrollHeight
})

socket.emit('joinGame', { username, game })

// Access dice roll button
const rollButton = document.getElementById('game-form')
rollButton.addEventListener('submit', e => {
    e.preventDefault()
    const dieValue = rolledDieNumber()
    console.log(dieValue)
    // Emit Die value to server
    socket.emit('dieValue', dieValue)
})

// function return random number between 1 - 6
function rolledDieNumber() {
    return Math.floor(Math.random() * 6) + 1
}

// Function to render messages from server to UI. includes rolled die scores
// this is a very generic and broad function that renders all outputs
// prod way would of been differentiating Game bot and player outputs
function renderMessage(dieValue) {
    const div = document.createElement('div')
    div.classList.add('result')
    // Never do this in prod, leaves a path for a XSS attack. Done here for speed and simplicity
    div.innerHTML = 
        `<p class="meta">${dieValue.username} <span>${dieValue.time}</span></p>
            <p class="score">
                ${dieValue.result}
        </p>`
    // append results to UI
    document.querySelector('.game-rolls').appendChild(div)
}