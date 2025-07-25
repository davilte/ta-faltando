import listsMock from "../../assets/mock/lists.json";
import { ShoppingLists, ListsByMonth } from "../../types";

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export const getListsGroupedByMonth = async (): Promise<ListsByMonth[]> => {

  // Group by month (extract month from date string)
  const grouped: { [key: string]: ShoppingLists[] } = {};

  (listsMock as ShoppingLists[]).forEach((list) => {
    const date = new Date(list.data);
    const monthName = monthNames[date.getMonth()];

    if (!grouped[monthName]) {
      grouped[monthName] = [];
    }
    grouped[monthName].push(list);
  });

  // Convert grouped object to array of {month, lists}
  const groupedArray: ListsByMonth[] = Object.entries(grouped).map(
    ([month, lists]) => ({ month, lists })
  );

  // Sort by month in reverse order
  groupedArray.sort(
    (a, b) =>
      monthNames.indexOf(b.month) - monthNames.indexOf(a.month)
  );
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(groupedArray);
    }, 1000);
  });
};
