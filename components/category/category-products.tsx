"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/home/product-card";
import type { Product } from "@/lib/api";
import Link from "next/link";

type SortOption = "default" | "price-asc" | "price-desc";

type CategoryProductsProps = {
    products: Product[];
};

export function CategoryProducts({ products }: CategoryProductsProps) {
    const [sortOption, setSortOption] = useState<SortOption>("default");

    const sortedProducts = useMemo(() => {
        const result = [...products];

        if (sortOption === "price-asc") {
            result.sort((a, b) => a.today - b.today);
        }

        if (sortOption === "price-desc") {
            result.sort((a, b) => b.today - a.today);
        }

        return result;
    }, [products, sortOption]);

    return (
        <>
            {/* Sorting Control */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <label
                    htmlFor="category-sort"
                    className="text-sm font-medium text-gray-700"
                >
                    সাজান:
                </label>

                <select
                    id="category-sort"
                    value={sortOption}
                    onChange={(event) =>
                        setSortOption(event.target.value as SortOption)
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:w-56"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="price-asc">দাম: কম থেকে বেশি</option>
                    <option value="price-desc">দাম: বেশি থেকে কম</option>
                </select>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white px-4 py-14 text-center">
                    <span className="text-5xl">🛒</span>

                    <h3 className="mt-5 text-lg font-bold text-gray-900">
                        কোনো পণ্য পাওয়া যায়নি!
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                        এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
                    </p>

                    <Link
                        href="/"
                        className="mt-6 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            )}
        </>
    );
}
