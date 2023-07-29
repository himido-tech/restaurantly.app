'use client'
import React, { useContext, useState, useEffect, createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseAuth } from "../helpers/firebase";
import { getCookie } from "cookies-next";


export interface IAuth {
    currentUser: firebase.User | null;
    initializing: boolean;
    user: firebase.User | null;
    setUser: React.Dispatch<React.SetStateAction<firebase.User | null>>;
    setCurrentUser: React.Dispatch<React.SetStateAction<firebase.User | null>>;
}

const AuthContext = createContext<IAuth | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = (children?: any) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    const [loading, setLoading] = useState(true);
    const auth = firebaseAuth;

    const [initializing, setInitializing] = useState(true);
    const [listenUser, setListenUser] = useState(false);
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        const authStateListener = auth.onAuthStateChanged(function (user) {

            // Verify the token on the server
            // Only the server can create a cookie

            const session = getCookie('session')
            console.log("Session: " + session)

            if (!session) {
                console.log("No session")
                setCurrentUser(null)
                return
            }

            if (user) {
                // User is signed in.
                console.log("User is signed in")
                setCurrentUser(user)
            } else {
                // No user is signed in.
                console.log("No user is signed in")
            }
        });
        return () => {
            authStateListener();
        }
    }, []);

    const _value = {
        currentUser,
        initializing,
        user,
        setUser,
        setCurrentUser,
    }

    return (
        <AuthContext.Provider value={_value}>{children.children}</AuthContext.Provider>
    );
}