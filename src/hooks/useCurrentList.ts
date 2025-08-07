import { useCallback, useEffect, useState } from "react";
import { GroupedProducts } from "../types";
import { groupProductsByCategory, checkItem, deleteItemFromCurrentList } from "../services/lists/currentListService";

export default function useCurrentList() {
    const [groupedData, setGroupedData] = useState<GroupedProducts>({});
    const [loading, setLoading] = useState(true);

    const loadGrouped = useCallback(async () => {
        setLoading(true);
        const grouped = await groupProductsByCategory();
        setGroupedData(grouped);
        setLoading(false);
    }, []);

    useEffect(() => {
        loadGrouped();
    }, [loadGrouped]);

    const categories = Object.keys(groupedData);

    const toggleItemChecked = async (id: number) => {
        try {
            await checkItem(id);
            await loadGrouped();
        } catch (err) {
            console.warn("Failed to toggle item:", err);
        }
    };

    const deleteItem = async (id: number) => {
        try {
            await deleteItemFromCurrentList(id);
            await loadGrouped();
        } catch (err) {
            console.warn("Failed to delete item:", err);
        }
    };


    return { data: groupedData, loading, categories, toggleItemChecked, deleteItem, refetch: loadGrouped };
}