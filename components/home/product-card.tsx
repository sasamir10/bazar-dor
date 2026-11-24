import Link from "next/link";

import type { Product } from "@/lib/api";
import { formatBanglaNumber, formatUnit } from "@/lib/format";

type ProductCardProps = {
    product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";
    const isFlat = !isUp && !isDown;

    return (
        <Link
            href={`/product/${product.slug}`}
            className="group rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
        >
            <div className="mb-4 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-3xl">
                    {product.image || "🛒"}
                </span>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isUp
                            ? "bg-green-50 text-green-700"
                            : isDown
                              ? "bg-red-50 text-red-600"
                              : "bg-gray-100 text-gray-500"
                    }`}
                >
                    {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                    {formatBanglaNumber(Math.abs(product.change.pct))}%
                </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 transition group-hover:text-green-700">
                {product.nameBn}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
                প্রতি {formatUnit(product.unit)}
            </p>

            <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-500">আজকের দাম</p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                    {formatBanglaNumber(product.today)}{" "}
                    <span className="text-sm font-medium">টাকা</span>
                </p>

                {isFlat && (
                    <p className="mt-1 text-xs text-gray-400">
                        দামে কোনো পরিবর্তন নেই
                    </p>
                )}
            </div>
        </Link>
    );
}
