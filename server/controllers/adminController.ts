import type { Request, Response } from "express";
import { getProducts } from "../services/main";

export const getProductsAdmin = async (req: Request, res: Response) => {
  const products = await getProducts()
  res.json(products)
}


