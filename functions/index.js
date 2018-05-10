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
        const betId = doc.id
        // Did the user win the bet ?
        const realScoreTeamA = scores.A
        const realScoreTeamB = scores.B
        const betWinner = findWinner(betTeamA, betTeamB)
        console.log(betWinner)
        if (betTeamA === realScoreTeamA && betTeamB === realScoreTeamB) {
          // perfect match ! Four times team's odd
          console.log('HOLY SH*T YOU WIN, you guess perfectly the score !')
          updateUserScore(odds, betWinner, userId, 4)
          updatePointsWon(odds, betWinner, betId, 4)
        } else if (winner === betWinner) {
          // good result ! Two times team's odd
          console.log('You only guess the issue of the match (sucker)')
          updateUserScore(odds, betWinner, userId, 2)
          updatePointsWon(odds, betWinner, betId, 2)
        } else {
          console.log("YOU LOSE SON, you didn't find the score neither the match issue")
          updateUserScore(odds, betWinner, userId, 0)
          updatePointsWon(odds, betWinner, betId, 0)
        }
      })
    })
})

const updateUserScore = (odds, winner, userId, points) => {
  const odd = findCote(odds, winner)
  const users = db
    .collection('users')
    .doc(userId)
  return db.runTransaction( t => {
    return t
      .get(users)
      .then(snapshot => {
        const oldScore = snapshot.data().score || 0
        const newScore = oldScore + points * odd
        t.update(users, { score: newScore })
      })
    
  }).then(
    console.log('Transaction success!')
  ).catch(err => {
    console.log('Transaction failure:', err);
  })
}

const updatePointsWon = (odds, winner, id, points) => {
  const odd = findCote(odds, winner)
  const bets = db
    .collection('bets')
    .doc(id)
  return db.runTransaction( t => {
    return t
      .get(bets)
      .then(
        t.update(bets, { pointsWon: points * odd })
      )
  }).then(
    console.log('Transaction success!')
  ).catch(err => {
    console.log('Transaction failure:', err);
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
