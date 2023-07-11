import dynamic from "next/dynamic";
import React from "react";

const AuthUI = dynamic(
    () => {
        return import("../components/Auth");
    },
    { ssr: false }
);

export const LoginButton = () => {
    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#login">
                Login / Register
            </button>


            <div className="modal fade" id="login" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
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

