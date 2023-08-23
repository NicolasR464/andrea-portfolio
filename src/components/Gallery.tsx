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

  gsap.registerPlugin(ScrollTrigger);

  console.log(collections);

  useEffect(() => {
    const horizontalAnim = () => {
      let sections = gsap.utils.toArray(".category");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        // x: -containerRef?.current?.offsetWidth,
        ease: "none",

        scrollTrigger: {
          pin: true,
          // scroller: ".scroller",
          // anticipatePin: 1,
          // pinSpacing: false,
          pinnedContainer: ".gallery",

          start: "top top",
          scrub: 1,
          markers: true,
          trigger: ".gallery",
          toggleActions: "play resume resume resume",
          // invalidateOnRefresh: true,
          // start: "top top",
          // end: () => "+=" + 100,
          // end: "center center",
          end: () => "+=" + containerRef?.current?.offsetWidth,
          // end: "20px 80%",
        },
      });
    };

    if (containerRef?.current?.offsetWidth && objectKeys) horizontalAnim();
  }, [containerRef?.current?.offsetWidth, objectKeys]);

  useEffect(() => {
    setImgsProp(collections);
    setObjectKeys(Object.keys(collections));
  }, [collections]);

  useEffect(() => {
    if (objectKeys) {
      objectKeys.forEach((key: any) => {
        console.log(collections[key]);
        collections[key].map((url: any) => console.log(url));
      });
    }
  }, [collections, objectKeys]);

  return (
    <div ref={containerRef} className="flex gallery flex-row overflow-scroll">
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
                className={`flex w-screen h-screen justify-around  items-center bg-indigo-${
                  index + 1
                }00`}
              >
                {collections[key].map((url: any, index: number) => {
                  return (
                    <Image
                      key={index}
                      className="w-[400px] h-[400px]"
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
      {/* 
      <article className="category">
        <div className="flex w-screen h-screen justify-around  items-center bg-fuchsia-900 ">
          <Image
            className="w-[400px] h-[400px]"
            src="https://res.cloudinary.com/niikkoo/image/upload/v1689322126/andrea-drawing-portfolio-dev/drawing-pics/cgrvgmrrvwvc9fndgdeo.jpg"
            width={500}
            height={500}
            alt="pic1"
          />{" "}
          <Image
            className="w-[400px] h-[400px]"
            src="https://res.cloudinary.com/niikkoo/image/upload/v1689322456/andrea-drawing-portfolio-dev/drawing-pics/tbtty8kgeqczlyvwa7bt.jpg"
            width={500}
            height={500}
            alt="pic2"
          />
        </div>
      </article>
      <article className="category">
        <div className="bg-teal-600	flex justify-around items-center w-screen h-screen">
          <Image
            className="w-[400px] h-[400px]"
            src="https://res.cloudinary.com/niikkoo/image/upload/v1689276719/andrea-drawing-portfolio-dev/drawing-pics/dvjxiq1avkytrz3hsl0e.jpg"
            width={500}
            height={500}
            alt="pic3"
          />
        </div>
      </article>
      <article className="category">
        <div className=" w-screen flex justify-around items-center h-screen bg-rose-400	">
          <Image
            className="w-[400px] h-[400px]  "
            src="https://res.cloudinary.com/niikkoo/image/upload/v1689322003/andrea-drawing-portfolio-dev/drawing-pics/obiqoa2rndxmr3dcwnp5.jpg"
            width={500}
            height={500}
            alt="pic4"
          />
        </div>
      </article>
      <article className="category">
        <div className=" w-screen bg-indigo-800 justify-around	 flex items-center h-screen">
          <Image
            className="w-[400px] h-[400px]  "
            src="https://res.cloudinary.com/niikkoo/image/upload/v1689276719/andrea-drawing-portfolio-dev/drawing-pics/dvjxiq1avkytrz3hsl0e.jpg"
            width={500}
            height={500}
            alt="pic5"
          />
        </div>
      </article> */}
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
