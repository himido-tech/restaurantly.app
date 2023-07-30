// https://authjs.dev/reference/adapter/firebase#example-1
import NextAuth from "next-auth"
import type { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github"
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const authOptions = {
    adapter: FirestoreAdapter({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
        }),
    }) as Adapter,
    // We've already configured providers in firebase auth, so we don't need to do it here
    providers: [],
}
export default NextAuth(authOptions)

