// Access imported socket io
const socket = io();

const gameRolls = document.querySelector('.game-rolls')
const gameName = document.getElementById('game-name')
const playersList = document.getElementById('players')

// Grap username and game from URL
const {
    username,
    game
} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// Emit message
socket.on('message', message => {
    //console.log(message)
    renderMessage(message)
    gameRolls.scrollTop = gameRolls.scrollHeight
})

socket.emit('joinGame', {
    username,
    game
})

// Get players in the game
socket.on('gamePlayers', ({
    game,
    players
}) => {
    renderGameName(game)
    renderPlayers(players)
})

// Access dice roll button
const rollButton = document.getElementById('game-form')
rollButton.addEventListener('submit', e => {
    e.preventDefault()
    const dieValue = rolledDieNumber()
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
    console.log('Player', dieValue)
    const div = document.createElement('div')
    div.classList.add('result')
    // Never do this in prod, leaves a path for a XSS attack. Done here for speed and simplicity
    div.innerHTML =
        `<p class="meta">${dieValue.username} at <span>${dieValue.time} rolled ${dieValue.result}</span></p>`
    // append results to UI
    document.querySelector('.game-rolls').appendChild(div)
}

// Game name to UI
function renderGameName(game) {
    gameName.innerText = game
}

// Players list to UI
function renderPlayers(players) {
    console.log('Players: ', players)
    playersList.innerHTML = `
        ${players.map(player => `<li>${player.username} ${player.score}</li>`).join('')}
    `
}