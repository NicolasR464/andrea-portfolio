"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// interface ImageData {
//   collection: string[];
// }
// interface MyProps {
//   data: ImageData[];
// }

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
    const horizontalAnim = () => {
      let imgs = gsap.utils.toArray(".img");

      const horizontalScroll = gsap.to(imgs, {
        xPercent: -110 * (imgs.length - 1),
        // x: -containerRef?.current?.offsetWidth,
        ease: "none",
        duration: 40,

        scrollTrigger: {
          pin: true,
          pinnedContainer: ".gallery",
          start: "top top",
          scrub: 1,
          markers: true,
          // markers: false,
          trigger: ".gallery",
          toggleActions: "play resume resume resume",
          invalidateOnRefresh: true,
          refreshPriority: 1,
          end: () => "+=" + containerRef?.current?.offsetWidth * 5,
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

  return (
    <div>
      <div className="fixed bottom-4 w-screen justify-center z-[200] flex">
        <h1 className="text-lg tablet:text-xl laptop:text-2xl ">
          {collectionName}
        </h1>
      </div>

      <div className="gallery scrollable-container">
        <article ref={containerRef} className="imgs flex items-end">
          {objectKeys &&
            objectKeys.map((key: any) => {
              return collections[key].map((url: any, index: number) => {
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
              });
            })}
        </article>
      </div>
    </div>
  );
}

// return (
//   <div ref={containerRef} className="flex flex-row imgs-container">
//     {imgsProp &&
//       imgsProp.data.map((img: any, index: number) => (
//         <section key={index}>
//           <div className="w-[50vw] p-2">
//             <Image
//               src={img.image.url}
//               alt="Picture of the author"
//               width={500}
//               height={500}
//               className="m-5 tablet:m-width-[50vw]"
//             />
//           </div>
//         </section>
//       ))}
//   </div>
// );

{
  /* {Object.keys(collections).map((collection: any, index: number) => {
        return collection;
      })} */
}
