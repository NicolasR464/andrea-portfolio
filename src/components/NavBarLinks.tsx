'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useStore } from '@/store'

export default function NavBarLinks({ isAdmin }: { isAdmin: boolean | null }) {
    const pathname = usePathname()
    const { bag } = useStore()

    return (
        <div className="navbar-end">
            <div className="tabs mr-3">
                <Link
                    className={pathname == '/about' ? 'tab tab-active' : 'tab'}
                    href="/about"
                >
                    About
                </Link>
                <Link
                    className={pathname == '/buy' ? 'tab tab-active' : 'tab'}
                    href="/buy"
                >
                    Buy
                </Link>
                {bag.length > 0 && (
                    <button
                        onClick={() => {
                            useStore.setState({ isOpen: true })
                        }}
                        className="-translate-y-[4px] ml-1"
                    >
                        <Image
                            src="/shop2.png"
                            width={30}
                            height={30}
                            alt="Shopping bag"
                        ></Image>
                    </button>
                )}
                <Link
                    className="ml-[16px] -translate-y-[5.6px]"
                    href="/contact"
                >
                    <Image
                        src={
                            pathname == '/contact' ? '/mail.png' : '/mail2.png'
                        }
                        width={25}
                        height={25}
                        alt="Contact"
                    />
                </Link>
                <Link
                    className="ml-[20px] -translate-y-[6px]"
                    target="blank"
                    href="https://www.instagram.com/andreagracerocagel"
                >
                    <Image
                        src="/insta2.png"
                        width={25}
                        height={25}
                        alt="Instagram link"
                    />
                </Link>

                {isAdmin && (
                    <Link
                        className={
                            pathname == '/a' ||
                            pathname == '/a/orders' ||
                            pathname == '/a/bio'
                                ? 'tab tab-active'
                                : 'tab'
                        }
                        href="/a"
                    >
                        Admin
                    </Link>
                )}

                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}
