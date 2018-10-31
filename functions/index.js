const functions = require('firebase-functions');
const admin = require('firebase-admin');
const path = require('path');

admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });

/**
 * Adds the file data in the Firestore Database.
 *
 * @event file uploaded to Firebase Storage.
 * @type {CloudFunction<ObjectMetadata>}
 */
exports.addFileToDatabase = functions.storage.object().onFinalize(async (object) => {
    const filePath = object.name;
    const fileName = path.basename(filePath);
    const fileSize = parseInt(object.size);
    const timestamp = new Date(object.updated);

    admin.firestore().collection('files').add({
        path: filePath,
        name: fileName,
        size: fileSize,
        timestamp: timestamp
    });

    console.log(`File '${filePath}' added in the database.`);
});

/**
 * Deletes a file data from the Firestore Database.
 *
 * @event file deleted from Firebase Storage.
 * @type {CloudFunction<ObjectMetadata>}
 */
exports.removeFileFromDatabase = functions.storage.object().onDelete(async (object) => {
    const filePath = object.name;

    admin.firestore().collection('files').where('path', '==', filePath).get()
        .then(snapshot => snapshot.forEach(doc => doc.ref.delete()))
        .catch(err => console.error('Error getting document', err));

    console.log(`File '${filePath}' deleted from the database.`);
});