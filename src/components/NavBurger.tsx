"use client";
import { useState } from "react";

export default function NavBurger() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(true);

  const burgerLineOne: React.CSSProperties = isBurgerOpen
    ? {
        width: "40px",
        height: "5px",
        backgroundColor: "#484848",
        borderRadius: "2px",
        transform: "rotate(0deg)  translate(0px,10px)",
        transition: "transform 0.5s, backgroundColor 1s",
      }
    : {
        width: "40px",
        height: "5px",
        backgroundColor: "#101010",
        borderRadius: "2px",
        transform: "rotate(45deg)  translate(0px,0px)",
        transition: "transform 0.5s, backgroundColor 1s",
      };

  const burgerLineTwo: React.CSSProperties = isBurgerOpen
    ? {
        width: "40px",
        height: "5px",
        backgroundColor: "#484848",
        borderRadius: "2px",
        transform: "rotate(0deg)  translate(0px,-10px)",
        transition: "transform 0.5s, backgroundColor 1s",
      }
    : {
        width: "40px",
        height: "5px",
        backgroundColor: "#101010",
        borderRadius: "2px",
        transform: "rotate(-45deg)  translate(2px,-4px)",
        transition: "transform 0.5s, backgroundColor 1s",
      };

  return (
    <div>
      <span className="m-3" onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
        <div style={burgerLineOne} className="burger-line-one"></div>
        <div style={burgerLineTwo} className="burger-line-two"></div>
      </span>
    </div>
  );
}
