"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// interface ImageData {
//   collection: string[];
// }
// interface MyProps {
//   data: ImageData[];
// }

let horizontalAnim: any;

export default function Gallery({ collections }: { collections: any }) {
  const [imgsProp, setImgsProp] = useState<any>();
  const containerRef = useRef<any>();
  const [objectKeys, setObjectKeys] = useState<any>();
  const [collectionName, setCollectionName] = useState<string>();
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  useEffect(() => {
    setCollectionName(Object.keys(collections)[0]);
  }, [collections]);

  useEffect(() => {
    // Function to update viewport size
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for resizing
    window.addEventListener("resize", updateViewportSize);

    // Initial call to set the initial viewport size
    updateViewportSize();

    // Cleanup: Remove event listener on unmount
    return () => {
      window.removeEventListener("resize", updateViewportSize);
    };
  }, []);

  useEffect(() => {
    horizontalAnim = () => {
      let imgs = gsap.utils.toArray(".img");

      const horizontalScroll = gsap.to(imgs, {
        // xPercent: -110 * (imgs.length - 1),
        x: -containerRef?.current?.offsetWidth,
        ease: "none",

        scrollTrigger: {
          pin: true,
          pinnedContainer: ".gallery",
          start: "top top",
          scrub: 1,
          markers: true,
          // markers: false,
          trigger: ".gallery",
          toggleActions: "play resume resume resume",
          // invalidateOnRefresh: true,
          refreshPriority: 1,
          end: () => "+=" + containerRef?.current?.offsetWidth,
        },
      });

      // image zoom in/out

      const images = gsap.utils.toArray(".img");

      images.forEach((img: any) => {
        gsap.to(img, {
          keyframes: {
            "0%": { scale: 1 },
            "50%": { scale: 1.1 },
            "100%": { scale: 1 },
          },
          duration: 2,
          scrollTrigger: {
            id: "image",
            trigger: img,

            start: "left center",
            toggleActions: "play none none reset",
            end: "right center", // When the bottom of the image goes past the top of the viewport
            scrub: 2,
            // markers: true,
            markers: false,
            containerAnimation: horizontalScroll,
            onEnter: () => setCollectionName(img.dataset.collection),
            onEnterBack: () => setCollectionName(img.dataset.collection),
          },
        });
      });
    };

    console.log(containerRef.current.offsetWidth);

    if (
      containerRef?.current?.offsetWidth &&
      objectKeys &&
      viewportSize.width !== 0
    )
      horizontalAnim();
  }, [containerRef?.current?.offsetWidth, objectKeys, viewportSize]);

  useEffect(() => {
    setImgsProp(collections);
    setObjectKeys(Object.keys(collections));
  }, [collections]);

  const goTo = (name: string | undefined) => {
    console.log(name);

    setCollectionName(name);

    const element = document.getElementById(name!);
    const rect = element?.getBoundingClientRect();
    const distanceFromTop = rect?.x!;
    console.log(element);
    console.log(rect);

    console.log(distanceFromTop);

    // window.scrollTo({
    //   top: distanceFromTop!,
    //   behavior: "smooth",
    // });

    gsap.to(window, { scrollTo: distanceFromTop });
  };

  return (
    <div>
      {collectionName && (
        <div className="fixed bottom-4  justify-center z-[200] flex w-screen ">
          <div className="dropdown dropdown-hover dropdown-top">
            <label tabIndex={0} className="btn m-1 z-[200]">
              {collectionName}
            </label>
            <ul
              tabIndex={0}
              className="z-[200] dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {objectKeys &&
                objectKeys.map((key: any, index: number) => (
                  <li className="flex justify-center" key={index}>
                    <a className="flex justify-center">
                      {" "}
                      <span onClick={() => goTo(key)} className="text-center">
                        {key}
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}

      <div className="gallery scrollable-container">
        <article ref={containerRef} className="imgs flex items-end w-min">
          {objectKeys &&
            objectKeys.map((key: any, index: number) => {
              return (
                <div className="flex items-end" id={key} key={index}>
                  {collections[key].map((url: any, index: number) => {
                    return (
                      <Image
                        key={index}
                        data-collection={key}
                        className="img h-[auto] tablet:translate-y-28 min-w-[95vw]  tablet:min-w-[40vw] m-10"
                        src={url}
                        width={500}
                        height={500}
                        alt={`picture#${index}`}
                      />
                    );
                  })}
                </div>
              );
            })}
        </article>
      </div>
    </div>
  );
}
