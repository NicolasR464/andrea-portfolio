import Table from '@/components/Table'
import Filters from './filters'

const getOrders = async (searchParams: any) => {
    const { input, date } = await searchParams

    const ordersRes = await fetch(
        searchParams.hasOwnProperty('input')
            ? `${process.env.DOMAIN}/api/orders?input=${input}&date=${date}`
            : `${process.env.DOMAIN}/api/orders`,
        {
            cache: 'no-store',
        }
    )

    const resParsed: any = await ordersRes.json()

    return resParsed.data
}

export default async function Orders({ searchParams }: any) {
    const orders = await getOrders(searchParams)

    return (
        <section className="overflow-y-hidden">
            <h1 className="text-center text-5xl">Orders</h1>
            <Filters />
            {orders && orders.length > 0 ? (
                <>
                    <Table orders={orders} />
                </>
            ) : (
                <div className="flex justify-center">
                    <span className="text-center">No result found</span>
                </div>
            )}
        </section>
    )
}
