export type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
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

        if (!Array.isArray(data)) {
            return [];
        }

        return data as Category[];
    } catch (error) {
        console.error("Category fetching failed:", error);
        return [];
    }
}
