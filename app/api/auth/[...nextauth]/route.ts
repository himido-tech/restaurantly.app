import NextAuth from "next-auth"
import type { Adapter, AdapterUser } from "next-auth/adapters";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { NextApiRequest, NextApiResponse } from "next";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

const handler = (req: NextApiRequest, res: NextApiResponse) => {

    // Creates a new instance of the adapter you configured
    const fireStoreAdapter = FirestoreAdapter()
    return NextAuth(req, res, {
        adapter: fireStoreAdapter as Adapter,
        // This config makes it possible to be applied  for regular credentials and external providers.
        session: {
            // Choose how you want to save the user session.
            // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.

            strategy: "jwt",

            // Seconds - How long until an idle session expires and is no longer valid.
            maxAge: 30 * 24 * 60 * 60, // 30 days

            // Seconds - Throttle how frequently to write to database to extend a session.
            // Use it to limit write operations. Set to 0 to always update the database.
            // Note: This option is ignored if using JSON Web Tokens
            updateAge: 24 * 60 * 60, // 24 hours
        },
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
                    email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
                    password: { label: "Password", type: "password" }
                },
                async authorize(credentials, req): Promise<UserRecord | any> {
                    console.log(credentials)
                    // You need to provide your own logic here that takes the credentials
                    // submitted and returns either a object representing a user or value
                    // that is false/null if the credentials are invalid.
                    // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                    // You can also use the `req` object to obtain additional parameters
                    // (i.e., the request IP address)
                    console.log("Sanitazing inputs...")
                    const email = credentials?.email.toLocaleLowerCase() || ''
                    const password = credentials?.password || ''
                    console.log("Checking if the user already exists...")
                    try {
                        var existingUser: AdapterUser | null = null
                        if (fireStoreAdapter.getUserByEmail) {
                            existingUser = await fireStoreAdapter.getUserByEmail(email)
                        }

                        if (existingUser) {
                            console.log(`User (id: ${existingUser?.id}) already exists`)
                            return existingUser
                        }


                    } catch (error: any) {
                        if (`${error.code}` != `auth/user-not-found`) {
                            throw error
                        }
                        // We can still proceed to create a new user 
                    }

                    console.log("Attempting to create a new user...")
                    try {
                        var userRecord = null

                        if (fireStoreAdapter.createUser) {
                            userRecord = await fireStoreAdapter.createUser({
                                email: email,
                                emailVerified: null,
                            })
                        }
                        // See the UserRecord reference doc for the contents of userRecord.
                        console.log('Successfully created new user:', userRecord?.id);
                        return {
                            id: userRecord?.id,
                            name: userRecord?.email,
                            email: userRecord?.email,
                        }
                    } catch (error) {
                        console.log('Error creating new user:', error);
                        throw error
                    }
                }
            })
        ],
    })
}

export { handler as GET, handler as POST }

