const getOrderDetail = async (id: string) => {
  const orderDetail = await fetch(`${process.env.DOMAIN}/api/orders/${id}`);

  const orderParsed = await orderDetail.json();

  return orderParsed;
};

export default async function Details({ params }: { params: { id: string } }) {
  const orderDetail = await getOrderDetail(params.id);

  return (
    <article>
      <span>Order details</span>
    </article>
  );
}
