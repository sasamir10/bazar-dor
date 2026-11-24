import { notFound } from "next/navigation";

import { ProductDetailsSummary } from "@/components/product/product-details-summary";
import { getProductBySlug } from "@/lib/api";
import { requireSession } from "@/lib/session";

type ProductPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ProductDetailsPage({ params }: ProductPageProps) {
    const { slug } = await params;

    // Verify authenticated session
    await requireSession(`/product/${slug}`);

    // Fetch product information
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <main className="flex-1 bg-gray-50 py-10 sm:py-14">
            <ProductDetailsSummary product={product} />
        </main>
    );
}
