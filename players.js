// Class to define players
const players = []

// Join player to a game
function playerJoinGame(id, username, game) {
    const player = {
        id,
        username,
        game,
        rolls: 0,
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
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get game players
function getGamePlayers(game) {
    return players.filter(player => player.game === game)
}

// Get game player scores after n rolls
function getGamePlayerScoresAfterNRolls(game) {
    let gamePlayers = players.filter(player => player.game === game)
    console.log('Gameplayers: ', gamePlayers)

    return gamePlayers
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

// update player rolls
function updateRolls(id) {
    const player = players.find(player => player.id === id)
    player.rolls += 1
}

// get player rolls
function getPlayerRolls(id) {
    const player = players.find(player => player.id === id)
    return player.rolls
}

module.exports = {
    playerJoinGame,
    getPlayer,
    playerForfeit,
    getGamePlayers,
    updateScore,
    getPlayerScore,
    updateWins,
    updateRolls,
    getPlayerRolls,
    getGamePlayerScoresAfterNRolls
}