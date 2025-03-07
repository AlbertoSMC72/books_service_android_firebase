import admin from 'firebase-admin';
import serviceAccount from './watpato_firebase.json';   

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
}

export default admin;
