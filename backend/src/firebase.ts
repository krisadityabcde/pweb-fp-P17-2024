import admin from 'firebase-admin';
import serviceAccount from './fp-pemweb-p17-firebase-adminsdk-pvdcl-3a9fef532b.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();

export { db };