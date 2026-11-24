import { getProducts, type Product } from "@/lib/api";

function formatNumber(value: number) {
    return new Intl.NumberFormat("bn-BD", {
        maximumFractionDigits: 1,
    }).format(value);
}

function formatUnit(unit: string) {
    const units: Record<string, string> = {
        kg: "কেজি",
        liter: "লিটার",
        l: "লিটার",
        piece: "পিস",
        pcs: "পিস",
        dozen: "ডজন",
    };

    return units[unit.toLowerCase()] ?? unit;
}

function TickerItems({
    products,
    hidden = false,
}: {
    products: Product[];
    hidden?: boolean;
}) {
    return (
        <div
            aria-hidden={hidden}
            className="flex shrink-0 items-center gap-8 pr-8"
        >
            {products.map((product) => {
                const isUp = product.change.dir === "up";
                const isDown = product.change.dir === "down";

                const indicator = isUp ? "▲" : isDown ? "▼" : "—";

                const indicatorColor = isUp
                    ? "text-green-700"
                    : isDown
                      ? "text-red-600"
                      : "text-gray-500";

                return (
                    <div
                        key={`${hidden ? "duplicate" : "original"}-${product.id}`}
                        className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm"
                    >
                        <span className="text-base">{product.image}</span>

                        <span className="font-semibold text-gray-800">
                            {product.nameBn}
                        </span>

                        <span className="text-gray-600">
                            {formatNumber(product.today)} টাকা/
                            {formatUnit(product.unit)}
                        </span>

                        <span className={`font-semibold ${indicatorColor}`}>
                            {indicator}{" "}
                            {formatNumber(Math.abs(product.change.pct))}%
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

export async function PriceTicker() {
    const products = await getProducts();

    if (!products.length) {
        return (
            <div className="border-y border-gray-200 bg-gray-50 py-3 text-center text-sm text-gray-500">
                পণ্যের দাম বর্তমানে পাওয়া যাচ্ছে না।
            </div>
        );
    }

    return (
        <section
            aria-label="পণ্যের বর্তমান বাজারদর"
            className="bazardor-ticker overflow-hidden border-y border-green-100 bg-green-50 py-3"
        >
            <div className="bazardor-ticker-track flex w-max">
                <TickerItems products={products} />

                <TickerItems products={products} hidden />
            </div>
        </section>
    );
}
