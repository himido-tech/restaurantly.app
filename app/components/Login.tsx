'use client'
import { useSession, signOut, signIn } from "next-auth/react"
import React, { useState } from "react";
import { firebaseAuth } from "./helpers/firebase";

export const LoginButton = () => {
    const { data: session } = useSession()
    const user = session?.user
    return (
        <div>
            {
                // If user is not logged in, show the login button
                !user ?
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-backdrop="false" data-bs-target="#login" onClick={
                        () => {
                            // Managed by next-auth
                            signIn()
                        }
                    }>
                        {
                            // If the auth is initialized, we show loading
                            "Login / Register"
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
                                <a className="dropdown-item">
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

