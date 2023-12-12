const admin = require('firebase-admin');

// Initialize the app to point to the Firestore emulator
// Assuming the Firestore emulator is running on the default port
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
admin.initializeApp({
	projectId: "museum-of-imagination",
});

const db = admin.firestore();

// Now you can interact with the Firestore emulator
// Example: Adding a document to a collection
const docRef = db.collection('users').doc('alovelace');
docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});
