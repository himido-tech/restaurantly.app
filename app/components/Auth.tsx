'use client'
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { setCookie, getCookie } from 'cookies-next'
import axios from 'axios';
import { firebaseApp } from './helpers/firebase'
import Modal from 'bootstrap/js/dist/modal';
import { useAuth } from './auth/AuthProvider';

const signInSuccessWithAuthResult = (authResult: firebase.auth.UserCredential, redirectUrl: string) => {
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

                Array.from(document.querySelectorAll('.modal-backdrop')).forEach(
                    (el) => {
                        el.remove()
                    }
                );

                const loginModal = document.getElementById('login')
                loginModal?.classList.add("hide")
                loginModal?.classList.remove("fade")
                loginModal?.classList.remove("show")
                if (loginModal) {
                    let modal = Modal.getInstance(loginModal)
                    console.log('HIDE MODAL')
                    modal?.hide()

                }
                return true
            })
            .catch(function (error) {
                console.error(error);
                return error
            });
        return value

    }).catch((err) => {
        console.info(err)
        return firebase.auth().signOut();
    })

    return false
}

export default function AuthUI() {
    const app = firebaseApp
    var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(app.auth());

    // Initialize the FirebaseUI Widget using Firebase.
    ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: "/",
        callbacks: {
            signInSuccessWithAuthResult: signInSuccessWithAuthResult
        },
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: false
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
