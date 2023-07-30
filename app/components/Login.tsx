'use client'
import dynamic from "next/dynamic";
import React from "react";
import { useAuth } from "./auth/AuthProvider";
import { firebaseAuth } from "./helpers/firebase";

const AuthUI = dynamic(
    () => {
        return import("../components/Auth");
    },
    { ssr: false }
);

export const LoginButton = () => {
    const auth = useAuth()
    const user = auth?.currentUser
    const loading = auth?.loading
    const initialized = auth?.initialized
    return (
        <div>
            {
                // If user is not logged in, show the login button
                !user ?
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-backdrop="false" data-bs-target="#login">
                        {
                            // If the auth is initialized, we show loading
                            (loading) ? "Loading..." : "Login / Register"
                        }
                    </button>

                    :

                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            My account ({user.email})
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <a className="dropdown-item" href="/logout">
                                    <button className="btn btn-secondary" onClick={() => {
                                        firebaseAuth.signOut()
                                    }
                                    }>
                                        Logout
                                    </button>
                                </a>
                            </li>
                        </ul>
                    </div>
            }

            <div className="modal fade" data-bs-focus="false" data-bs-backdrop="false" id="login" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Sign in / Sign up</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div id="firebaseui-auth-container">
                                <AuthUI></AuthUI>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
