import { Suspense } from "react";

import { AllProductsSection } from "@/components/home/all-products-section";
import { HeroSection } from "@/components/home/hero-section";
import { HomeProductsSkeleton } from "@/components/home/home-products-skeleton";
import { PriceChangeSection } from "@/components/home/price-change-section";

import { getProducts } from "@/lib/api";

async function HomeProductSections() {
    const products = await getProducts();

    const topRisers = products
        .filter((product) => product.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    const topFallers = products
        .filter((product) => product.change.dir === "down")
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, 6);

    return (
        <>
            <PriceChangeSection
                title="আজ দাম বেড়েছে ▲"
                subtitle="যেসব পণ্যের দাম আজ সবচেয়ে বেশি বেড়েছে।"
                products={topRisers}
            />

            <PriceChangeSection
                title="আজ দাম কমেছে ▼"
                subtitle="যেসব পণ্যের দাম আজ সবচেয়ে বেশি কমেছে।"
                products={topFallers}
            />

            <AllProductsSection products={products} />
        </>
    );
}

export default function Home() {
    return (
        <main className="flex-1">
            <HeroSection />

            <Suspense fallback={<HomeProductsSkeleton />}>
                <HomeProductSections />
            </Suspense>
        </main>
    );
}
