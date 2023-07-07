import { create } from "zustand";

export const useStore = create<{
  isOpen: Boolean;
  collection: string;
  price: number;
  cartTotal: number;
}>((set) => ({
  isOpen: false,
  collection: "",
  price: 0,
  cartTotal: 0,
}));
