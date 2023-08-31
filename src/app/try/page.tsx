/* eslint-disable @next/next/no-img-element */
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Horizontal() {
  const containerRef = useRef<any>();

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    let sections = gsap.utils.toArray(".category");

    const container = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".gallery",
        pin: true,
        scrub: 1,
        markers: true,
        // start: "top top",
        // snap: 1 / (sections.length - 1),
        toggleActions: "restart pause resume none",
        end: () => "+=" + containerRef?.current?.offsetWidth * 8,
      },
    });
  }, [containerRef.current?.offsetWidth]);

  return (
    <div>
      <section className="header w-screen h-28 bg-fuchsia-300 fixed top-0 z-10"></section>

      <div ref={containerRef} className="flex gallery flex-row overflow-scroll">
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
        </article>
      </div>
    </div>
  );
}
