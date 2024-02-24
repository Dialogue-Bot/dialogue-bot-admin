import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
   apiKey: 'AIzaSyAUS_tTkaP0bQHBDbHImBxHf9MNXZ3-9U0',
   authDomain: 'dialoguebot-6674e.firebaseapp.com',
   projectId: 'dialoguebot-6674e',
   storageBucket: 'dialoguebot-6674e.appspot.com',
   messagingSenderId: '173106613353',
   appId: '1:173106613353:web:34bb3797a0588b8496e6f8',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const GoogleProvider = new GoogleAuthProvider();

export { GoogleProvider, app, auth };
