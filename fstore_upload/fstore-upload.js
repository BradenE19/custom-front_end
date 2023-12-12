const admin = require('firebase-admin');
const fs = require('fs');

// Initialize the app to point to the Firestore emulator
// Assuming the Firestore emulator is running on the default port
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
admin.initializeApp({
	projectId: "museum-of-imagination",
});

const db = admin.firestore();

fs.readFile('./fstore.json', 'utf8', (error, rawData) => {
    if (error) {
        console.error('Error reading file:', error);
        return;
    }
    try {
        const jsonData = JSON.parse(rawData);
		let worksAdded = 0;
        console.log(jsonData.works);
		if (jsonData.works instanceof Array) {
			jsonData.works.forEach(work => {
				db.collection('works').doc(`work-${++worksAdded}`).set(work);
			});
		}
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});

// Get all items from works
db.collection('works')
	.get()
	.then(snapshot => {
		snapshot.forEach(doc => {
			console.log(doc.id, '=>', doc.data());
		});
	})

// Now you can interact with the Firestore emulator
// Example: Adding a document to a collection
// const docRef = db.collection('users').doc('alovelace');
// docRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });
