const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

/**
 * Function that automatically stores date of last modification of a bet, triggered by write event on a bet node
 */

const onBetUpdated = event =>
  event.after.ref.child('lastModified').once(
    'value',
    snap => !snap.exists() && event.after.ref.child('lastModified').set(event.timestamp) // Only perform update if lastModified node does not exist
  )

exports.bets = {
  onCreated: functions.database.ref('/bets/{matchId}/users/{uid}').onCreate(onBetUpdated),
  onUpdated: functions.database.ref('/bets/{matchId}/users/{uid}').onUpdate(onBetUpdated),
}

// To use later to send email or notification to admin

// exports.groups = {
// onApply: functions.database.ref('/users/{uid}/groups/{groupId}').onCreate(
//   (event) => {
//     const { uid, groupId } = event.params;

//     return admin.database().ref(`groups/${groupId}/awaitingMembers/${uid}`).set(true);
//   }
// ),
// };
