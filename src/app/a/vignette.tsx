"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
import formData from "./form-template";

interface Props {
  item?: any;
}

const Vignette: React.FC<Props> = ({ item }) => {
  const [forSale, setForSale] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<any>("");
  const [drawingCollection, setDrawingCollection] = useState<string>("");
  const [newImg, setNewImg] = useState<File>();
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [print_number, setPrint_number] = useState<any>();
  const [sale_number, setSale_number] = useState<any>();
  const [width, setWidth] = useState<any>();
  const [height, setHeight] = useState<any>();

  const handleChange = (e: any) => setForSale(e.target.checked);

  const additionalFieldsStyle: React.CSSProperties = forSale
    ? {
        opacity: 1,
        zIndex: 0,
        maxHeight: "300px",
        transition: "opacity 0.5s, max-height 0.5s",
      }
    : {
        opacity: 0,
        maxHeight: 0,
        zIndex: -1,
        transition: "opacity 0.5s, max-height 0.5s",
      };

  useEffect(() => {
    setName(item.name);
  }, [item.name]);

  useEffect(() => {
    setDrawingCollection(item.drawing_collection);
  }, [item.drawing_collection]);

  useEffect(() => {
    setDescription(item.description);
  }, [item.description]);

  useEffect(() => {
    setImage(item.image);
  }, [item.image]);

  useEffect(() => {
    setForSale(item.isForSale);
  }, [item.isForSale]);

  useEffect(() => {
    setPrice(item.price);
  }, [item.price]);

  useEffect(() => {
    setPrint_number(item.print_number_set);
  }, [item.print_number_set]);

  useEffect(() => {
    setSale_number(item.print_number_sold);
  }, [item.print_number_sold]);

  useEffect(() => {
    setWidth(item.width);
  }, [item.width]);

  useEffect(() => {
    setHeight(item.height);
  }, [item.height]);

  //EDIT FN
  const editVignette = async (id: string) => {
    console.log(id);

    const img = newImg ? newImg : image;

    const form = formData(
      name,
      drawingCollection,
      description,
      img,
      forSale,
      price,
      print_number,
      width,
      height
    );

    const options = {
      method: "PUT",
      body: form,
    };
    try {
      const fetchMethod = await fetch(`/api/art/${id}`, options);
      const fetchRes = await fetchMethod.json();
      console.log(fetchRes);

      // if (fetchRes.ok)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article className="min-w-[400px] p-2 m-4 flex flex-col  border-solid border-2 rounded-xl  max-w-2-3 items-center  transition duration-500 hover:scale-105 ">
      <Image
        src={item.image.url}
        width={200}
        height={200}
        style={{ objectFit: "contain" }}
        alt="drawing picture"
      />

      <div className="form-control">
        <label className="label">
          <span className="label-text-alt text-center">name</span>
        </label>
        <input
          className="input input-bordered w-full max-w-xs"
          placeholder="does it have a name?"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text-alt">collection</span>
        </label>
        <input
          className="input input-bordered w-full max-w-xs"
          value={drawingCollection}
          placeholder="name of collection"
          onChange={(e) => setDrawingCollection(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text-alt text-center">upload new photo</span>
        </label>
        <input
          type="file"
          className="file-input file-input-ghost w-full max-w-xs"
          onChange={(e: any) => setNewImg(e.target.files[0])}
        />
      </div>
      <div className="form-control  w-full">
        <label className="label">
          <span className="label-text-alt">description</span>
        </label>
        <textarea
          className="textarea textarea-bordered text-base"
          placeholder="what's it story?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-control items-center m-2 justify-center  flex flex-row w-full">
        <label className="label">
          <span className="label-text-alt">for sale</span>
        </label>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={forSale}
          onChange={handleChange}
        />
      </div>
      {sale_number > 0 && (
        <div>
          <span>Prints sold : {sale_number}</span>
        </div>
      )}

      <div style={additionalFieldsStyle}>
        <div className="form-control">
          <label className="label ">
            <span className="label-text-alt text-center">price €</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="number"
            placeholder="unit price €"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={!forSale}
            required={forSale}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text-alt">number of prints</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="number"
            value={print_number}
            placeholder="How many prints?"
            onChange={(e) => setPrint_number(e.target.value)}
            disabled={!forSale}
            required={forSale}
          />
        </div>
        <div className="form-control  items-center">
          <label className="label">
            <span className="label-text-alt">dimension (cm)</span>
          </label>
          <div className="flex flex-row items-center">
            <input
              className="input w-20 input-bordered max-w-xs"
              type="number"
              placeholder="width (cm)"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              disabled={!forSale}
              required={forSale}
            />
            <span className="px-6">X</span>
            <input
              className="input input-bordered w-20 max-w-xs"
              type="number"
              placeholder="height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              disabled={!forSale}
              required={forSale}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => editVignette(item._id)}
        className="btn  btn-outline btn-success mt-1"
      >
        edit
      </button>
      <button className="btn mt-1 btn-outline btn-error">delete</button>
    </article>
  );
};

export default Vignette;
