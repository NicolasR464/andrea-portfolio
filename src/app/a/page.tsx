"use client";
import { useState } from "react";

import { addItem } from "./admin-actions";

export default function Dashboard() {
  const [forSell, setForSell] = useState<boolean>(false);

  const handleChange = (e: any) => setForSell(e.target.checked);

  //   const additionalFieldsClassName = forSell ? "fade-in" : "hidden";

  const additionalFieldsStyle: React.CSSProperties = forSell
    ? {
        opacity: 1,
        maxHeight: "500px",
        transition: "opacity 0.5s, max-height 0.5s",
      }
    : { opacity: 0, maxHeight: 0, transition: "opacity 0.5s, max-height 0.5s" };

  return (
    <>
      <h1 className="text-center text-5xl">Dashboard</h1>

      <section className="w-screen flex justify-center ">
        <form
          className="flex flex-col items-center border-2 rounded-xl p-6"
          action={addItem}
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
                className="input input-bordered w-full max-w-xs"
                type="number"
                name="price"
                placeholder="What's its price?"
              />
            </label>
            <label className="mt-2 input-group">
              <span>number of prints</span>
              <input
                className="input input-bordered w-full max-w-xs"
                type="number"
                name="print_number"
              />
            </label>

            <label className="input-group mt-2">
              <span>dimension</span>
              <input
                className="input input-bordered w-full max-w-xs"
                type="number"
                name="metadataX"
                placeholder="width"
              />
              <span>X</span>
              <input
                className="input input-bordered w-full max-w-xs"
                type="number"
                name="metadataY"
                placeholder="height"
              />
            </label>
          </div>

          <button className="btn mt-2 max-w-xs" type="submit">
            ADD
          </button>
        </form>
      </section>
    </>
  );
}
