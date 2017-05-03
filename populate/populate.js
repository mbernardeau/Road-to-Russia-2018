const admin = require('firebase-admin');
const fs = require('fs');
const csv = require('fast-csv');
const serviceAccount = require('./pronostics-47048-firebase-adminsdk-5jyex-2c08d51542');
const _ = require('lodash');
const moment = require('moment');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pronostics-47048.firebaseio.com',
});
const db = admin.database();

const teamsSaved = {};

fs.createReadStream('./data/Equipe.csv')
  .pipe(csv({
    headers: true,
    delimiter: ';',
  }))
  .on('data', (teamRow) => {
    const dataKey = db.ref().child('teams').push().key;
    const teamObj = {
      name: teamRow.Pays,
      group: teamRow.Groupe,
      index: teamRow.Index,
    };
    teamsSaved[dataKey] = teamObj;
    db.ref().child('teams').child(dataKey).update(_.omit(teamObj, ['index']));
  });

let i = 0;

db.ref().child('stadiums').once('value', (stadiumsSnap) => {
  const stadiums = stadiumsSnap.val();

  fs.createReadStream('./data/Match.csv')
  .pipe(csv({
    headers: true,
    delimiter: ';',
  }))
  .on('data', (matchRow) => {
    const dataKey = db.ref().child('matches').push().key;
    const teamAKey = _.findKey(teamsSaved, { index: matchRow.PaysA });
    const teamBKey = _.findKey(teamsSaved, { index: matchRow.PaysB });
    const stadium = _.findKey(stadiums, { name: matchRow.Stade });

    const matchObj = {
      phase: matchRow.Phase,
      teamA: teamAKey,
      teamB: teamBKey,
      odds: {
        1: Number.parseFloat(matchRow.Cote1),
        N: Number.parseFloat(matchRow.CoteN),
        2: Number.parseFloat(matchRow.Cote2),
        A: Number.parseFloat(matchRow.CoteA),
        B: Number.parseFloat(matchRow.CoteB),
      },
      dateTime: moment(matchRow.Dateheure).unix(),
      stadium: stadium,
    };

    db.ref().child('matches').child(dataKey).update(matchObj);
  })
  .on('finish', () => {
    // process.exit(0);
  });
});
