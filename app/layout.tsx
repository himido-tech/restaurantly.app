import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import NavBar from './components/navbar'
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
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" />
      </head>
      <body className={`${inter.className}`}>
        <div className="container">
          <div className="row">
            <div className="col"></div>
            <NavBar />
          </div>
          <div className="row">
            <div className="col">{children}</div>

          </div>

        </div>
      </body>
    </html>
  )
}
