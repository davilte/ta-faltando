import { useEffect, useState } from "react";
import { GroupedProducts } from "../types";
import { groupProductsByCategory, checkItem } from "../services/lists/currentListService";

export default function useCurrentList() {
    const [groupedData, setGroupedData] = useState<GroupedProducts>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadGrouped() {
            setLoading(true);
            const grouped = await groupProductsByCategory();
            setGroupedData(grouped);
            setLoading(false);
        }
        loadGrouped();
    }, []);

    const categories = Object.keys(groupedData);

    const toggleItemChecked = (id: number) => {
        checkItem(id);
        setGroupedData({ ...groupedData });
    }

    return { data: groupedData, loading, categories, toggleItemChecked };
}