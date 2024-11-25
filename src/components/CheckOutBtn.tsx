'use client'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TOKEN!)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useStore } from '@/store'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'

export default function CheckOutBtn() {
    const searchParams = useSearchParams()

    const { bag, cartTotal } = useStore()
    const pathname = usePathname()
    const [isErrPage, setErrPage] = useState<boolean>(false)

    useEffect(() => {
        if (searchParams.has('cancel')) {
            const localBag = localStorage.getItem('bag')!
            const bagParsed: any = JSON.parse(localBag)
            useStore.setState({
                bag: bagParsed[0],
                cartTotal: bagParsed[1],
                isOpen: true,
            })
        }
    }, [searchParams])

    useEffect(() => {
        setErrPage(pathname === '/error' ? true : false)
    }, [pathname])

    const handleStripeCheckSession = async () => {
        const stripe: any = await stripePromise
        let stripeBag: Array<object>

        if (isErrPage) {
            const localBag = localStorage.getItem('bag')!

            const bagParsed: any = JSON.parse(localBag)

            stripeBag = bagParsed[0].map((item: any) => {
                return { price: item.stripeId, quantity: item.amount_selected }
            })
        } else {
            localStorage.setItem('bag', JSON.stringify([bag, cartTotal]))
            stripeBag = bag.map((item) => {
                return { price: item.stripeId, quantity: item.amount_selected }
            })
        }

        const stripeApi = await fetch('/api/shop', {
            method: 'POST',
            body: JSON.stringify(stripeBag),
            mode: 'no-cors',
        })

        const stripeRes: any = await stripeApi.json()

        const result = await stripe.redirectToCheckout({
            sessionId: stripeRes.id,
        })
    }

    return (
        <button
            onClick={() => handleStripeCheckSession()}
            className="btn flex flex-row justify-center items-center btn-success btn-outline m-4  mb-6"
        >
            <FontAwesomeIcon icon={faBagShopping} />
            <span>checkout </span>{' '}
            {!isErrPage && (
                <span className="text-xs">(total: {cartTotal}€ )</span>
            )}
        </button>
    )
}
