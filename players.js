// Class to define players
const players = []

// Join player to a game
function playerJoinGame(id, username, game) {
    const player = {
        id,
        username,
        game,
        score: 0,
        wins: 0
    }

    players.push(player)
    return player
}

// fetch current user
function getPlayer(id) {
    return players.find(player => player.id === id)
}

// Remove user from array when they leave a game
function playerForfeit(id) {
    const player = players.find(player => player.id === id)
    players.filter(player => player.id !== id)
    return player
}

// Get game players
function getGamePlayers(game) {
    return players.filter(player => player.game === game)
}

// push to player score
function updateScore(id, score) {
    const player = players.find(player => player.id === id)
    player.score += score
}

// Get player score
function getPlayerScore(id) {
    const player = players.find(player => player.id === id)
    return player.score
}

// update player wins
function updateWins(id, win) {
    const player = players.find(player => player.id === id)
    player.win += 1
}

module.exports = {
    playerJoinGame,
    getPlayer,
    playerForfeit,
    getGamePlayers,
    updateScore,
    getPlayerScore,
    updateWins
}