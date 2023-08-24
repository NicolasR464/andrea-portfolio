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
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  gsap.registerPlugin(ScrollTrigger);

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
      let sections = gsap.utils.toArray(".category");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        // x: -containerRef?.current?.offsetWidth,
        ease: "none",
        duration: 40,

        scrollTrigger: {
          pin: true,
          // scroller: ".scroller",
          // anticipatePin: 1,
          // pinSpacing: false,
          pinnedContainer: ".gallery",

          start: "top top",
          scrub: 1.2,
          markers: true,
          trigger: ".gallery",
          toggleActions: "play resume resume resume",
          invalidateOnRefresh: true,
          refreshPriority: 1, // influence refresh order

          // start: "top top",
          // end: () => "+=" + 100,
          // end: "center center",
          end: () => "+=" + containerRef?.current?.offsetWidth,
          // end: "20px 80%",
        },
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

  // useEffect(() => {
  //   if (objectKeys) {
  //     objectKeys.forEach((key: any) => {
  //       console.log(collections[key]);
  //       collections[key].map((url: any) => console.log(url));
  //     });
  //   }
  // }, [collections, objectKeys]);

  return (
    <div ref={containerRef} className="flex gallery flex-row overflow-hidden">
      {/* {Object.values(collections).map((collection: any, index: number) => {
        return collections[collection].map((url: any, index: number) => {
          return <h1 key={index}>{url}</h1>;
        });
      })} */}

      {objectKeys &&
        objectKeys.map((key: any, index: number) => {
          return (
            <article key={key} className="category">
              <div
                className={`flex w-screen h-screen justify-around  items-center `}
              >
                {collections[key].map((url: any, index: number) => {
                  return (
                    <Image
                      key={index}
                      className="w-[auto] h-[70%]"
                      src={url}
                      width={500}
                      height={500}
                      alt={`picture#${index}`}
                    />
                  );
                })}
              </div>
            </article>
          );
        })}
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
