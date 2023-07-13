import Form from "./add-item-form";
import Image from "next/image";
import Vignette from "./vignette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

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
  const user = await currentUser();
  console.log("💥");

  console.log(user?.emailAddresses[0].emailAddress);

  if (user?.emailAddresses[0].emailAddress !== process.env.HOST_EMAIL)
    redirect("/");

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
