import { Navbar } from "@/components/layout/navbar";
import { NavbarVisibility } from "@/components/layout/navbar-visibility";
import type { Metadata } from "next";
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
                <NavbarVisibility>
                    <Navbar />
                </NavbarVisibility>

                {children}

                <Toaster position="top-right" />
            </body>
        </html>
    );
}
