"use client";
import { useState } from "react";

export default function Form() {
  const [forSell, setForSell] = useState<boolean>(false);
  const handleChange = (e: any) => setForSell(e.target.checked);

  const handleNewItem = async (event: any) => {
    event.preventDefault();

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
      console.log(fetchRes);
    } catch (err) {
      console.log(err);
    }
  };

  //   const additionalFieldsClassName = forSell ? "fade-in" : "hidden";

  const additionalFieldsStyle: React.CSSProperties = forSell
    ? {
        opacity: 1,
        maxHeight: "500px",
        transition: "opacity 0.5s, max-height 0.5s",
      }
    : {
        opacity: 0,
        maxHeight: 0,
        transition: "opacity 0.5s, max-height 0.5s",
      };

  return (
    <>
      <section className="w-screen flex justify-center ">
        <form
          className="flex flex-col items-center border-2 rounded-xl p-6"
          onSubmit={handleNewItem}
        >
          <label className="input-group mt-2">
            <span>title</span>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              name="name"
              placeholder="What's its title?"
            />
          </label>
          <label className="input-group mt-2">
            <span>collection</span>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              name="collection"
              placeholder="Does it belong to a collection?"
            />
          </label>
          <label className="mt-2 input-group">
            <span>description</span>
            <textarea
              className="textarea textarea-bordered w-full"
              name="description"
              placeholder="Does it have a story?"
            />
          </label>
          <label className="input-group mt-2">
            <span>upload an image</span>
            <input
              type="file"
              name="image"
              className="file-input file-input-ghost w-full max-w-xs"
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
                />
                <span className="rounded-xl label-text">yes</span>
              </label>
            </div>
          </label>
          <div style={additionalFieldsStyle}>
            <label className="input-group mt-2">
              <span>price €</span>
              <input
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
                className="input input-bordered w-full max-w-xs cursor-default"
                type="number"
                name="print_number"
                disabled={!forSell}
                required={forSell}
              />
            </label>

            <label className="input-group mt-2">
              <span>dimension</span>
              <input
                className="input input-bordered w-full max-w-xs cursor-default"
                type="number"
                name="metadataX"
                placeholder="width"
                disabled={!forSell}
                required={forSell}
              />
              <span>X</span>
              <input
                className="input input-bordered w-full max-w-xs cursor-default"
                type="number"
                name="metadataY"
                placeholder="height"
                disabled={!forSell}
              />
            </label>
          </div>

          <button className="btn mt-2 max-w-xs z-10" type="submit">
            ADD
          </button>
        </form>
      </section>
    </>
  );
}

// const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//   const files = event.target.files;
//   const data = new FormData();
//   if (files) {
//     for (let i = 0; i < files.length; i++) {
//       data.append("file", files[i]);
//       data.append("upload_preset", "kjeqxjut");

//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/dgarygsq5/image/upload`,
//         {
//           method: "POST",
//           body: data,
//         }
//       );

//       const file = await response.json();

//       setUserData((prevState) => ({
//         ...prevState,
//         pictures: [...prevState.pictures, file.secure_url],
//       }));
//     }
//   }
// };
