"use client";
import { useStore } from "@/store";

export default function CartDrawer() {
  const { price, isOpen } = useStore();

  return (
    <div className="overflow-x-hidden drawer cart-drawer transition-all duration-1000  translate-x-full border-2  h-screen z-50 max-w-sm absolute top-0 right-0 backdrop-blur-sm">
      <div className="mt-14 flex w-full justify-center min-w-[384px] ">
        <span>{isOpen ? "OPEN " : "CLOSED"}</span>
        <span>{price}</span>
        <h2 className="text-center text-4xl tracking-wide	">your bag</h2>
      </div>
    </div>
  );
}
