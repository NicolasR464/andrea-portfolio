const getOrderDetail = async (id: string) => {
  const orderDetail = await fetch(`http://localhost:3000/api/orders/${id}`);

  const orderParsed = await orderDetail.json();

  return orderParsed;
};

export default async function Details({ params }: { params: { id: string } }) {
  console.log("💥");
  console.log(params.id);
  const orderDetail = await getOrderDetail(params.id);

  console.log(orderDetail);

  return (
    <article>
      <span>Order details</span>
    </article>
  );
}
