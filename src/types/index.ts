export interface Product {
  id: number;
  nome: string;
  categoria: string;
  imagem: string;
  checked: boolean;
}

export interface ShoppingLists {
  data: string;
  mercado: string;
  concluida: boolean;
  produtos: Product[];
}

export interface ListsByMonth {
  month: string;
  lists: ShoppingLists[];
}

export interface GroupedProducts {
  [categoria: string]: Product[];
}