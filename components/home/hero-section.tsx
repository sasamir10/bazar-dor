import heroBasket from "@/public/images/bazar-hero.png";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";

export function HeroSection() {
    return (
        <section className="overflow-hidden bg-green-50">
            <Container>
                <div className="grid min-h-96 items-center gap-10 py-12 md:grid-cols-2 md:gap-8 md:py-16">
                    {/* Hero Content */}
                    <div className="max-w-xl text-center md:text-left">
                        <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                            বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর
                        </span>

                        <h2 className="mt-6 text-3xl leading-tight font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                            প্রতিদিনের বাজারদর জানুন,
                            <span className="text-green-700">
                                {" "}
                                সচেতন সিদ্ধান্ত নিন।
                            </span>
                        </h2>

                        <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
                            চাল, ডাল, তেল, মাছ, মাংস ও অন্যান্য নিত্যপ্রয়োজনীয়
                            পণ্যের বর্তমান দাম এবং বাজারের মূল্য পরিবর্তন দেখুন
                            এক জায়গায়।
                        </p>

                        <Link
                            href="#সব-পণ্য"
                            className="mt-8 inline-flex items-center justify-center rounded-full bg-green-700 px-7 py-3 font-semibold text-white transition hover:bg-green-800"
                        >
                            সব পণ্য দেখুন
                            <span className="ml-2" aria-hidden="true">
                                →
                            </span>
                        </Link>
                    </div>

                    {/* Hero Illustration */}
                    <div className="flex justify-center md:justify-end">
                        <div className="flex aspect-square w-full max-w-sm items-center justify-center rounded-full bg-green-100/70 p-8">
                            <Image
                                src={heroBasket}
                                alt="নিত্যপ্রয়োজনীয় পণ্যের ঝুড়ি"
                                priority
                                className="h-auto w-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
