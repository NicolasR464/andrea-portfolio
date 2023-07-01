import Form from "./add-item-form";
import Image from "next/image";
import Vignette from "./vignette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";

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
  // console.log(items);

  return (
    <>
      <h1 className="text-center text-5xl">Dashboard</h1>
      <Form />
      {!items ? (
        <div className="w-full flex justify-center">
          <span className="loading loading-ring loading-md mt-10"></span>
        </div>
      ) : items && items.length === 0 ? (
        <div className="w-screen flex justify-center">
          <span>You have no drawings registered 😔</span>
        </div>
      ) : (
        <>
          <div className="flex w-full justify-center p-3">
            <FontAwesomeIcon
              className="max-w-logo"
              icon={faAnglesDown}
              size="xs"
            />
            <h4 className="text-center px-2">
              {items.length > 1
                ? "edit/delete your drawings 🎨"
                : "edit/delete your drawing 🎨"}
            </h4>
            <FontAwesomeIcon
              className="max-w-logo"
              icon={faAnglesDown}
              size="xs"
            />
          </div>

          <div className="flex justify-center flex-row-reverse flex-wrap ">
            {items.map((item: any, index: number) => (
              <Vignette item={item} key={index} />
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
