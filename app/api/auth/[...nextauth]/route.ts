import NextAuth, { Account, Session, User } from "next-auth"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { UserRecord, getAuth } from "firebase-admin/auth";
import { JWT } from "next-auth/jwt";
import { FireStoreAdminAdapter } from "@/app/helpers/firebase";

// This type allows making readonly properties writable.
type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

const handler = NextAuth({
    adapter: FireStoreAdminAdapter,
    // This config makes it possible to be applied  for regular credentials and external providers.
    callbacks: {
        async session({ session, token }: { session: Session, token: JWT }): Promise<Session> {
            session.user = token.user
            return Promise.resolve(session)
        },
        // If we sign-in the user and profile will be available only once. But, in subsequent calls, only token will be available.
        async jwt({ token, user, profile, account }: { token: JWT, user: any, profile?: any, account?: Account | null }): Promise<JWT> {
            if (user) {
                var tokenUser = token.user
                if (account?.provider === "google") {
                    // Google provider returns a profile object which tells us if the email is verified or not.
                    // UserRecord contains readonly properties, so we need to cast it to a mutable type in order to set the emailVerified property.
                    const googleUser: Mutable<UserRecord> = user
                    const googleProfile: GoogleProfile = profile
                    googleUser.emailVerified = googleProfile.email_verified
                    tokenUser = googleUser
                }
                token.user = tokenUser
            }
            return Promise.resolve(token)
        }
    },
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
            async authorize(credentials, req): Promise<User | any> {
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

                    const existingUser: UserRecord = await getAuth().getUserByEmail(email)
                    if (existingUser) {
                        console.log(`User (id: ${existingUser?.uid}) already exists`)
                        return existingUser
                    }
                } catch (error: any) {
                    console.log(error.code)
                    if (`${error.code}` != `auth/user-not-found`) {
                        throw error
                    }
                    // We can still proceed to create a new user 
                }

                console.log("Attempting to create a new user...")
                // FirestoreAdapter already instantiates a firebase app, so we can use it to create a new user

                var userDetails = null
                await getAuth()
                    .createUser({
                        email: email,
                        password: password,
                    })
                    .then((userRecord) => {
                        // See the UserRecord reference doc for the contents of userRecord.
                        console.log('Successfully created new user:', userRecord.uid);
                        console.log("Sending verification email...")
                        return userRecord
                    })
                    .catch((error) => {
                        console.log('Error creating new user:', error);
                        throw error
                    });
                console.log("User details: " + JSON.stringify(userDetails))
                return userDetails
            }
        })
    ],
})

export { handler as GET, handler as POST }

