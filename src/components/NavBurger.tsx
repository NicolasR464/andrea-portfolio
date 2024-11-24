'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useBurger } from '@/store'
import Image from 'next/image'
import { useStore } from '@/store'

export default function NavBurger() {
    // const [isBurgerOpen, setIsBurgerOpen] = useState(true);
    const { isOpen } = useBurger()
    const { bag } = useStore()

    const burgerLineOne: React.CSSProperties = !isOpen
        ? {
              width: '40px',
              height: '5px',
              backgroundColor: '#484848',
              borderRadius: '2px',
              transform: 'rotate(0deg)  translate(0px,10px)',
              transition: 'transform 0.5s, backgroundColor 1s',
          }
        : {
              width: '40px',
              height: '5px',
              backgroundColor: '#101010',
              borderRadius: '2px',
              transform: 'rotate(45deg)  translate(0px,0px)',
              transition: 'transform 0.5s, backgroundColor 1s',
          }

    const burgerLineTwo: React.CSSProperties = !isOpen
        ? {
              width: '40px',
              height: '5px',
              backgroundColor: '#484848',
              borderRadius: '2px',
              transform: 'rotate(0deg)  translate(0px,-10px)',
              transition: 'transform 0.5s, backgroundColor 1s',
          }
        : {
              width: '40px',
              height: '5px',
              backgroundColor: '#101010',
              borderRadius: '2px',
              transform: 'rotate(-45deg)  translate(2px,-4px)',
              transition: 'transform 0.5s, backgroundColor 1s',
          }

    const blurLayoutAnimation: React.CSSProperties = !isOpen
        ? {
              transform: 'translateY(-100%)',
          }
        : { transform: 'translateY(0px)' }

    return (
        <div>
            <span
                className="m-3 p-5 z-30"
                onClick={() =>
                    useBurger.setState((state) => ({ isOpen: !state.isOpen }))
                }
            >
                <div style={burgerLineOne} className="burger-line-one"></div>
                <div style={burgerLineTwo} className="burger-line-two"></div>
            </span>
            <div
                style={blurLayoutAnimation}
                className="overflow-x-hidden drawer cart-drawer transition-all duration-1000 w-screen  -translate-y-full border-2  h-screen z-20 absolute top-0 right-0 backdrop-blur-lg"
            >
                <div className="w-screen flex justify-center items-center flex-col">
                    <Link
                        onClick={() =>
                            useBurger.setState((state) => ({
                                isOpen: !state.isOpen,
                            }))
                        }
                        className="text-3xl p-3"
                        href="/"
                    >
                        home
                    </Link>
                    <Link
                        onClick={() =>
                            useBurger.setState((state) => ({
                                isOpen: !state.isOpen,
                            }))
                        }
                        className="text-3xl p-3"
                        href="/buy"
                    >
                        shop
                    </Link>
                    {bag.length > 0 && (
                        <button
                            onClick={() => {
                                useStore.setState({ isOpen: true })
                            }}
                            className="-translate-y-[4px] ml-1"
                        >
                            <Image
                                src="/shop.png"
                                width={50}
                                height={50}
                                alt="Shopping bag"
                            ></Image>
                        </button>
                    )}
                    <Link
                        onClick={() =>
                            useBurger.setState((state) => ({
                                isOpen: !state.isOpen,
                            }))
                        }
                        className="text-3xl p-3"
                        href="/about"
                    >
                        about
                    </Link>
                    <Link
                        onClick={() =>
                            useBurger.setState((state) => ({
                                isOpen: !state.isOpen,
                            }))
                        }
                        className="text-3xl p-3"
                        href="/contact"
                    >
                        contact
                    </Link>
                </div>
            </div>
        </div>
    )
}
