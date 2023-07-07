"use client";

import { useStore } from "@/store";

import { useRef } from "react";

function StoreInitializer({
  price,
  isOpen,
}: {
  price: number;
  isOpen: boolean;
}) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState({ price, isOpen });
    initialized.current = true;
  }

  return null;
}

export default StoreInitializer;
