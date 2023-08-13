// https://next-auth.js.org/getting-started/typescript
// This file helps us to shape the session, user and token objects.
import NextAuth, { DefaultSession, DefaultJWT, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"
import { UserRecord } from "firebase-admin/lib/auth/user-record";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */

    // Update the shape of the session object here to match your User model.
    // AuthN is handled by FirebaseAdapter, so we use their user model.
    interface Session extends DefaultSession {
        user: UserRecord
    }

    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User extends UserRecord { }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        user: UserRecord
    }
}