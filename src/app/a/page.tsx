import Form from "./add-item-form";

const fetchItems = async () => {
  //will fetch all items - with a set revalidate tags to update the UI

  return "future products";
};

export default async function Dashboard() {
  const items = await fetchItems();
  console.log(items);

  return (
    <>
      <h1 className="text-center text-5xl">Dashboard</h1>
      <Form />
    </>
  );
}
