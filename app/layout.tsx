import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './components/auth/NextAuthProvider'
import PrimarySearchAppBar from './components/navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Restaurantly',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <NextAuthProvider>
          <div className="container">

            <div className="row">
              <div className="col"></div>
              <PrimarySearchAppBar />
            </div>
            <div className="row">
              <div className="col">{children}</div>
            </div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
