"use client";

export default function NavBurger() {
  const burgerLineOne: React.CSSProperties = {
    width: "40px",
    height: "5px",
    backgroundColor: "grey",
    borderRadius: "5px",
    transform: "rotate(45deg)",
  };

  const burgerLineTwo: React.CSSProperties = {
    width: "40px",
    height: "5px",
    backgroundColor: "grey",
    borderRadius: "5px",
    transform: "rotate(-45deg)",
  };

  return (
    <div>
      <span>
        <div style={burgerLineOne} className="burger-line-one"></div>
        <div style={burgerLineTwo} className="burger-line-two"></div>
      </span>
    </div>
  );
}
