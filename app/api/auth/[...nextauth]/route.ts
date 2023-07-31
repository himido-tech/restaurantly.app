// https://authjs.dev/reference/adapter/firebase#example-1
import NextAuth from "next-auth"
import type { NextApiRequest, NextApiResponse } from "next"
import type { Adapter } from "next-auth/adapters";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { getAuth } from 'firebase-admin/auth';

const handler = NextAuth({
    adapter: FirestoreAdapter() as Adapter,
    // Custom pages created by us
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
    },
    // We've already configured providers in firebase auth, so we don't need to do it here
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "your-email@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                try {
                    const userRecord = await getAuth().createUser({
                        email: credentials?.username || '',
                        password: credentials?.password || '',
                    })
                    // See the UserRecord reference doc for the contents of userRecord.
                    console.log('Successfully created new user:', userRecord.uid);
                } catch (error) {
                    console.log('Error creating new user:', error);
                    throw error
                }
                console.log("null")
                return null
            }
        })
    ],
})

export { handler as GET, handler as POST }

