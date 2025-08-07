// currentListService.ts
import { storage } from "~/src/storage/mmkv";
import type { GroupedProducts, Product } from "~/src/types";

// Fetch the current list from API
export async function fetchCurrentList() {
  const token = storage.getString("token");

  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/lists/current`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch current list");
  }

  const list = await response.json();
  return list;
}

// Group items by category
export async function groupProductsByCategory(): Promise<GroupedProducts> {
  const list = await fetchCurrentList();
  const grouped: GroupedProducts = {};

  list.items.forEach((product: Product) => {
    const category = product.category;
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(product);
  });

  return grouped;
}

export async function addItemToCurrentList(productId: number) {
  const token = storage.getString("token");
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/lists/current/${productId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) throw new Error("Erro ao adicionar item");

  return response.json();
}

export const checkItem = async (id: number) => {
  const token = storage.getString("token");
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/lists/current/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to check item");
  }

  return await response.json();
};

export const deleteItemFromCurrentList = async (productId: number) => {
  const token = storage.getString("token");
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/lists/current/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete item");
  }

  return await response.json();
}