import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from 'firebase-admin/auth';
import { App, getApp, getApps } from 'firebase-admin/app';
import { redirect } from 'next/navigation'

import { cookies } from 'next/headers'
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { adminApp } from '@/app/helpers/api/firebase';
interface ExtendedNextRequest extends NextRequest {
    idToken: string,
    csrfToken: string,
}


export function POST(req: ExtendedNextRequest, res: NextResponse) {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('session')?.value || '';
    cookieStore.delete('session')
    getAuth()
        .verifySessionCookie(sessionCookie)
        .then((decodedClaims) => {
            return getAuth().revokeRefreshTokens(decodedClaims.sub);
        })
        .then(() => {
            redirect('/');
        })
        .catch((error) => {
            console.log(error);
            redirect('/');
        });

    return async () => {
        try {
            redirect('/');
        }
        catch (error) {
            console.log(error);
            return NextResponse.json({
                error: "Error parsing body!",
                status: 401,
            });
        }
    };
}