'use client'
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default function AuthUI() {

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyCsUOr69_oYLRTTnMbiYuzrRwSRHKZmDls",
        authDomain: "table-app-c2e68.firebaseapp.com",
        projectId: "table-app-c2e68",
        storageBucket: "table-app-c2e68.appspot.com",
        messagingSenderId: "479137990961",
        appId: "1:479137990961:web:9ccf848abde46f202fc810",
        measurementId: "G-QB9Y910W1C"
    };
    const app = firebase.initializeApp(firebaseConfig)
    var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(app.auth());

    // Initialize the FirebaseUI Widget using Firebase.
    ui.start('#firebaseui-auth-container', {
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
            },
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID
        ],
        // Other config options...
    });

    return (
        <div></div>
    )
}

