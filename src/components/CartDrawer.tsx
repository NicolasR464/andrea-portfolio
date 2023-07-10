"use client";
import { useStore } from "@/store";
import { useState, useEffect } from "react";
import StoreInitializer from "@/components/StoreInitializer";
import CheckOutBtn from "@/components/CheckOutBtn";
import CartVignette from "@/components/CartVignette";

export default function CartDrawer() {
  const { bag, isOpen, cartTotal } = useStore();
  //   const [isDrawerOpen, setIsOpen] = useState<any>(isOpen);
  //   useStore.setState({ price, isDrawerOpen });
  //   useEffect(() => {}, [bag]);

  console.log(bag);
  const drawerAnimation: React.CSSProperties = isOpen
    ? {
        borderLeft: "1px solid rgba(118, 118, 118, 0.471)",
        transform: "translateX(0px)",
      }
    : {};

  return (
    <div
      style={drawerAnimation}
      className="overflow-x-hidden drawer cart-drawer transition-all duration-1000  translate-x-full border-2  h-screen z-50 max-w-sm absolute top-0 right-0 backdrop-blur-sm"
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
        <h2 className="text-center text-4xl ">your bag</h2>

        {bag.map((item, i) => (
          <CartVignette item={item} key={i} />
        ))}

        <CheckOutBtn cartTotal={cartTotal} cartObj={{}} />
      </div>
    </div>
  );
}
