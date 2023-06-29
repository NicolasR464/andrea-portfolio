import Form from "./add-item-form";
import Image from "next/image";

const fetchItems = async () => {
  //will fetch all items - with a set revalidate tags to update the UI
  try {
    const drawings = await fetch("http://localhost:3000/api/art", {
      next: { tags: ["drawings"] },
    });
    const drawingsRes = await drawings.json();
    return drawingsRes.data;
  } catch (err) {
    console.log(err);
  }
};

export default async function Dashboard() {
  const items = await fetchItems();
  console.log(items);

  return (
    <>
      <h1 className="text-center text-5xl">Dashboard</h1>
      <Form />
      {!items ? (
        <span className="loading loading-ring loading-md"></span>
      ) : items && items.length === 0 ? (
        <div className="w-screen flex justify-center">
          <span>You have no drawings registered 😔</span>
        </div>
      ) : (
        <>
          <h4 className="text-center">
            {items.length > 1 ? "Your collections" : "Your collection"}
          </h4>
          <div className="flex flex-col-reverse items-center">
            {items.map((item: any, index: number) => (
              <article
                className="p-3 flex flex-col-reverse border-solid border-2 rounded-xl mt-3 max-w-2-3 items-center"
                key={index}
              >
                <span>{item.drawing_collection}</span>
                <Image
                  src={item.image}
                  width={200}
                  height={200}
                  style={{ objectFit: "contain" }}
                  alt="drawing picture"
                />
              </article>
            ))}
          </div>
        </>
      )}
    </>
  );
}

// {  if(!items){
//   return <div className="flex justify-center mt-12">
//   <span className="loading loading-ring loading-md"></span>
// </div>
// }}
