import './globals.css'
import { Inter, Tilt_Prism, Tenor_Sans } from 'next/font/google'
import Script from 'next/script'
import NavBar from '../components/NavBar'
import CartDrawer from '../components/CartDrawer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

const tilt_prism = Tilt_Prism({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-tilt_prism',
})

const tenor_sans = Tenor_Sans({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-tenor_sans',
})

export const metadata = {
    title: 'Andréa Rocagel | Drawing Portfolio',
    description: "Discover and purchase Andréa Rocagel's art",
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html
                data-theme="bumblebee"
                className={`${tenor_sans.variable} ${tilt_prism.variable} `}
                lang="en"
            >
                <head></head>
                <body className={inter.className}>
                    <NavBar />
                    <CartDrawer />
                    <ToastContainer
                        position="top-center"
                        hideProgressBar
                        theme="colored"
                    />
                    <div>{children}</div>
                    <Analytics />
                    <Script
                        defer
                        src="https://kit.fontawesome.com/766e633129.js"
                        crossOrigin="anonymous"
                    ></Script>
                </body>
            </html>
        </ClerkProvider>
    )
}
