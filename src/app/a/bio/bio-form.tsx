"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function FormBio({
  bioText,
  bioImgUrl,
}: {
  bioText: string;
  bioImgUrl: string;
}) {
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<any>();
  const [isPosting, setPosting] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setText(bioText);
    console.log(bioText);
  }, [bioText]);
  //   useEffect(() => {
  //     setImage(bioImgUrl);
  //     console.log(bioImgUrl);
  //   }, [bioImgUrl]);

  const handleNewBio = async (event: any) => {
    event.preventDefault();
    setPosting(true);

    const form = new FormData();

    form.append("text", text);
    form.append("image", event.target.image.files[0]);

    const options = {
      method: "POST",
      body: form,
    };

    try {
      const fetchRes = await fetch("/api/about", options);

      if (fetchRes.ok) {
        toast.success("bio updated! ⭐️");

        //EMPTY form values

        setText("");
        setImage("");

        router.refresh();
      } else {
        toast.error("something went wrong, try again.");
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong, try again.");
    }
    setPosting(false);
  };

  return (
    <>
      <section className="w-screen flex justify-center ">
        <form
          className="flex flex-col items-center border-2 rounded-xl p-6 form"
          onSubmit={handleNewBio}
        >
          <label className="mt-2 input-group">
            <span className="break-normal">bio</span>
            <textarea
              value={text}
              onChange={(e: any) => setText(e.target.value)}
              className="textarea textarea-bordered w-full"
              name="bio"
              placeholder="What's your story?"
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
            />
          </label>

          <button
            className="btn mt-2 max-w-xs z-10"
            type="submit"
            disabled={isPosting}
          >
            {isPosting ? (
              <span className="text-center text-neutral-600	  flex items-center">
                SENDING<span className="loading loading-ring loading-sm"></span>
              </span>
            ) : (
              <span className="text-center">EDIT</span>
            )}
          </button>
        </form>
      </section>
    </>
  );
}
