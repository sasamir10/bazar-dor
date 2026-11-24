import { HeroSection } from "@/components/home/hero-section";
import { PriceChangeSection } from "@/components/home/price-change-section";
import { getProducts } from "@/lib/api";

export default async function Home() {
    const products = await getProducts();

    const topRisers = products
        .filter((product) => product.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    return (
        <main className="flex-1">
            <HeroSection />

            <PriceChangeSection
                title="আজ দাম বেড়েছে ▲"
                subtitle="যেসব পণ্যের দাম আজ সবচেয়ে বেশি বেড়েছে।"
                products={topRisers}
            />

            <div id="সব-পণ্য" />
        </main>
    );
}
