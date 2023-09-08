import Form from "./add-item-form";
import Image from "next/image";
import Vignette from "./vignette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CollectionMenu from "@/components/CollectionMenu";

const fetchItems = async () => {
  try {
    const drawings: any = await fetch(process.env.DOMAIN + "/api/art", {
      next: { tags: ["drawings"] },
    });
    const drawingsRes = await drawings.json();

    return drawingsRes.data;
  } catch (err) {
    console.log(err);
  }
};

export default async function Dashboard() {
  const user: any = await currentUser();

  if (
    !(
      user?.emailAddresses[0].emailAddress === process.env.HOST_EMAIL ||
      user?.emailAddresses[0].emailAddress === process.env.DEV_EMAIL
    )
  )
    redirect("/");

  const items = await fetchItems();

  const collections: any = new Object();

  if (items) {
    items.forEach((item: any) => {
      const coll = item.drawing_collection;
      if (!collections.hasOwnProperty(item.drawing_collection)) {
        collections[coll] = new Array();
        collections[coll].push(item);
      } else {
        collections[coll].push(item);
      }
    });
  }

  const collectionKeys = Object.keys(collections);

  return (
    <div className="relative">
      <h1 className="text-center text-5xl">Drawings</h1>
      <Form />
      {!items ? (
        <div className="w-full flex justify-center">
          <span className="loading loading-ring loading-md mt-10"></span>
        </div>
      ) : items && items.length === 0 ? (
        <div className="w-screen flex justify-center">
          <span>You have no drawings saved 😔</span>
        </div>
      ) : (
        <>
          <div className="flex w-full items-center justify-center p-3">
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
          <CollectionMenu page="a" collectionKeys={collectionKeys} />
          <div className="relative flex justify-center flex-row-reverse flex-wrap ">
            {items &&
              collectionKeys.map((collection: any, index: number) => {
                return (
                  <div
                    className="flex items-center justify-center flex-col"
                    key={index}
                  >
                    <h3 id={collection.replace(/ /g, "-")} className="text-xl">
                      {collection}
                    </h3>
                    <section className="flex flex-wrap justify-center">
                      {collections[collection].map((item: any, i: number) => {
                        return <Vignette item={item} key={i} />;
                      })}
                    </section>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

// {  if(!items){
//   return <div className="flex justify-center mt-12">
//   <span className="loading loading-ring loading-md"></span>
// </div>
// }}

//
// {/* alt */}
// {items.map((item: any, index: number) => (
//   <Vignette item={item} key={index} />
// ))}
