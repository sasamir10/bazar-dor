import Link from "next/link";

import { Container } from "@/components/shared/container";

export default function ProductNotFound() {
    return (
        <main className="flex min-h-[60vh] flex-1 items-center justify-center py-16">
            <Container>
                <div className="mx-auto max-w-md text-center">
                    <div className="text-7xl">🔍</div>

                    <h1 className="mt-6 text-3xl font-bold text-gray-900">
                        পণ্যটি পাওয়া যায়নি!
                    </h1>

                    <p className="mt-3 text-gray-500">
                        দুঃখিত, আপনার খোঁজা পণ্যটির তথ্য পাওয়া যাচ্ছে না। অন্য
                        কোনো পণ্য দেখতে পারেন।
                    </p>

                    <Link
                        href="/"
                        className="mt-7 inline-flex rounded-full bg-green-700 px-7 py-3 font-semibold text-white transition hover:bg-green-800"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </Container>
        </main>
    );
}
