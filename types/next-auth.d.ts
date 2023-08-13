import NextAuth, { DefaultSession, DefaultJWT } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */

    // Update the shape of the session object here to match your User model.
    interface Session {
        user: {
            emailVerified: boolean,
        } & DefaultSession["user"]
    }
}


declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT extends DefaultJWT {
        /** OpenID ID Token */
        emailVerified: boolean
    }
}