import admin from 'firebase-admin';
import serviceAccount from './fp-pemweb-p17-firebase-adminsdk-bps89-3123468815.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();

export { db };