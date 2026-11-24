import { requireSession } from "@/lib/session";

type ProductPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ProductDetailsPage({ params }: ProductPageProps) {
    const { slug } = await params;

    const session = await requireSession(`/product/${slug}`);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-3">
            <h1 className="text-2xl font-bold">Product Details</h1>

            <p>Product: {slug}</p>

            <p>Welcome, {session.user.name}</p>

            <p className="text-sm text-gray-500">{session.user.email}</p>
        </main>
    );
}
