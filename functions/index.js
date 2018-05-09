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
      datas.forEach(doc => {
        // Get a bet
        const { betTeamA, betTeamB, userId } = doc.data()
        // Did the user win the bet ?
        const realScoreTeamA = scores.A
        const realScoreTeamB = scores.B
        const betWinner = findWinner(scores.A, scores.B)
        if (betTeamA === realScoreTeamA && betTeamB === realScoreTeamB) {
          // perfect match ! Four times team's odd
          updateUserScore(odds, winner, userId, 4)
          console.log('HOLY SH*T YOU WIN, you guess perfectly the score !')
        } else if (winner === betWinner) {
          // good result ! Two times team's odd
          updateUserScore(odds, winner, userId, 2)
          console.log('You only guess the issue of the match (sucker)')
        } else {
          console.log("YOU LOSE SON, you didn't find the score neither the match issue")
        }
      })
    })
})

const updateUserScore = (odds, winner, userId, points) => {
  const odd = findCote(odds, winner)
  return db
    .collection('users')
    .doc(userId)
    .get()
    .then(snapshot => {
      const oldScore = snapshot.data().score || 0
      const newScore = oldScore + points * odd
      return db
        .collection('users')
        .doc(userId)
        .update({ score: newScore })
    })
}

const findWinner = (score1, score2) => {
  if (score1 > score2) return '1'
  else if (score1 === score2) return 'N'
  return '2'
}

const findCote = (odds, winner) =>
  ({
    A: odds.A,
    B: odds.B,
    N: odds.N,
  }[winner])
