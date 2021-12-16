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

module.exports = {
    playerJoinGame,
    getPlayer
}