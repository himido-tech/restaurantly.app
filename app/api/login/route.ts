import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers'
import { adminApp } from '@/app/helpers/api/firebase';
interface ExtendedNextRequest extends NextRequest {
    idToken: string,
    csrfToken: string,
}

export async function POST(req: ExtendedNextRequest) {
    const data = await req.json();
    // Get the ID token passed and the CSRF token.
    console.log(data);
    const idToken = data.idToken.toString();
    // This is an extra layer of security. For more information, see
    // https://firebase.google.com/docs/auth/admin/manage-cookies 
    // Guard against CSRF attacks.
    // if (csrfToken !== req.cookies.get("csfrToken")) {
    //     return NextResponse.json({
    //         error: "CSRF token doesn't match!",
    //         status: 401
    //     })
    // }
    //  We can validate the token using the Firebase Admin SDK.
    const decodedIdToken = await getAuth().verifyIdToken(idToken)

    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    // Create the session cookie. This will also verify the ID token in the process.
    // The session cookie will have the same claims as the ID token.
    // To only allow session cookie setting on recent sign-in, auth_time in ID token
    // can be checked to ensure user was recently signed in before creating a session cookie.
    if (adminApp) {

        const auth = getAuth(adminApp)
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })
        // Set cookie policy for session cookie.
        const options = { maxAge: expiresIn, httpOnly: false, secure: true };
        const cookieStore = cookies()
        const user = {
            email: decodedIdToken.email,
            displayName: decodedIdToken.name,
            email_verified: decodedIdToken.email_verified,
        } = decodedIdToken
        cookieStore.set('session', sessionCookie, options)

        const response = NextResponse.json({
            uid: decodedIdToken.uid,
            user: user,
        })
        return response
    }

    return NextResponse.json({
        error: "Error parsing body!",
        status: 401,
    });
}