"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Form() {
  const [forSell, setForSell] = useState<boolean>(false);
  const [isPosting, setPosting] = useState<boolean>(false);
  const [name, setName] = useState<any>("");
  const [drawingCollection, setDrawingCollection] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [print_number, setPrint_number] = useState<any>();
  const [width, setWidth] = useState<any>();
  const [height, setHeight] = useState<any>();

  const router = useRouter();

  const handleChange = (e: any) => setForSell(e.target.checked);

  const handleNewItem = async (event: any) => {
    event.preventDefault();
    setPosting(true);

    // console.log(event.target.image.files[0]);
    // return;

    const formData = new FormData();

    formData.append("name", event.target.name.value);
    formData.append("collection", event.target.collection.value);
    formData.append("description", event.target.description.value);
    formData.append("image", event.target.image.files[0]);
    formData.append("active", event.target.for_sale.checked);
    formData.append("price", event.target.price.value);
    formData.append("print_number", event.target.print_number.value);
    formData.append("metadataX", event.target.metadataX.value);
    formData.append("metadataY", event.target.metadataY.value);

    const options = {
      method: "POST",

      body: formData,
    };

    // delete options.headers["Content-Type"];
    // api call
    try {
      const fetchRes = await fetch("/api/art", options);
      fetchRes.ok
        ? toast.success("new drawing added! 🧑🏻‍🎨")
        : toast.error("something went wrong, try again.");

      //EMPTY form values
      setForSell(false);
      setName("");
      setDrawingCollection("");
      setDescription("");
      setImage("");
      setPrice("");
      setPrint_number("");
      setWidth("");
      setHeight("");

      router.replace("/a");
    } catch (err) {
      console.log(err);
      toast.error("something went wrong, try again.");
    }
    setPosting(false);
  };

  //   const additionalFieldsClassName = forSell ? "fade-in" : "hidden";

  const additionalFieldsStyle: React.CSSProperties = forSell
    ? {
        opacity: 1,
        zIndex: 0,
        maxHeight: "500px",
        transition: "opacity 0.5s, max-height 0.5s",
      }
    : {
        opacity: 0,
        maxHeight: 0,
        zIndex: -1,
        transition: "opacity 0.5s, max-height 0.5s",
      };

  return (
    <>
      <ToastContainer position="top-center" hideProgressBar theme="colored" />
      <section className="w-screen flex justify-center ">
        <form
          className="flex flex-col items-center border-2 rounded-xl p-6 form"
          onSubmit={handleNewItem}
        >
          <span>add a new drawing ✨</span>
          <label className="input-group mt-2">
            <span>title</span>
            <input
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              className="input input-bordered w-full max-w-xs"
              type="text"
              name="name"
              placeholder="What's its title?"
            />
          </label>
          <label className="input-group mt-2">
            <span>collection</span>
            <input
              value={drawingCollection}
              onChange={(e) => setDrawingCollection(e.target.value)}
              className="input input-bordered w-full max-w-xs"
              type="text"
              name="collection"
              placeholder="Does it belong to a collection?"
              required
            />
          </label>
          <label className="mt-2 input-group">
            <span>description</span>
            <textarea
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full"
              name="description"
              placeholder="Does it have a story?"
            />
          </label>
          <label className="input-group mt-2">
            <span>upload an image</span>
            <input
              value={image}
              onChange={(e: any) => setImage(e.target.value)}
              type="file"
              name="image"
              className="file-input file-input-ghost w-full max-w-xs"
              required
            />
          </label>
          <label className="input-group mt-2">
            <span>for sale?</span>

            <div className="form-control w-52">
              <label className="cursor-pointer label">
                <span className="rounded-xl label-text">no</span>
                <input
                  name="for_sale"
                  type="checkbox"
                  className="toggle toggle-primary"
                  onChange={handleChange}
                  checked={forSell}
                />
                <span className="rounded-xl label-text">yes</span>
              </label>
            </div>
          </label>
          <div style={additionalFieldsStyle}>
            <label className="input-group mt-2">
              <span>price €</span>
              <input
                value={price}
                onChange={(e: any) => setPrice(e.target.value)}
                className="input input-bordered w-full max-w-xs cursor-auto"
                type="number"
                name="price"
                placeholder="What's its price?"
                disabled={!forSell}
                required={forSell}
              />
            </label>
            <label className="mt-2 input-group">
              <span>number of prints</span>
              <input
                value={print_number}
                onChange={(e: any) => setPrint_number(e.target.value)}
                className="input input-bordered w-full max-w-xs cursor-default"
                type="number"
                name="print_number"
                disabled={!forSell}
                required={forSell}
              />
            </label>

            <label className="input-group mt-2">
              <span className="text-center">dimension (cm)</span>
              <input
                value={width}
                onChange={(e: any) => setWidth(e.target.value)}
                className="input input-bordered w-full max-w-xs cursor-default"
                type="number"
                name="metadataX"
                placeholder="width"
                disabled={!forSell}
                required={forSell}
              />
              <span>X</span>
              <input
                value={height}
                onChange={(e: any) => setHeight(e.target.value)}
                className="input input-bordered w-full max-w-xs cursor-default"
                type="number"
                name="metadataY"
                placeholder="height"
                disabled={!forSell}
              />
            </label>
          </div>

          <button
            className="btn mt-2 max-w-xs z-10"
            type="submit"
            disabled={isPosting}
          >
            {isPosting ? (
              <span className="text-center">
                SENDING<span className="loading loading-ball loading-sm"></span>
              </span>
            ) : (
              <span className="text-center">ADD</span>
            )}
          </button>
        </form>
      </section>
    </>
  );
}
