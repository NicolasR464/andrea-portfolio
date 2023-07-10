"use client";

import { useStore } from "@/store";

import { useRef } from "react";

function StoreInitializer({ bag, isOpen }: { bag: []; isOpen: boolean }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState({ bag, isOpen });
    initialized.current = true;
  }

  return null;
}

export default StoreInitializer;
