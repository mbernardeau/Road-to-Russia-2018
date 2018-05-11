const admin = require('firebase-admin')
const fs = require('fs')
const serviceAccount = require('./road-to-russia-540bf-firebase-adminsdk-hip91-465a317cbd.json')
const { firestoreImport } = require('node-firestore-import-export')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://road-to-russia-540bf.firebaseio.com',
})

const db = admin.firestore()

const importCollection = collectionName => {
  const data = JSON.parse(fs.readFileSync(`./firestore-data/${collectionName}.json`))
  firestoreImport(data, db.collection(collectionName)).then(() =>
    console.log(`Collection ${collectionName} was imported`),
  )
}

importCollection('matches')
importCollection('teams')
importCollection('stadiums')
