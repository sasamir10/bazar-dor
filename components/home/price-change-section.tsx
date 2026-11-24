import { ProductCard } from "@/components/home/product-card";
import { Container } from "@/components/shared/container";
import type { Product } from "@/lib/api";

type PriceChangeSectionProps = {
    title: string;
    subtitle: string;
    products: Product[];
};

export function PriceChangeSection({
    title,
    subtitle,
    products,
}: PriceChangeSectionProps) {
    return (
        <section className="py-12 sm:py-16">
            <Container>
                <div className="mb-7">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        {title}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        {subtitle}
                    </p>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="rounded-xl bg-gray-50 py-10 text-center text-gray-500">
                        বর্তমানে কোনো পণ্যের তথ্য পাওয়া যায়নি।
                    </p>
                )}
            </Container>
        </section>
    );
}
