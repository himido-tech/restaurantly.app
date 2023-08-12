'use client'
import { useSession, signOut } from "next-auth/react"
import React from "react";
import { useAuth } from "./auth/AuthProvider";
import { firebaseAuth } from "./helpers/firebase";

export const LoginButton = () => {
    const auth = useAuth()
    const { data: session } = useSession()
    const user = session?.user
    const loading = auth?.loading
    const initialized = auth?.initialized
    return (
        <div>
            {
                // If user is not logged in, show the login button
                !user ?
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-backdrop="false" data-bs-target="#login" onClick={
                        () => {
                            // Managed by next-auth
                            location.href = "/api/auth/signin"
                        }
                    }>
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
                                        signOut()
                                    }
                                    }>
                                        Logout
                                    </button>
                                </a>
                            </li>
                        </ul>
                    </div>
            }
        </div >
    )
}

