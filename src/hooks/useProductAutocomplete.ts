import { useEffect, useState } from "react";
import { fetchAvailableProducts } from "~/src/services/products/productsService";
import { Product } from "~/src/types";

export default function useProductAutocomplete() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filtered, setFiltered] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAvailableProducts()
            .then(setProducts)
            .finally(() => setLoading(false));
    }, []);

    const filter = (query: string) => {
        if (!query) return setFiltered(products);

        const queryLower = query.toLowerCase();

        const result = products
            .filter((p) => p.name.toLowerCase().includes(queryLower))
            .sort((a, b) => {
                const aIndex = a.name.toLowerCase().indexOf(queryLower);
                const bIndex = b.name.toLowerCase().indexOf(queryLower);

                if (aIndex !== bIndex) return aIndex - bIndex;

                return a.name.localeCompare(b.name);
            });

        setFiltered(result);
    };

    return { filtered, filter, loading };
}