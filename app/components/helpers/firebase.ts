import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from '@/firebase.config'
import { getCookie } from 'cookies-next';
// I don't know when those instances are spinning up, but there are cases
// where an instance already exists. It's a good practice to use a single instance.
// var firebaseApp: firebase.app.App | null = null
export const firebaseApp: firebase.app.App = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export const firebaseAuth = firebaseApp.auth()