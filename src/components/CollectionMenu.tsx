"use client";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useState, useEffect, DOMElement } from "react";

export default function CollectionMenu({
  collectionKeys,
  page,
}: {
  collectionKeys: any;
  page: string;
}) {
  const [collectionName, setCollectionName] = useState<string>();
  const [isMouseOut, setIsMouseOut] = useState(true);
  const [pageRef, setPageRef] = useState<string | undefined>();

  gsap.registerPlugin(ScrollToPlugin);
  if (page == "a") gsap.registerPlugin(ScrollTrigger);

  const goTo = (collection: string) => {
    setCollectionName(collection);

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${collection.replace(/ /g, "-")}`, offsetY: 135 },
    });
  };

  useEffect(() => {
    setPageRef(page);
  }, [page]);

  useEffect(() => {
    setCollectionName(collectionKeys[0]);
  }, [collectionKeys]);

  const menuStyle: React.CSSProperties = isMouseOut
    ? {
        opacity: 0,
        visibility: "hidden",
      }
    : { opacity: 1, visibility: "visible" };

  useEffect(() => {
    if (page == "a") {
      gsap.registerPlugin(ScrollTrigger);

      const vignettes = gsap.utils.toArray("article");

      vignettes.forEach((vignette: any) => {
        ScrollTrigger.create({
          trigger: vignette,
          start: "top 170px",
          end: "center",
          // markers: true,
          markers: false,

          onEnter: (self) => {
            const element = self?.trigger;

            setCollectionName(element?.getAttribute("data-collection")!);
          },
          onLeave: (self) => {
            const element = self?.trigger;
            //
          },
          onEnterBack: (self) => {
            const element = self?.trigger;

            setCollectionName(element?.getAttribute("data-collection")!);
          },
        });
      });
    }
  }, [page]);
  return (
    <div className="z-[10] justify-center flex w-screen sticky top-4 left-0 right-0">
      {collectionKeys && collectionName && (
        <div>
          <div
            onMouseEnter={() => setIsMouseOut(false)}
            className={
              pageRef === "a"
                ? "dropdown dropdown-hover dropdown-bottom"
                : " dropdown dropdown-hover dropdown-top"
            }
          >
            <label tabIndex={0} className="btn m-1 w-40">
              {collectionName}
            </label>
            <ul
              style={menuStyle}
              onMouseLeave={() => setIsMouseOut(true)}
              tabIndex={0}
              className="z-[200] -translate-x-[22.5px] dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {collectionKeys &&
                collectionKeys.map((collection: string, index: number) => (
                  <li
                    onClick={() => goTo(collection)}
                    className="flex justify-center"
                    key={index}
                  >
                    <span className="flex justify-center">
                      {" "}
                      <span className="text-center">{collection}</span>
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
