'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useStore } from '@/store'

export default function CartVignette({ item }: { item: any }) {
    const [isAdded, setIsAdded] = useState(false)
    const [id, setId] = useState('')
    const [stripeProdId, setStripeProductId] = useState('')
    const [img, setImg] = useState('')
    const [price, setPrice] = useState(0)
    const [collection, setCollection] = useState('')
    const [printLeft, setPrintLeft] = useState(0)
    const [amountSelected, setAmountSelected] = useState(1)

    const { bag } = useStore()

    useEffect(() => {
        setId(item.id)
    }, [item.id])

    useEffect(() => {
        setStripeProductId(item.stripeId)
    }, [item.stripeId])

    useEffect(() => {
        setImg(item.img)
    }, [item.img, img])

    useEffect(() => {
        setPrice(item.price)
    }, [item.price])

    useEffect(() => {
        setCollection(item.collection)
    }, [item.collection])

    useEffect(() => {
        setPrintLeft(item.prints_left)
    }, [item.prints_left])

    useEffect(() => {
        setAmountSelected(item.amount_selected)
    }, [item.amount_selected])

    const removeItem = () => {
        useStore.setState((state) => ({
            bag: [...state.bag.filter((el) => el.id !== id)],
        }))
        useStore.setState((state) => ({
            isOpen: state.bag.length === 0 ? false : state.isOpen,
        }))
        useStore.setState((state) => {
            const updateTotal = state.bag.reduce(
                (acc, item) => acc + item.amount_selected * item.price,
                0
            )
            return { cartTotal: updateTotal }
        })
    }

    const changeSelecNum = (n: string) => {
        useStore.setState((state) => {
            const updatedBag = state.bag.map((obj) =>
                obj.id === id ? { ...obj, amount_selected: +n } : obj
            )

            const updatedTotal = updatedBag.reduce(
                (acc, item) => acc + item.amount_selected * item.price,
                0
            )

            return { bag: updatedBag, cartTotal: updatedTotal }
        })
    }

    return (
        <article className="flex p-2 m-2 rounded-xl justify-center   border-solid border-2  tablet:flex-row">
            <section className="flex justify-center flex-col   items-center">
                <span>{collection}</span>
                <span>{price}€ / print</span>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">how many prints?</span>
                    </label>
                    <select
                        value={amountSelected}
                        onChange={(e) => changeSelecNum(e.target.value)}
                        className="select select-bordered w-full max-w-xs"
                    >
                        {Array(printLeft)
                            .fill(null)
                            .map((_, x) => (
                                <option key={x} value={x + 1}>
                                    {x + 1}
                                </option>
                            ))}
                    </select>
                    <button onClick={removeItem} className="link">
                        remove
                    </button>
                </div>
            </section>
            <section className="m-2 flex justify-center   items-center">
                {img && (
                    <Image
                        style={{
                            boxShadow:
                                '12px 12px 24px 0 rgba(0, 0, 0, 0.2), -12px -12px 24px 0 rgba(255, 255, 255, 0.5)',
                        }}
                        className="m-1 rounded-lg"
                        src={img}
                        width={150}
                        height={150}
                        alt="Drawing image in cart section"
                    />
                )}
            </section>
        </article>
    )
}
