import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import NavBar from './components/navbar'
import { AuthProvider } from './components/auth/AuthProvider'
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
        <link as="style" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="preload stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossOrigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossOrigin="anonymous"></script>
      </head>
      <body className={`${inter.className}`}>
        <AuthProvider>
          <div className="container">

            <div className="row">
              <div className="col"></div>
              <NavBar />
            </div>
            <div className="row">
              <div className="col">{children}</div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
