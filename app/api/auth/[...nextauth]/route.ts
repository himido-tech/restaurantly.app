// https://authjs.dev/reference/adapter/firebase#example-1
import NextAuth from "next-auth"
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
    }),
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        // ...add more providers here
    ],
}
export default NextAuth(authOptions)

