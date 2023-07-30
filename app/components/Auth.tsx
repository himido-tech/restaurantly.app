'use client'
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { getCookie } from 'cookies-next'
import axios from 'axios';
import { firebaseApp } from './helpers/firebase'
import { useAuth } from './auth/AuthProvider';

const signInSuccessWithAuthResult = (authResult: firebase.auth.UserCredential) => {
    // As httpOnly cookies are to be used, do not persist any state client side.
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    // User successfully signed in.

    const idToken = authResult.user?.getIdToken().then((value) => {
        const data = {
            idToken: value
        }
        axios.post('/api/login',
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                // Cookie is set in the backend
                // So after it verifies the token, it will set the cookie
                const csrfToken = getCookie('csrfToken')
                const session = getCookie('session')
                console.log("Set cookie session: " + session);
                // The frontend uid should match the one from the backend
                const uid = authResult.user?.uid || ''
                if (uid != response.data.uid) {
                    throw new Error(`Error: User id mismatch!
                    The UID from the backend is: " + ${response.data.uid}, "The UID from the frontend is: " + ${uid}`)
                }
                // The backend decoded the token and set the uid in the response
                return response
            })
            .catch(function (error) {
                console.error(error);
                return error
            });
    }).catch((err) => {
        console.info(err)
        return firebase.auth().signOut();
    })

    return false
}

export default function AuthUI() {
    const app = firebaseApp
    var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(app.auth());
    const auth = useAuth()

    // Initialize the FirebaseUI Widget using Firebase.
    ui.start('#firebaseui-auth-container', {
        callbacks: {
            signInSuccessWithAuthResult: (authResult: firebase.auth.UserCredential) => {
                auth?.setLoading(true)
                console.log("Is initialized: " + auth?.initialized)
                return signInSuccessWithAuthResult(authResult)
            },
        },
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: false
            },
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.GithubAuthProvider.PROVIDER_ID
        ],
        // Other config options...
    });
    return (
        <div></div>
    )
}
