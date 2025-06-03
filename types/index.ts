export interface Produto {
  nome: string;
  categoria: string;
  imagem: string;
  checked: boolean;
}

export interface ListaDeCompras {
  data: string;
  mercado: string;
  produtos: Produto[];
}