/* eslint-disable no-console */
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

exports.updateScore = functions.firestore.document('matches/{matchId}').onUpdate(change => {
  // Get final scores
  // odds: {1, 2, A, B, N}
  // scores: {A, B, winner}
  const { odds, scores, phase } = change.after.data()
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
        const bet = doc.data()
        const { betTeamA, betTeamB, userId } = bet
        const betId = doc.id
        const oldBetScore = bet.pointsWon

        // Did the user win the bet ?
        const realScoreTeamA = scores.A
        const realScoreTeamB = scores.B

        if(!phase || phase === "0") {
          console.log("Match de phase de poule")
          const betWinner = findWinner(betTeamA, betTeamB)
          console.log(betWinner)

          if (betTeamA === realScoreTeamA && betTeamB === realScoreTeamB) {
            // perfect match ! Four times team's odd
            console.log('HOLY SH*T YOU WIN, you guess perfectly the score !')
            promises.push(updateUserScore(odds, betWinner, userId, oldBetScore, 4))
            promises.push(updatePointsWon(odds, betWinner, betId, 4))
          } else if (winner === betWinner) {
            // good result ! Two times team's odd
            console.log('You only guess the issue of the match (sucker)')
            promises.push(updateUserScore(odds, betWinner, userId, oldBetScore, 2))
            promises.push(updatePointsWon(odds, betWinner, betId, 2))
          } else {
            console.log("YOU LOSE SON, you didn't find the score neither the match issue")
            promises.push(updateUserScore(odds, betWinner, userId, oldBetScore, 0))
            promises.push(updatePointsWon(odds, betWinner, betId, 0))
          }
        } else {
          console.log("Phase finale ", phase)
          let betWinner = findWinner(betTeamA, betTeamB)
          if(betWinner === 'N') {
            betWinner = bet.betWinner // eslint-disable-line
          }
          const phaseCoeff = getPhaseCoeff(phase)

          if(betTeamA === realScoreTeamA && betTeamB === realScoreTeamB) {
            if(betWinner === winner) {
              console.log("Bon score + bon vainqueur")
              promises.push(updateUserScore(odds, betWinner, userId, oldBetScore, phaseCoeff.bonScore, phaseCoeff.bonVainqueur))
              promises.push(updatePointsWon(odds, betWinner, betId, phaseCoeff.bonScore, phaseCoeff.bonVainqueur))
            } else {
              console.log("Bon score + mauvais vainqueur")
              promises.push(updateUserScore(odds, betWinner, userId, oldBetScore, phaseCoeff.bonScore, 0))
              promises.push(updatePointsWon(odds, betWinner, betId, phaseCoeff.bonScore, 0))
            }
          } else if (winner === betWinner) {
            console.log("Bon vainqueur, mauvais score")
            promises.push(updateUserScore(odds, betWinner, userId, oldBetScore, 0, phaseCoeff.bonVainqueur))
            promises.push(updatePointsWon(odds, betWinner, betId, 0, phaseCoeff.bonVainqueur))
          } else {
            console.log("Mauvais vainqueur, mauvais score")
            promises.push(updateUserScore(odds, betWinner, userId, oldBetScore, 0, 0))
            promises.push(updatePointsWon(odds, betWinner, betId, 0, 0))
          }
        }
      })

      return Promise.all(promises)
    })
})

const updateUserScore = (odds, winner, userId, oldBetScore=0, coeff, coeffVainqueur = 0) => {
  const odd = findCote(odds, winner)
  const oddWinner = findCoteWinner(odds, winner) || 0
  const user = db.collection('users').doc(userId)

  console.log(`Updating user score for ${userId}`)
  return db
    .runTransaction(t =>
      t.get(user).then(snapshot => {
        const oldScore = snapshot.data().score || 0
        const newScore = oldScore - oldBetScore + coeff * odd + coeffVainqueur * oddWinner
        console.log(`User score update ${userId} (${oldScore} - ${oldBetScore} + ${coeff} * ${odd} + ${coeffVainqueur} * ${oddWinner} = ${newScore})`)
        return t.update(user, { score: newScore })
      })
    )
    .then(() => console.log(`User score updated for ${userId}`))
    .catch(err => console.error(`User ${userId} score update failure:`, err))
}

const updatePointsWon = (odds, winner, id, coeff, coeffVainqueur = 0) => {
  const odd = findCote(odds, winner)
  const oddWinner = findCoteWinner(odds, winner) || 0
  const bets = db.collection('bets').doc(id)

  console.log(`Updating points won for bet ${id}`)
  return db
    .runTransaction(t =>
      t.get(bets).then(betSnap => t.update(betSnap.ref, { pointsWon: coeff * odd + coeffVainqueur * oddWinner }))
    )
    .then(() => console.log(`Bet ${id} update with ${coeff * odd + coeffVainqueur * oddWinner} points`))
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

const findCoteWinner = (odds, winner) => {
  if(winner === 'A')
    return odds.P1
  else if(winner === 'B')
    return odds.P2
  return undefined
}

const getPhaseCoeff = phase =>
  ({
    8: {
      bonScore: 5,
      bonVainqueur: 2,
      bonVainqueurFinal: 2,
    },
    4: {
      bonScore: 8,
      bonVainqueur: 3,
      bonVainqueurFinal: 3,
    },
    2: {
      bonScore: 13,
      bonVainqueur: 5,
      bonVainqueurFinal: 5,
    },
    3: {
      bonScore: 15,
      bonVainqueur: 6,
      bonVainqueurFinal: 6,
    },
    1: {
      bonScore: 22,
      bonVainqueur: 8,
      bonVainqueurFinal: 8,
    },
  }[phase])
