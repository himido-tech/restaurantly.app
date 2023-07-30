import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers'
import { adminApp } from '@/app/helpers/api/firebase';
interface ExtendedNextRequest extends NextRequest {
    idToken: string,
    csrfToken: string,
}

export async function handler(req: ExtendedNextRequest) {
    const data = await req.json();
    const sessionCookie = req.cookies.get('session')?.value || '';
    // TODO: Check if session is valid
    if (!sessionCookie) {
        return NextResponse.redirect('/logout')
    }
}