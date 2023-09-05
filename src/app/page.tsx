// "use client";
import Image from "next/image";
import Gallery from "@/components/Gallery";
import { headers } from "next/headers";

const getImgs = async () => {
  const imgs: any = await fetch("http://localhost:3000/api/art?p=home");

  const imgsParsed = await imgs.json();
  return imgsParsed;
};

export default async function Home() {
  const imgs = await getImgs();
  const collections: any = new Object();
  const headersList = headers();
  const userAgent = headersList.get("user-agent");
  let isMobileView = userAgent!.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );
  // collections should be an object containing arrays of image urls separated by their category

  imgs.data.forEach((img: any) => {
    console.log(img.drawing_collection);
    const coll = img.drawing_collection;
    if (!collections.hasOwnProperty(img.drawing_collection)) {
      collections[coll] = new Array();
      collections[coll].push(img.image.url);
    } else {
      collections[coll].push(img.image.url);
    }
  });

  return (
    <div>
      {!isMobileView && (
        <h1 className="hidden tablet:block text-xl tablet:text-2xl laptop:text-3xl fixed top-[30px] translate-x-[-50%] left-[50%] z-[100] text-center tracking-[.20em]">
          <span className=" tracking-[.18em] ">ANDREA</span>
          <br />
          <span className=" tracking-[.40em] -translate-y-3">ROCAGEL</span>
          <br />
          <span className=" tracking-[.60em]">DRAWINGS</span>
        </h1>
      )}

      <Gallery collections={collections} />
    </div>
  );
}

////////////////////////////////////////////////////////

// "use client";
// import Image from "next/image";
// import { useState, useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // interface ImageData {
// //   collection: string[];
// // }
// // interface MyProps {
// //   data: ImageData[];
// // }

// export default function Gallery() {
//   const [imgsProp, setImgsProp] = useState<any>();
//   const containerRef = useRef<any>();

//   gsap.registerPlugin(ScrollTrigger);

//   // console.log(collections);

//   useEffect(() => {
//     let sections = gsap.utils.toArray(".category");

//     gsap.to(sections, {
//       xPercent: -100 * (sections.length - 1),
//       ease: "none",

//       scrollTrigger: {
//         pin: true,
//         // pinSpacing: false,
//         // start: "top top+=96",
//         scrub: 1,
//         markers: true,
//         trigger: ".gallery",
//         toggleActions: "restart pause resume none",
//         // end: () => "+=" + 100,
//         // end: "center center",
//         end: () => "+=" + containerRef?.current?.offsetWidth * 8,
//       },
//     });
//   }, [containerRef?.current?.offsetWidth]);

//   // useEffect(() => {
//   //   setImgsProp(collections);
//   // }, [collections]);

//   return (
//     <div ref={containerRef} className="flex gallery flex-row overflow-scroll">
//       <article className="category">
//         <div className="flex w-screen h-screen justify-around  items-center bg-fuchsia-900 ">
//           <Image
//             className="w-[400px] h-[400px]"
//             src="https://res.cloudinary.com/niikkoo/image/upload/v1689322126/andrea-drawing-portfolio-dev/drawing-pics/cgrvgmrrvwvc9fndgdeo.jpg"
//             width={500}
//             height={500}
//             alt="pic1"
//           />{" "}
//           <Image
//             className="w-[400px] h-[400px]"
//             src="https://res.cloudinary.com/niikkoo/image/upload/v1689322456/andrea-drawing-portfolio-dev/drawing-pics/tbtty8kgeqczlyvwa7bt.jpg"
//             width={500}
//             height={500}
//             alt="pic2"
//           />
//         </div>
//       </article>
//       <article className="category">
//         <div className="bg-teal-600	flex justify-around items-center w-screen h-screen">
//           <Image
//             className="w-[400px] h-[400px]"
//             src="https://res.cloudinary.com/niikkoo/image/upload/v1689276719/andrea-drawing-portfolio-dev/drawing-pics/dvjxiq1avkytrz3hsl0e.jpg"
//             width={500}
//             height={500}
//             alt="pic3"
//           />
//         </div>
//       </article>
//       <article className="category">
//         <div className=" w-screen flex justify-around items-center h-screen bg-rose-400	">
//           <Image
//             className="w-[400px] h-[400px]  "
//             src="https://res.cloudinary.com/niikkoo/image/upload/v1689322003/andrea-drawing-portfolio-dev/drawing-pics/obiqoa2rndxmr3dcwnp5.jpg"
//             width={500}
//             height={500}
//             alt="pic4"
//           />
//         </div>
//       </article>
//       <article className="category">
//         <div className=" w-screen bg-indigo-800 justify-around	 flex items-center h-screen">
//           <Image
//             className="w-[400px] h-[400px]  "
//             src="https://res.cloudinary.com/niikkoo/image/upload/v1689276719/andrea-drawing-portfolio-dev/drawing-pics/dvjxiq1avkytrz3hsl0e.jpg"
//             width={500}
//             height={500}
//             alt="pic5"
//           />
//         </div>
//       </article>
//     </div>
//   );
// }

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
