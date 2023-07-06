import ShopCard from "./ShopCard";

const fetchItems = async () => {
  //will fetch all items - with a set revalidate tags to update the UI
  try {
    const data = await fetch("http://localhost:3000/api/shop");
    const res = await data.json();
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default async function Buy() {
  const items = await fetchItems();

  console.log(items);

  return (
    <div>
      <h2 className="text-center text-5xl">shop</h2>
      {items.map((item: any, index: number) => (
        <ShopCard item={item} key={index} />
      ))}
    </div>
  );
}
