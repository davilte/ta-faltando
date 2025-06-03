import listsMock from "../assets/mock/lists.json";
import { ListaDeCompras } from "../types";

export const getLists = async (): Promise<ListaDeCompras[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(listsMock as ListaDeCompras[]);
    }, 300);
  });
};
