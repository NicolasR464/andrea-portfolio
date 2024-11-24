import Image from 'next/image'
import Link from 'next/link'
import NavBarLinks from './NavBarLinks'
import NavBurger from './NavBurger'
import { headers } from 'next/headers'
import { clerkClient, auth } from '@clerk/nextjs/server'

export default async function NavBar() {
    const headersList = await headers()
    const userAgent = headersList.get('user-agent')
    let isMobileView = userAgent!.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )

    const client = await clerkClient()
    const { userId } = await auth()

    const user = userId ? await client.users.getUser(userId as string) : null
    const isAdmin = user && user?.privateMetadata.role === 'admin'

    return (
        <div className="fixed w-full z-40">
            <div className="navbar backdrop-blur-md  flex justify-between">
                <div className="navbar-start z-40">
                    <Link href="/">
                        <Image
                            src={process.env.LOGO_IMG!}
                            width={100}
                            height={100}
                            alt="website logo"
                        />
                    </Link>
                </div>
                {isMobileView ? (
                    <NavBurger />
                ) : (
                    <NavBarLinks isAdmin={isAdmin} />
                )}
            </div>
        </div>
    )
}
