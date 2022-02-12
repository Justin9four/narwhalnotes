import {initializeApp} from "firebase/app"

// Initialize Firebase
const firebaseApp = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));

export default firebaseApp;