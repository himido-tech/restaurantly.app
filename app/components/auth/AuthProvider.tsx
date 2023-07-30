'use client'
import React, { useContext, useState, useEffect, createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseAuth } from "../helpers/firebase";
import { getCookie } from "cookies-next";


export interface IAuth {
    currentUser: firebase.User | null;
    loading: boolean;
    initialized: boolean;
    setCurrentUser: React.Dispatch<React.SetStateAction<firebase.User | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setInitialized: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<IAuth | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = (children?: any) => {
    const auth = firebaseAuth;
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const authStateListener = auth.onAuthStateChanged(function (user) {

            const session = getCookie('session')
            const serverUser = getCookie('user')

            if (user) {
                // User is signed in.
                console.log("User is signed in")
                setCurrentUser(user)
                setInitialized(true)
                setLoading(false)
            } else {
                // No user is signed in.
                console.log("Session: " + session)
                setLoading(false)
                if (session) {
                    console.log("Current user: " + currentUser)
                    console.log("initiliazo? " + initialized)
                    setInitialized(true)
                }

                console.log("No user is signed in")
                auth.signOut()
            }


        });
        return () => {
            authStateListener();
        }
    }, []);

    const _value = {
        currentUser,
        loading,
        initialized,
        setCurrentUser,
        setLoading,
        setInitialized,
    }

    return (
        <AuthContext.Provider value={_value}>{children.children}</AuthContext.Provider>
    );
}