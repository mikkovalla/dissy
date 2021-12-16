// Class to define players
const players = []

// Join player to a game
function playerJoinGame(id, username, game) {
    const player = {
        id,
        username,
        game,
        score: []
    }

    players.push(player)
    return players
}

// fetch current user
function getPlayer(id) {
    return players.find(player => player.id === id)
}

// Remove user from array when they leave a game
function playerForfeit(id) {
    const player = players.find(player => player.id === id)
    console.log(player)
    players.filter(player => player.id !== id)
    return player
}

module.exports = {
    playerJoinGame,
    getPlayer,
    playerForfeit
}