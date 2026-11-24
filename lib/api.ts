export type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};

export type Product = {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
    markets: {
        market: string;
        division: string;
        min: number;
        max: number;
    }[];
};

const API_BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export async function getCategories(): Promise<Category[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) return [];

        return data as Category[];
    } catch (error) {
        console.error("Category fetching failed:", error);
        return [];
    }
}

export async function getProducts(): Promise<Product[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            next: { revalidate: 300 },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) return [];

        return data as Product[];
    } catch (error) {
        console.error("Product fetching failed:", error);
        return [];
    }
}
