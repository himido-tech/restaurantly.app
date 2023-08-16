// The Firebase Admin SDK can be used in the backend to manage users.
import { App, applicationDefault, getApp, getApps, initializeApp } from "firebase-admin/app"
import admin from "firebase-admin"
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { Adapter } from "next-auth/adapters";

// It's a good practice to use a single instance.
export var adminApp: App | null = null
if (!getApps().length) {
    const config = JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG || "")
    adminApp = initializeApp({
        credential: admin.credential.cert(config),
    })
} else {
    adminApp = getApp()
}

// This is firebase admin sdk instance which is wrapped in a next-auth adapter
export const FireStoreAdminAdapter = FirestoreAdapter(adminApp) as Adapter
