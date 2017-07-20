const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.onBetUpdated = functions.database.ref('/bets/{matchId}/users/{uid}')
  .onWrite((event) =>
    event.data.ref.child('lastModified').once('value', (snap) => { // eslint-disable-line consistent-return
      if (!snap.exists() || event.timestamp - snap.val() > 200) {
        return event.data.ref.child('lastModified').set(event.timestamp);
      }
    })
);
