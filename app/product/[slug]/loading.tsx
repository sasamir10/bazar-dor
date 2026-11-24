import { Container } from "@/components/shared/container";

export default function ProductLoading() {
    return (
        <main
            className="min-h-screen flex-1 bg-gray-50 py-10 sm:py-14"
            aria-label="পণ্যের তথ্য লোড হচ্ছে"
            aria-busy="true"
        >
            <Container>
                {/* Breadcrumb Skeleton */}
                <div className="mb-6 flex animate-pulse gap-3">
                    <div className="h-4 w-12 rounded bg-gray-200" />
                    <div className="h-4 w-20 rounded bg-gray-200" />
                    <div className="h-4 w-32 rounded bg-gray-200" />
                </div>

                {/* Product Summary Skeleton */}
                <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                    <div className="flex flex-col items-center gap-6 sm:flex-row">
                        <div className="h-28 w-28 shrink-0 rounded-2xl bg-gray-200" />

                        <div className="w-full space-y-4">
                            <div className="h-8 w-2/3 rounded bg-gray-200" />
                            <div className="h-4 w-full max-w-md rounded bg-gray-100" />
                            <div className="flex gap-3">
                                <div className="h-9 w-20 rounded-full bg-gray-200" />
                                <div className="h-9 w-28 rounded-full bg-gray-200" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price Summary Skeleton */}
                <section className="py-8">
                    <div className="mb-6 h-7 w-64 animate-pulse rounded bg-gray-200" />

                    <div className="grid animate-pulse grid-cols-1 gap-4 sm:grid-cols-3">
                        {Array.from({ length: 3 }, (_, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-200 bg-white p-5"
                            >
                                <div className="h-4 w-28 rounded bg-gray-200" />
                                <div className="mt-5 h-9 w-32 rounded bg-gray-200" />
                                <div className="mt-3 h-3 w-36 rounded bg-gray-100" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Market Table Skeleton */}
                <section className="py-8">
                    <div className="mb-6 h-7 w-64 animate-pulse rounded bg-gray-200" />

                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                        {Array.from({ length: 6 }, (_, index) => (
                            <div
                                key={index}
                                className="flex animate-pulse items-center justify-between gap-4 border-b border-gray-100 p-5"
                            >
                                <div className="h-4 w-32 rounded bg-gray-200" />
                                <div className="h-4 w-20 rounded bg-gray-200" />
                                <div className="h-4 w-20 rounded bg-gray-200" />
                                <div className="h-4 w-20 rounded bg-gray-200" />
                            </div>
                        ))}
                    </div>
                </section>
            </Container>
        </main>
    );
}
