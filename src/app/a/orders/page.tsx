import Table from "@/components/Table";

const getOrders = async () => {
  const ordersRes = await fetch("http://localhost:3000/api/orders");

  //   const resParsed = await ordersRes;
  return ordersRes;
  //   const ordersParsed = await
};

export default async function Orders() {
  const order = await getOrders();

  const data = await order.json();

  console.log("🍕");
  console.log(data);

  return (
    <section>
      <h1 className="text-center text-5xl">orders</h1>
      <Table orders={data} />
    </section>
  );
}
