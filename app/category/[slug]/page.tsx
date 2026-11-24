import { CategoryProducts } from "@/components/category/category-products";
import { Container } from "@/components/shared/container";
import { getCategory, getProductsByCategory } from "@/lib/api";
import { notFound } from "next/navigation";

type CategoryPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;

    const [category, products] = await Promise.all([
        getCategory(slug),
        getProductsByCategory(slug),
    ]);

    if (!category) {
        notFound();
    }

    return (
        <main className="min-h-screen flex-1 bg-gray-50 py-12 sm:py-16">
            <Container>
                {/* Category Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4">
                        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-4xl">
                            {category.icon}
                        </span>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                {category.nameBn}
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                এই ক্যাটাগরির সকল পণ্যের বর্তমান বাজারদর।
                            </p>
                        </div>
                    </div>

                    <p className="mt-5 text-sm font-medium text-green-700">
                        মোট {products.length.toLocaleString("bn-BD")}টি পণ্য
                    </p>
                </div>

                {/* Products Grid */}
                <CategoryProducts products={products} />
            </Container>
        </main>
    );
}
