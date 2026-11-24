import { Container } from "@/components/shared/container";

function ProductCardSkeleton() {
    return (
        <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
                <div className="h-12 w-12 rounded-xl bg-gray-200" />
                <div className="h-6 w-16 rounded-full bg-gray-200" />
            </div>

            <div className="h-5 w-2/3 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />

            <div className="mt-5 border-t border-gray-100 pt-4">
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="mt-3 h-7 w-28 rounded bg-gray-200" />
            </div>
        </div>
    );
}

function SkeletonSection({ cardCount }: { cardCount: number }) {
    return (
        <section className="py-12 sm:py-16">
            <Container>
                <div className="mb-7 space-y-3">
                    <div className="h-8 w-56 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-72 max-w-full animate-pulse rounded bg-gray-100" />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: cardCount }, (_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                </div>
            </Container>
        </section>
    );
}

export function HomeProductsSkeleton() {
    return (
        <div aria-label="পণ্য লোড হচ্ছে" aria-busy="true">
            <SkeletonSection cardCount={3} />
            <SkeletonSection cardCount={3} />
            <SkeletonSection cardCount={4} />
        </div>
    );
}
