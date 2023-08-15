import { App, applicationDefault, getApp, getApps, initializeApp } from "firebase-admin/app"
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { Adapter } from "next-auth/adapters";
import { getFirestore } from "firebase-admin/firestore";

// It's a good practice to use a single instance.
export var adminApp: App | null = null
if (!getApps().length) {
    adminApp = initializeApp({
        credential: applicationDefault(),
    })
} else {
    adminApp = getApp()
}

// This is firebase admin sdk instance which is wrapped in a next-auth adapter
export const FireStoreAdminAdapter = FirestoreAdapter(adminApp) as Adapter

// Initialize Firestore and get a reference to the service
export const FireStore = getFirestore(adminApp);