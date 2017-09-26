const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

/**
 * Function that automatically stores date of last modification of a bet, triggered by write event on a bet node
 */

const onBetUpdated = (event) => event.data.ref.child('lastModified').once('value', (snap) =>
  !snap.exists() && // Only perform update if lastModified node does not exist
      event.data.ref.child('lastModified').set(event.timestamp)
);

exports.onBetCreated = functions.database.ref('/bets/{matchId}/users/{uid}').onCreate(onBetUpdated);
exports.onBetUpdated = functions.database.ref('/bets/{matchId}/users/{uid}').onUpdate(onBetUpdated);

// exports onGroupApply = functions.database.ref('/users/{uid}/groups/{groupId}').onCreate(
//   event =>
// )
