"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
import formData from "./form-template";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { publicImgUpload } from "../../utils/handle-img";

interface Props {
  item?: any;
}

const Vignette: React.FC<Props> = ({ item }) => {
  const [forSale, setForSale] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [name, setName] = useState<any>("");
  const [drawingCollection, setDrawingCollection] = useState<string>("");
  const [newImg, setNewImg] = useState<Object>({});
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<any>();
  const [image, setImage] = useState<any>(undefined);
  const [price, setPrice] = useState<any>(undefined);
  const [print_number, setPrint_number] = useState<any>(undefined);
  const [sale_number, setSale_number] = useState<any>(undefined);
  const [width, setWidth] = useState<any>(undefined);
  const [height, setHeight] = useState<any>(undefined);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const router = useRouter();

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
        zIndex: -3,
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
    setImageUrl(item.image?.url);
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

  // UPDATE IMAGE

  const updateImg = async (file: any) => {
    if (file) {
      const url = window.URL.createObjectURL(
        new Blob([file], { type: "image/jpg" })
      );
      setImageUrl(url);

      const img: any = await publicImgUpload(file);

      setNewImg(img);
    }
  };

  //EDIT FN

  const editVignette = async (id: string) => {
    setIsEditing(true);

    if (forSale === true) {
      if (
        price === undefined ||
        print_number == undefined ||
        width === undefined ||
        height === undefined
      ) {
        // toaster
        setIsEditing(false);

        toast.error(
          "👋 A drawing for sale needs info like price, number of prints, etc."
        );
        return;
      }
    }

    const form = formData(
      name,
      drawingCollection,
      description,
      newImg,
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
      const fetchRes = await fetch(`/api/art/${id}`, options);
      console.log(fetchRes);
      if (!fetchRes.ok) toast.error("something went wrong, try again...");
      router.refresh();
      if (fetchRes.ok) toast.success("drawing info updated! 👌");
    } catch (err) {
      console.log(err);
      toast.error("something went wrong, try again...");
    }
    setIsEditing(false);
  };

  const handleDelete = async (id: string) => {
    setDeleteModal(true);
    setIsDeleting(true);

    const options = {
      method: "DELETE",
    };
    try {
      const fetchRes = await fetch(`/api/art/${id}`, options);
      setDeleteModal(false);
      router.refresh();

      fetchRes.ok
        ? toast.info("drawing deleted 🗑")
        : toast.error("something went wrong, try again...");
    } catch (err) {
      console.log(err);
      toast.error("something went wrong, try again...");
      router.replace("/a");
    }

    setIsDeleting(false);
  };

  return (
    <article className=" tablet:min-w-[400px] mt-2 p-2 tablet:m-4 flex flex-col  border-solid border-2 rounded-xl  tablet:max-w-2-3 items-center  transition duration-500 tablet:hover:scale-105 ">
      {imageUrl && (
        <Image
          src={imageUrl}
          width={200}
          height={200}
          style={{ objectFit: "contain" }}
          alt="drawing picture"
        />
      )}

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
          <span className="label-text-alt text-center">upload new image</span>
        </label>
        <input
          type="file"
          className="file-input file-input-ghost w-full max-w-xs"
          onChange={(e: any) => updateImg(e.target.files[0])}
        />
      </div>
      <div className="form-control  w-full">
        <label className="label">
          <span className="label-text-alt">description</span>
        </label>
        <textarea
          className="textarea textarea-bordered text-base"
          placeholder="what's its story?"
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
            <span className="label-text-alt">
              {sale_number > 0 ? "number of prints left" : "number of prints "}
            </span>
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
        disabled={isEditing}
      >
        {isEditing ? (
          <span className="text-green-600	flex items-center">
            editing<span className="loading loading-ring loading-sm"></span>
          </span>
        ) : (
          "edit"
        )}
      </button>
      <div>
        {deleteModal && (
          <div className=" md:w-96 bg-rose-200 absolute border-solid -translate-y-3/4 -translate-x-1/2 border-2 p-10 rounded-lg border-rose-500 b-0 left-1/2">
            <p className="text-center">Are you sure you want to delete it?</p>
            <div className="collapse  bg-rose-200">
              <input type="checkbox" />
              <div className=" collapse-title">
                <p className="text-center flex justify-center">
                  <FontAwesomeIcon
                    className="max-w-logo translate-x-4"
                    icon={faInfoCircle}
                    size="xl"
                  />
                </p>
              </div>
              <div className="collapse-content">
                <p className="text-center">
                  Its data will be archived if you put it
                  <br /> for sale at least once.
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setDeleteModal(false)}
                className="btn m-1  btn-outline "
              >
                cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={() => handleDelete(item._id)}
                className="btn m-1 btn-outline btn-error"
              >
                {isDeleting ? "deleting" : "delete"}
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setDeleteModal(true)}
          className="btn mt-1 btn-outline btn-error"
          disabled={deleteModal}
        >
          delete
        </button>
      </div>
    </article>
  );
};

export default Vignette;
