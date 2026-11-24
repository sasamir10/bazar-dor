import { Container } from "@/components/shared/container";

export default function CategoryLoading() {
    return (
        <main className="min-h-screen flex-1 bg-gray-50 py-12 sm:py-16">
            <Container>
                {/* Category Header Skeleton */}
                <div className="mb-8 flex items-center gap-4 animate-pulse">
                    <div className="h-16 w-16 rounded-2xl bg-gray-200" />

                    <div className="space-y-2">
                        <div className="h-7 w-32 rounded bg-gray-200" />
                        <div className="h-4 w-64 max-w-full rounded bg-gray-100" />
                    </div>
                </div>

                {/* Product Skeleton */}
                <div className="mb-6 h-4 w-24 animate-pulse rounded bg-gray-200" />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }, (_, index) => (
                        <div
                            key={index}
                            className="animate-pulse rounded-xl border border-gray-200 bg-white p-5"
                        >
                            <div className="mb-5 h-12 w-12 rounded-xl bg-gray-200" />
                            <div className="h-5 w-2/3 rounded bg-gray-200" />
                            <div className="mt-3 h-4 w-1/3 rounded bg-gray-100" />
                            <div className="mt-6 h-7 w-28 rounded bg-gray-200" />
                        </div>
                    ))}
                </div>
            </Container>
        </main>
    );
}
