import Link from "next/link";
import BackBtn from "@/components/BackBtn";
import Image from "next/image";

const getOrderDetail = async (id: string) => {
  const orderDetail = await fetch(`${process.env.DOMAIN}/api/order?id=${id}`);

  const orderParsed = await orderDetail.json();

  return orderParsed;
};

export default async function Details({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const orderDetail: any = await getOrderDetail(searchParams.id);

  return (
    <article>
      <BackBtn />

      <div className="flex w-screen justify-center">
        <h1 className="text-3xl">Order details</h1>
      </div>
      <div className="flex items-center flex-col">
        <div className="mt-6 p-3 justify-center items-center flex flex-col b-2 border-solid border-2 rounded-xl">
          <h4 className="font-medium underline">user details</h4>
          <span>name: {orderDetail.order.customerDetails.name}</span>
          <span>email: {orderDetail.order.customerDetails.email}</span>
          <h4 className="font-medium underline">user address</h4>
          <span>{orderDetail.order.customerDetails.address.line1}</span>
          <span>{orderDetail.order.customerDetails.address.line2}</span>
          <span>{orderDetail.order.customerDetails.address.postal_code}</span>
          <span>{orderDetail.order.customerDetails.address.city}</span>
          <span>{orderDetail.order.customerDetails.address.state}</span>
          <span>{orderDetail.order.customerDetails.address.country}</span>
        </div>
        <section className="flex flex-wrap justify-center">
          {orderDetail &&
            orderDetail.order.orderItems.map((order: any, i: number) => (
              <div
                className="m-2 mt-6 p-3 justify-center items-center flex flex-col b-2 border-solid border-2 rounded-xl"
                key={i}
              >
                <h3 className="font-medium underline">order#{i + 1}</h3>
                <span>quantity: {order.quantity} prints</span>
                {order.imageUrl && (
                  <Image
                    width={200}
                    height={200}
                    src={order.imageUrl}
                    alt="Drawing picture"
                  />
                )}

                <span>{order.name}</span>
              </div>
            ))}
        </section>
      </div>
    </article>
  );
}
