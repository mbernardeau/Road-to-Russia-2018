/* eslint-disable no-console */
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

exports.updateScore = functions.firestore.document('matches/{matchId}').onUpdate(change => {
  // Get final scores
  // odds: {1, 2, A, B, N}
  // scores: {A, B, winner}
  const { odds, scores } = change.after.data()
  if (
    scores === undefined ||
    scores.A === undefined ||
    scores.B === undefined ||
    scores.winner === undefined
  ) {
    console.log('No scores defined (sorry not sorry)')
    return null
  }
  // Get winner
  const { winner } = scores
  // Get bets
  const bets = db.collection('bets')
  return bets
    .where('matchId', '==', change.after.ref.id)
    .get()
    .then(datas => {
      const promises = []

      datas.forEach(doc => {
        // Get a bet
        const { betTeamA, betTeamB, userId } = doc.data()
        const betId = doc.id
        // Did the user win the bet ?
        const realScoreTeamA = scores.A
        const realScoreTeamB = scores.B
        const betWinner = findWinner(betTeamA, betTeamB)
        console.log(betWinner)
        if (betTeamA === realScoreTeamA && betTeamB === realScoreTeamB) {
          // perfect match ! Four times team's odd
          console.log('HOLY SH*T YOU WIN, you guess perfectly the score !')
          promises.push(updateUserScore(odds, betWinner, userId, 4))
          promises.push(updatePointsWon(odds, betWinner, betId, 4))
        } else if (winner === betWinner) {
          // good result ! Two times team's odd
          console.log('You only guess the issue of the match (sucker)')
          promises.push(updateUserScore(odds, betWinner, userId, 2))
          promises.push(updatePointsWon(odds, betWinner, betId, 2))
        } else {
          console.log("YOU LOSE SON, you didn't find the score neither the match issue")
          promises.push(updateUserScore(odds, betWinner, userId, 0))
          promises.push(updatePointsWon(odds, betWinner, betId, 0))
        }
      })

      return Promise.all(promises)
    })
})

const updateUserScore = (odds, winner, userId, points) => {
  const odd = findCote(odds, winner)
  const user = db.collection('users').doc(userId)

  console.log(`Updating user score for ${userId}`)
  return db
    .runTransaction(t =>
      t.get(user).then(snapshot => {
        const oldScore = snapshot.data().score || 0
        const newScore = oldScore + points * odd
        console.log(`User score update ${userId} (${oldScore} + ${points} * ${odd} = ${newScore})`)
        return t.update(user, { score: newScore })
      })
    )
    .then(() => console.log(`User score updated for ${userId}`))
    .catch(err => console.error(`User ${userId} score update failure:`, err))
}

const updatePointsWon = (odds, winner, id, points) => {
  const odd = findCote(odds, winner)
  const bets = db.collection('bets').doc(id)

  console.log(`Updating points won for bet ${id}`)
  return db
    .runTransaction(t =>
      t.get(bets).then(betSnap => t.update(betSnap.ref, { pointsWon: points * odd }))
    )
    .then(() => console.log(`Bet ${id} update with ${points * odd} points`))
    .catch(err => {
      console.error(`Bet ${id} update failure:`, err)
    })
}

const findWinner = (score1, score2) => {
  if (score1 > score2) return 'A'
  else if (score1 === score2) return 'N'
  return 'B'
}

const findCote = (odds, winner) =>
  ({
    A: odds.A,
    B: odds.B,
    N: odds.N,
  }[winner])
