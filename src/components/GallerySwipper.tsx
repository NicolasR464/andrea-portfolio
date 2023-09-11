"use client";
import { CldImage } from "next-cloudinary";

import { Swiper, SwiperSlide } from "swiper/react";
import { HashNavigation, Zoom, FreeMode, Scrollbar } from "swiper/modules";
// import { SwiperOptions } from "swiper/types";
// import { CSSProperties } from "react";

import "swiper/css/pagination";
import "swiper/css/hash-navigation";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";

export default function GallerySwipper({ collections }: { collections: any }) {
  const [objectKeys, setObjectKeys] = useState<any>();
  const [collectionName, setCollectionName] = useState<
    string | null | undefined
  >();

  const [isMouseOut, setIsMouseOut] = useState(true);

  useEffect(() => {
    setCollectionName(Object.keys(collections)[0]);
  }, [collections]);

  useEffect(() => {
    setObjectKeys(Object.keys(collections));
  }, [collections]);

  const menuStyle: React.CSSProperties = isMouseOut
    ? {
        opacity: 0,
        visibility: "hidden",
      }
    : { opacity: 1, visibility: "visible" };

  //   const swiperPaginationStyle = {
  //     "--swiper-pagination-color": "#5a5a5a",
  //   } as CSSProperties;

  return (
    <div className="h-[60vh] flex-col items-end ">
      <Swiper
        // spaceBetween={50}
        // freeMode={true}
        // style={swiperPaginationStyle}
        scrollbar={{
          hide: false,
        }}
        zoom={true}
        modules={[HashNavigation, Zoom, Scrollbar]}
        hashNavigation={{
          watchState: true,
          replaceState: true,
        }}
        // pagination={{ clickable: true }}
        slidesPerView={1}
        onSlideChange={(e) =>
          setCollectionName(
            e?.slides[e?.realIndex]
              ?.getAttribute("data-hash")
              ?.replace(/-/g, " ")
          )
        }
        onSwiper={(swiper: any) => console.log(swiper.history)}
        className="mySwiper translate-y-28"
      >
        {objectKeys &&
          objectKeys.map((collection: any, index: number) => {
            return (
              <div className="flex items-end " id={collection} key={index}>
                {collections[collection].map((url: any, i: number) => {
                  return (
                    <SwiperSlide
                      data-hash={collection.replace(/ /g, "-")}
                      key={url}
                    >
                      <div className="swiper-zoom-container">
                        <CldImage
                          data-collection={collection}
                          className="img h-[auto] max-w-[90vw] max-h-[70vh] tablet:max-w-[60vw]   tablet:min-w-[40vw] m-10 "
                          src={url}
                          width={500}
                          height={500}
                          alt={`picture#${index}`}
                          loading="lazy"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </div>
            );
          })}
      </Swiper>

      {collectionName && (
        <div className="z-[10] fixed bottom-4  justify-center flex w-screen ">
          <div className=" dropdown dropdown-hover dropdown-top">
            <label
              onClick={() => setIsMouseOut(false)}
              tabIndex={0}
              className="btn m-1 w-40"
            >
              {collectionName}
            </label>
            <ul
              style={menuStyle}
              tabIndex={0}
              className="z-[200] -translate-x-[22.5px] dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {objectKeys &&
                objectKeys.map((collection: any, ind: number) => (
                  <li
                    onClick={() => setIsMouseOut(true)}
                    className="flex justify-center"
                    key={ind}
                  >
                    <a
                      href={`/#${collection.replace(/ /g, "-")}`}
                      className="flex justify-center"
                    >
                      {" "}
                      <span className="text-center text-lg">{collection}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// <SwiperSlide data-hash="slide2">
// <div className="bg-sky-700 w-screen h-[30vh]"></div>
// </SwiperSlide>
// <SwiperSlide data-hash="slide3">
// {" "}
// <div className="bg-fuchsia-500 w-screen h-[30vh]"></div>
// </SwiperSlide>
// <SwiperSlide data-hash="slide4">
// {" "}
// <div className="bg-rose-600 w-screen h-[30vh]"></div>
// </SwiperSlide>
// <SwiperSlide data-hash="slide5">
// {" "}
// <div className="bg-yellow-400 w-screen h-[30vh]"></div>
// </SwiperSlide>
