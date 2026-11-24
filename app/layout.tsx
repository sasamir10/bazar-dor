import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PriceTicker } from "@/components/layout/price-ticker";
import { SiteChromeVisibility } from "@/components/layout/site-chrome-visibility";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
    title: "BazarDor | বাজার দর",
    description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে দেখুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="bn-BD" className="h-full antialiased">
            <body className="min-h-full flex flex-col">
                <SiteChromeVisibility>
                    <>
                        <Suspense
                            fallback={
                                <div className="h-20 animate-pulse bg-white" />
                            }
                        >
                            <Navbar />
                        </Suspense>

                        <Suspense
                            fallback={
                                <div className="h-11 animate-pulse border-y border-green-100 bg-green-50" />
                            }
                        >
                            <PriceTicker />
                        </Suspense>
                    </>
                </SiteChromeVisibility>

                {children}

                <SiteChromeVisibility>
                    <Footer />
                </SiteChromeVisibility>

                <Toaster position="top-right" />
            </body>
        </html>
    );
}
