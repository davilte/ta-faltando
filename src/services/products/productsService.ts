import { storage } from "~/src/storage/mmkv";
import { Product } from "~/src/types";

export async function fetchAvailableProducts(): Promise<Product[]> {
  const token = storage.getString("token");

  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Erro ao buscar produtos");

  return response.json();
}