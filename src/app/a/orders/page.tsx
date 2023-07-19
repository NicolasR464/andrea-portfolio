import Table from "@/components/Table";
import Filters from "./filters";

const getOrders = async (searchParams: any) => {
  // console.log(searchParams);

  const { input } = searchParams;
  console.log(typeof searchParams);
  console.log(searchParams);
  console.log(searchParams.hasOwnProperty("input"));

  const ordersRes = await fetch(
    searchParams.hasOwnProperty("input")
      ? `http://localhost:3000/api/orders?input=${input}`
      : "http://localhost:3000/api/orders",
    {
      cache: "no-store",
    }
  );

  //  next: { tags: ["orders"] }
  return ordersRes;
};

export default async function Orders({ searchParams }: any) {
  const order = await getOrders(searchParams);

  const data = await order.json();

  return (
    <section>
      <h1 className="text-center text-5xl">orders</h1>
      <Filters />
      <Table orders={data} />
    </section>
  );
}
