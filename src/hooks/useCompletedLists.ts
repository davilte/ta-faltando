import { useEffect, useState } from "react";
import { ListsByMonth } from "../types";
import { completedListsByMonthService } from "../services/lists/completedListsByMonthService";

export default function useCompletedLists() {
  const [listsByMonth, setListsByMonth] = useState<ListsByMonth[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await completedListsByMonthService();
        setListsByMonth(data);
      } catch (error) {
        console.error("Error loading lists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  return { data: listsByMonth, loading };
}