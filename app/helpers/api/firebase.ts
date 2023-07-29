// I don't know when those instances are spinning up, but there are cases
// where an instance already exists. It's a good practice to use a single instance.
import { App, applicationDefault, getApp, getApps, initializeApp } from "firebase-admin/app"

export var adminApp: App | null = null

if (!getApps().length) {
    adminApp = initializeApp({
        credential: applicationDefault(),
    })
} else {
    adminApp = getApp()
}