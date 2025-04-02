import { Product } from "@/sanity.types";
import React from "react";
type AddToCartButtonProps = {
  product: Product;
};
export default function AddToCartButton({ product }: AddToCartButtonProps) {
  return <div>{product._id}</div>;
}
