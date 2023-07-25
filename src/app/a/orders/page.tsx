import Table from "@/components/Table";
import Filters from "./filters";

const getOrders = async (searchParams: any) => {
  // console.log(searchParams);

  const { input, date } = searchParams;
  console.log(typeof searchParams);
  console.log(searchParams);
  console.log(searchParams.hasOwnProperty("input"));
  // console.log(searchParams.hasOwnProperty("date"));

  const ordersRes = await fetch(
    searchParams.hasOwnProperty("input")
      ? `http://localhost:3000/api/orders?input=${input}&date=${date}`
      : "http://localhost:3000/api/orders",
    {
      cache: "no-store",
    }
  );
  // console.log("🚀🚀");
  // console.log(ordersRes);
  const resParsed = await ordersRes.json();

  //  next: { tags: ["orders"] }
  return resParsed.data;
};

export default async function Orders({ searchParams }: any) {
  const orders = await getOrders(searchParams);

  // const data = await order.json();

  // console.log(orders);

  return (
    <section>
      <h1 className="text-center text-5xl">orders</h1>
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
  );
}
