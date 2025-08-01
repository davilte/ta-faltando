import { ListsByMonth, ShoppingList } from "../../types";
import { storage } from "~/src/storage/mmkv";
import Constants from 'expo-constants';

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export const completedListsByMonthService = async (): Promise<ListsByMonth[]> => {
  const token = storage.getString("token");
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/lists/completed`, {
    headers: {
    "Authorization": `Bearer ${token}`,
  }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch lists");
  }
  const lists: ShoppingList[] = await response.json();

  // Agrupar por mês
  const grouped: { [key: string]: ShoppingList[] } = {};

  lists.forEach((list) => {
    const date = new Date(list.date);
    const monthName = monthNames[date.getMonth()];

    if (!grouped[monthName]) {
      grouped[monthName] = [];
    }
    grouped[monthName].push(list);
  });

  // Converter para array e ordenar
  const groupedArray: ListsByMonth[] = Object.entries(grouped).map(
    ([month, lists]) => ({ month, lists })
  );

  groupedArray.sort(
    (a, b) => monthNames.indexOf(b.month) - monthNames.indexOf(a.month)
  );

  return groupedArray;
};