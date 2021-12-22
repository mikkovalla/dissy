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
    if (i !== -1) {
        return users.splice(i, 1)[0];
    }
}

// Get game players
function getGamePlayers(game) {
    return players.filter(player => player.game === game)
}

// Get game player scores after n rolls
function getGamePlayerScoresAfterNRolls(game) {
    const gamePlayers = players.filter(player => player.game === game)
    //console.log('Gameplayers: ', gamePlayers)
    let scores = gamePlayers.map(player => player.score)
    console.log('Players scores: ', scores)

    //Return best score or scores if its a tie, returns indexes of best scores
    const bestScore = Math.max(...scores);
    const bestPlayers = [];
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] === bestScore) {
            bestPlayers.push(i);
        }
    }
    console.log('Best scores index: ', bestPlayers)
    
    if (bestPlayers.length == 1) {
        const winnerIndex = bestPlayers[0]
        console.log('winnerindex', winnerIndex)
        const winner = gamePlayers[winnerIndex]
        console.log('Gameplayers', gamePlayers)
        console.log('best player of the game: ', winner)
        return winner
    }
    if (bestPlayers.length !== 1) {
        return 0
    }
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