export interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  checked: boolean;
}

export interface ShoppingList {
  id: number;
  user_id: number;
  date: string;
  market: string;
  completed: boolean;
  items: Product[];
}

export interface ListsByMonth {
  month: string;
  lists: ShoppingList[];
}

export type GroupedProducts = {
  [category: string]: Product[];
};