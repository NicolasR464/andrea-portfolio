import { create } from "zustand";

interface Item {
  id: string;
  stripeId: string;
  collection: string;
  img: string;
  price: number;
  prints_left: number;
  amount_selected: number;
}

export const useStore = create<{
  isOpen: Boolean;
  bag: Item[];
  cartTotal: number;
}>((set) => ({
  isOpen: false,
  bag: [],
  cartTotal: 0,
}));
