import { ProductCard } from "@/components/home/product-card";
import { Container } from "@/components/shared/container";
import type { Product } from "@/lib/api";

type AllProductsSectionProps = {
    products: Product[];
};

export function AllProductsSection({ products }: AllProductsSectionProps) {
    return (
        <section id="সব-পণ্য" className="scroll-mt-6 py-12 sm:py-16">
            <Container>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        সব পণ্য
                    </h2>

                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        নিত্যপ্রয়োজনীয় সব পণ্যের বর্তমান বাজারদর এক নজরে দেখুন।
                    </p>

                    <p className="mt-3 text-sm font-medium text-green-700">
                        মোট {products.length}টি পণ্য
                    </p>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-12 text-center">
                        <p className="text-gray-600">
                            বর্তমানে কোনো পণ্যের তথ্য পাওয়া যাচ্ছে না।
                        </p>
                    </div>
                )}
            </Container>
        </section>
    );
}
