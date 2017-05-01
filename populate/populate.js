const admin = require('firebase-admin');
const fs = require('fs');
const csv = require('fast-csv');
const serviceAccount = require('./pronostics-47048-firebase-adminsdk-5jyex-2c08d51542.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pronostics-47048.firebaseio.com',
});
const db = admin.database();

fs.createReadStream('./teams.csv')
  .pipe(csv())
  .on('data', (data) => {
    const dataKey = db.ref().child('teams').push().key;
    const teamObj = {
      name: data[1],
      group: data[2],
    };
    db.ref().child('teams').child(dataKey).update(teamObj);
  });
