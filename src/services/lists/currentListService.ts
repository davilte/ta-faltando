import listsMock from '../../assets/mock/lists.json';
import type { ShoppingLists, GroupedProducts } from '../../types';

export const groupProductsByCategory = async (): Promise<GroupedProducts> => {
  const lists: ShoppingLists[] = listsMock;

  if (!lists || lists.length === 0) return {};

  const firstList = lists[0];
  const grouped: GroupedProducts = {};

  firstList.produtos.forEach(product => {
    const category = product.categoria;
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(product);
  });

  // Simulate latency with setTimeout
  return new Promise<GroupedProducts>(resolve => {
    setTimeout(() => {
      resolve(grouped);
    }, 1000);
  });
};

export const checkItem = (id: number) => {
  const lists: ShoppingLists[] = listsMock;
  if (!lists || lists.length === 0) return;

  const firstList = lists[0];
  const product = firstList.produtos.find(p => p.id === id);

  if (product) {
    product.checked = !product.checked; // Toggle checked status
    console.log(`Product ${product.nome} checked status: ${product.checked}`);
  } else {
    console.log(`Product with id ${id} not found.`);
  }
};