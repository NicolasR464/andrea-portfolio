"use client";
import Link from "next/link";

if (typeof window !== "undefined") {
  localStorage.removeItem("bag");
}

export default function Success() {
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-[60vh]">
      <p className="text-center  text-xl">Thank you for your purchase!</p>
      <p className="text-center  text-lg">
        Your choosen art will soon be on its way to bring a touch of wonder to
        its new space.
      </p>
      <span>
        We sent you a confirmation email, if you didn't receive anything, please
        <Link className="link" href="/contact">
          {" "}
          contact us.
        </Link>
      </span>
    </div>
  );
}
