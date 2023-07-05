"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";

export default function ShopCard({ item }: { item: any }) {
  const [forSale, setForSale] = useState<boolean>(false);

  const [name, setName] = useState<any>("");
  const [drawingCollection, setDrawingCollection] = useState<string>("");
  const [newImg, setNewImg] = useState<File>();
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [print_number, setPrint_number] = useState<any>();
  const [sale_number, setSale_number] = useState<any>();
  const [width, setWidth] = useState<any>();
  const [height, setHeight] = useState<any>();

  useEffect(() => {
    setName(item.name);
  }, [item.name]);

  useEffect(() => {
    setDrawingCollection(item.drawing_collection);
  }, [item.drawing_collection]);

  useEffect(() => {
    setDescription(item.description);
  }, [item.description]);

  useEffect(() => {
    setImageUrl(item.image.url);
  }, [item.image]);

  useEffect(() => {
    setForSale(item.isForSale);
  }, [item.isForSale]);

  useEffect(() => {
    setPrice(item.price);
  }, [item.price]);

  useEffect(() => {
    setPrint_number(item.print_number_set);
  }, [item.print_number_set]);

  useEffect(() => {
    setSale_number(item.print_number_sold);
  }, [item.print_number_sold]);

  useEffect(() => {
    setWidth(item.width);
  }, [item.width]);

  useEffect(() => {
    setHeight(item.height);
  }, [item.height]);

  return (
    <div>
      <span>ShopCard</span>
    </div>
  );
}
