"use client";
import { useStore } from "@/store";
import { useState, useEffect, useRef } from "react";
import StoreInitializer from "@/components/StoreInitializer";
import CheckOutBtn from "@/components/CheckOutBtn";
import CartVignette from "@/components/CartVignette";

export default function CartDrawer() {
  const { bag, isOpen } = useStore();
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (isOpen && inputRef.current && !inputRef.current.contains(e.target)) {
        useStore.setState((state) => ({ isOpen: false }));
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  const drawerAnimation: React.CSSProperties = isOpen
    ? {
        borderLeft: "1px solid rgba(118, 118, 118, 0.471)",
        transform: "translateX(0px)",
      }
    : { transform: "translateX(100%)" };

  return (
    <div className="fixed z-50 top-0 right-0">
      <div ref={inputRef} className="relative cart max-w-screen z-40">
        <div
          style={drawerAnimation}
          className="overflow-x-hidden drawer cart-drawer transition-all duration-1000 w-screen  translate-x-full border-2  h-screen z-50 tablet:max-w-sm absolute top-0 right-0 backdrop-blur-lg"
        >
          <div className="mt-14 flex w-full flex-col justify-between min-w-[384px] ">
            <button
              onClick={() => {
                useStore.setState((state) => ({
                  isOpen: !state.isOpen,
                }));
              }}
              className="link absolute top-3 left-3"
            >
              close
            </button>
            <h2 className="text-center tracking-wider text-4xl ">your bag</h2>
            <div className="max-h-[80vh] overflow-scroll">
              {bag.map((item, i) => (
                <CartVignette item={item} key={i} />
              ))}
            </div>

            <CheckOutBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
