'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { CldImage } from 'next-cloudinary'

let horizontalAnim: any

export default function Gallery({ collections }: { collections: any }) {
    const [imgsProp, setImgsProp] = useState<any>()
    const containerRef = useRef<any>()
    const [objectKeys, setObjectKeys] = useState<any>()
    const [collectionName, setCollectionName] = useState<string>()
    const [viewportSize, setViewportSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    })

    const hasBeenCalled = useRef(false)

    const [isMouseOut, setIsMouseOut] = useState(true)

    gsap.registerPlugin(ScrollTrigger)
    gsap.registerPlugin(ScrollToPlugin)

    useEffect(() => {
        setCollectionName(Object.keys(collections)[0])
    }, [collections])

    useEffect(() => {
        // Function to update viewport size
        const updateViewportSize = () => {
            setViewportSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        // Add event listener for resizing
        window.addEventListener('resize', () => {
            if (ScrollTrigger) {
                ScrollTrigger?.refresh(true)
            }
            updateViewportSize()
        })

        // Initial call to set the initial viewport size
        updateViewportSize()

        // Cleanup: Remove event listener on unmount
        return () => {
            window.removeEventListener('resize', updateViewportSize)
        }
    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            horizontalAnim = () => {
                let imgs = gsap.utils.toArray('.img')

                const horizontalScroll = gsap.to(imgs, {
                    // xPercent: -110 * (imgs.length - 1),
                    x: -containerRef?.current?.offsetWidth,
                    ease: 'none',

                    scrollTrigger: {
                        pin: true,
                        pinnedContainer: '.gallery',
                        start: 'top top',
                        scrub: 1,
                        // markers: true,
                        // pinSpacing: false,
                        markers: false,
                        trigger: '.gallery',
                        toggleActions: 'play resume resume resume',
                        invalidateOnRefresh: false,
                        // refreshPriority: 1,
                        end: () => '+=' + containerRef?.current?.offsetWidth,
                    },
                })

                // image zoom in/out

                const images = gsap.utils.toArray('.img')

                images.forEach((img: any) => {
                    gsap.to(img, {
                        keyframes: {
                            '0%': { scale: 1 },
                            '50%': { scale: 1.1 },
                            '100%': { scale: 1 },
                        },
                        duration: 2,
                        scrollTrigger: {
                            id: 'image',
                            trigger: img,
                            start: 'left center',
                            toggleActions: 'play none none reset',
                            end: 'right center',
                            scrub: 2,
                            // markers: true,
                            markers: false,
                            containerAnimation: horizontalScroll,
                            onEnter: () =>
                                setCollectionName(img.dataset.collection),
                            onEnterBack: () =>
                                setCollectionName(img.dataset.collection),
                        },
                    })
                })
            }
        })

        if (
            containerRef?.current?.offsetWidth &&
            objectKeys &&
            viewportSize.width !== 0 &&
            !hasBeenCalled.current
        ) {
            horizontalAnim()
            hasBeenCalled.current = true
        }

        window.addEventListener('resize', () => {
            ScrollTrigger?.refresh()
        })

        return () => {
            ctx.revert()
        }
    }, [containerRef?.current?.offsetWidth, objectKeys, viewportSize])

    useEffect(() => {
        setImgsProp(collections)
        setObjectKeys(Object.keys(collections))
    }, [collections])

    const goTo = (name: string | undefined) => {
        setCollectionName(name)
        setIsMouseOut(true)

        const element = document.getElementById(name!)
        const rect = element?.getBoundingClientRect()
        const distanceFromTop = rect?.x!

        // window.scrollTo(0, distanceFromTop);

        gsap.to(window, { duration: 1, scrollTo: distanceFromTop })
    }

    const menuStyle: React.CSSProperties = isMouseOut
        ? {
              opacity: 0,
              visibility: 'hidden',
          }
        : { opacity: 1, visibility: 'visible' }

    return (
        <div className="max-h-max	">
            {collectionName && (
                <div className="z-[10] fixed bottom-2  justify-center flex w-screen ">
                    <div
                        onMouseEnter={() => setIsMouseOut(false)}
                        className=" dropdown dropdown-hover dropdown-top"
                    >
                        <label id="goFS" tabIndex={0} className="btn m-1 w-40">
                            {collectionName}
                        </label>
                        <ul
                            style={menuStyle}
                            onMouseLeave={() => setIsMouseOut(true)}
                            tabIndex={0}
                            className="z-[200] -translate-x-[22.5px] dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {objectKeys &&
                                objectKeys.map(
                                    (collection: any, index: number) => (
                                        <li
                                            onClick={() => goTo(collection)}
                                            className="flex justify-center"
                                            key={index}
                                        >
                                            <a className="flex justify-center">
                                                {' '}
                                                <span className="text-center">
                                                    {collection}
                                                </span>
                                            </a>
                                        </li>
                                    )
                                )}
                        </ul>
                    </div>
                </div>
            )}

            <div className="gallery scrollable-container">
                <article
                    ref={containerRef}
                    className="imgs flex items-end w-min"
                >
                    {objectKeys &&
                        objectKeys.map((collection: any, index: number) => {
                            return (
                                <div
                                    className="flex items-end"
                                    id={collection}
                                    key={index}
                                >
                                    {collections[collection].map(
                                        (url: any, index: number) => {
                                            return (
                                                <CldImage
                                                    key={index}
                                                    data-collection={collection}
                                                    className="img h-[auto] max-w-[90vw] max-h-[70vh] tablet:max-w-[60vw]   tablet:min-w-[40vw] m-10 translate-y-28"
                                                    src={url}
                                                    width={500}
                                                    height={500}
                                                    alt={`picture#${index}`}
                                                    loading="lazy"
                                                />
                                            )
                                        }
                                    )}
                                </div>
                            )
                        })}
                </article>
            </div>
        </div>
    )
}
