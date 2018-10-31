const functions = require('firebase-functions');
const admin = require('firebase-admin');
const path = require('path');

admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });

/**
 * Saves the file name and file path in the Firestore Database.
 *
 * @event file upload to Firebase Storage.
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
});