// I don't know when those instances are spinning up, but there are cases
// where an instance already exists. It's a good practice to use a single instance.
import { App, applicationDefault, getApp, getApps, initializeApp } from "firebase-admin/app"
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { Adapter } from "next-auth/adapters";

export var adminApp: App | null = null

if (!getApps().length) {
    adminApp = initializeApp({
        credential: applicationDefault(),
    })
} else {
    adminApp = getApp()
}




// This is firebase admin sdk instance which is wrapped in a next-auth adapter
export const fireStoreAdapter = FirestoreAdapter(adminApp) as Adapter
