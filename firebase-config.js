// ============================================================
// FIREBASE CONFIGURATION
// ============================================================
// Project: my-portfolio-b3460
// Email/Password sign-in method Firebase Console ma Enabled hovu joiye:
// Authentication -> Sign-in method -> Email/Password
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyD2R-G18sjD_USPc8hoBQEukByjkDQNKqY",
  authDomain: "my-portfolio-b3460.firebaseapp.com",
  projectId: "my-portfolio-b3460",
  storageBucket: "my-portfolio-b3460.firebasestorage.app",
  messagingSenderId: "638817467683",
  appId: "1:638817467683:web:73eb3b434010236187e096",
  measurementId: "G-9ZN3K9J8QX"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
