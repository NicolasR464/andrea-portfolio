import {
    clerkMiddleware,
    createRouteMatcher,
    clerkClient,
} from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/a/(.*)', '/a'])

export default clerkMiddleware(async (auth, req) => {
    if (isAdminRoute(req)) {
        const { userId, redirectToSignIn } = await auth()

        if (!userId) {
            redirectToSignIn()
        }

        const client = await clerkClient()

        const user = await client.users.getUser(userId as string)

        if (user.privateMetadata.role !== 'admin') {
            const url = new URL('/', req.url)
            return NextResponse.redirect(url)
        }
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}
