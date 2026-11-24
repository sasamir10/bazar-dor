import { Container } from "@/components/shared/container";
import type { Product } from "@/lib/api";
import { formatBanglaNumber, formatUnit } from "@/lib/format";

type MarketPriceTableProps = {
    product: Product;
};

export function MarketPriceTable({ product }: MarketPriceTableProps) {
    const markets = product.markets ?? [];

    return (
        <section className="py-8 sm:py-12">
            <Container>
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        বিভিন্ন বাজারে {product.nameBn} পণ্যের সর্বনিম্ন ও
                        সর্বোচ্চ দাম তুলনা করুন।
                    </p>

                    <p className="mt-3 text-sm font-medium text-green-700">
                        মোট {formatBanglaNumber(markets.length)}টি বাজার
                    </p>
                </div>

                {markets.length > 0 ? (
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-160 text-left">
                                <thead className="bg-green-50">
                                    <tr>
                                        <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                            বাজারের নাম
                                        </th>

                                        <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                            বিভাগ
                                        </th>

                                        <th className="px-5 py-4 text-sm font-semibold text-green-700">
                                            সর্বনিম্ন দাম
                                        </th>

                                        <th className="px-5 py-4 text-sm font-semibold text-red-600">
                                            সর্বোচ্চ দাম
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {markets.map((market) => (
                                        <tr
                                            key={`${market.market}-${market.division}`}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-5 py-4 text-sm font-medium text-gray-800">
                                                {market.market}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {market.division}
                                            </td>

                                            <td className="px-5 py-4 text-sm font-semibold text-green-700">
                                                {formatBanglaNumber(market.min)}{" "}
                                                টাকা
                                            </td>

                                            <td className="px-5 py-4 text-sm font-semibold text-red-600">
                                                {formatBanglaNumber(market.max)}{" "}
                                                টাকা
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="border-t border-gray-100 bg-gray-50 px-5 py-3">
                            <p className="text-xs text-gray-500">
                                সকল মূল্য প্রতি {formatUnit(product.unit)}{" "}
                                হিসেবে প্রদর্শিত। বাজারভেদে দাম পরিবর্তিত হতে
                                পারে।
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-xl border border-gray-200 bg-white px-4 py-12 text-center">
                        <p className="text-gray-600">
                            বর্তমানে কোনো বাজারের মূল্যতথ্য পাওয়া যাচ্ছে না।
                        </p>
                    </div>
                )}
            </Container>
        </section>
    );
}
