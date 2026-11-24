import { Container } from "@/components/shared/container";
import type { Product } from "@/lib/api";
import { formatBanglaNumber, formatUnit } from "@/lib/format";

type PriceSummaryProps = {
    product: Product;
};

export function PriceSummary({ product }: PriceSummaryProps) {
    const markets = product.markets ?? [];

    const minPrice = markets.length
        ? Math.min(...markets.map((market) => market.min))
        : null;

    const maxPrice = markets.length
        ? Math.max(...markets.map((market) => market.max))
        : null;

    const averagePrice = markets.length
        ? markets.reduce(
              (total, market) => total + (market.min + market.max) / 2,
              0,
          ) / markets.length
        : null;

    const priceCards = [
        {
            label: "সর্বনিম্ন দাম",
            value: minPrice,
            description: "বাজারগুলোর মধ্যে সর্বনিম্ন দাম",
            style: "border-green-100 bg-green-50 text-green-700",
        },
        {
            label: "সর্বোচ্চ দাম",
            value: maxPrice,
            description: "বাজারগুলোর মধ্যে সর্বোচ্চ দাম",
            style: "border-red-100 bg-red-50 text-red-600",
        },
        {
            label: "গড় দাম",
            value: averagePrice,
            description: "বাজারভিত্তিক আনুমানিক গড়",
            style: "border-blue-100 bg-blue-50 text-blue-700",
        },
    ];

    return (
        <section className="py-8">
            <Container>
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        আজকের মূল্য সারসংক্ষেপ
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        বিভিন্ন বাজারের দামের তুলনায় সর্বনিম্ন, সর্বোচ্চ ও গড়
                        মূল্য।
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {priceCards.map((card) => (
                        <div
                            key={card.label}
                            className={`rounded-xl border p-5 ${card.style}`}
                        >
                            <p className="text-sm font-semibold">
                                {card.label}
                            </p>

                            <p className="mt-3 text-2xl font-bold sm:text-3xl">
                                {card.value !== null
                                    ? formatBanglaNumber(card.value)
                                    : "—"}

                                {card.value !== null && (
                                    <span className="ml-1 text-sm font-medium">
                                        টাকা
                                    </span>
                                )}
                            </p>

                            <p className="mt-2 text-xs opacity-80">
                                {card.description}
                                {product.unit &&
                                    ` · প্রতি ${formatUnit(product.unit)}`}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
