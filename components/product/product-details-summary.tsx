import Link from "next/link";

import { Container } from "@/components/shared/container";
import type { Product } from "@/lib/api";
import { formatUnit } from "@/lib/format";

type ProductDetailsSummaryProps = {
    product: Product;
};

export function ProductDetailsSummary({ product }: ProductDetailsSummaryProps) {
    return (
        <Container>
            {/* Breadcrumb */}
            <nav
                aria-label="Breadcrumb"
                className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500"
            >
                <Link href="/" className="transition hover:text-green-700">
                    হোম
                </Link>

                <span>/</span>

                <Link
                    href={`/category/${product.category}`}
                    className="transition hover:text-green-700"
                >
                    {product.categoryNameBn}
                </Link>

                <span>/</span>

                <span className="font-medium text-gray-800">
                    {product.nameBn}
                </span>
            </nav>

            {/* Product Summary */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    {/* Product Image */}
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center self-center rounded-2xl bg-green-50 text-6xl sm:self-auto">
                        {product.image || "🛒"}
                    </div>

                    {/* Product Information */}
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            {product.nameBn}
                        </h1>

                        <p className="mt-2 text-sm leading-relaxed text-gray-500 sm:text-base">
                            বাংলাদেশের বিভিন্ন বাজারে {product.nameBn} পণ্যের
                            বর্তমান মূল্যতথ্য এক জায়গায় দেখুন।
                        </p>

                        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                            <Link
                                href={`/category/${product.category}`}
                                className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100"
                            >
                                <span>{product.categoryIcon}</span>
                                {product.categoryNameBn}
                            </Link>

                            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
                                প্রতি {formatUnit(product.unit)}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
}
