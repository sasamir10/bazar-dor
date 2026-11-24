"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Container } from "@/components/shared/container";
import type { Category } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

type NavbarClientProps = {
    categories: Category[];
};

export function NavbarClient({ categories }: NavbarClientProps) {
    const pathname = usePathname();
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [isSigningOut, setIsSigningOut] = useState(false);

    const banglaDate = new Intl.DateTimeFormat("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).format(new Date());

    const handleSignOut = async () => {
        try {
            setIsSigningOut(true);

            const { error } = await authClient.signOut();

            if (error) {
                toast.error("সাইন আউট করা যায়নি।");
                return;
            }

            toast.success("সফলভাবে সাইন আউট হয়েছে!");

            router.push("/");
            router.refresh();
        } catch {
            toast.error("কিছু একটা সমস্যা হয়েছে।");
        } finally {
            setIsSigningOut(false);
        }
    };

    const getLinkClass = (isActive: boolean) =>
        `inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
            isActive
                ? "bg-green-700 text-white"
                : "text-gray-600 hover:bg-green-50 hover:text-green-700"
        }`;

    return (
        <header className="border-b border-gray-200 bg-white">
            <Container>
                {/* Top Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 py-4">
                    {/* Logo & Date */}
                    <div>
                        <Link href="/" className="inline-block">
                            <h1 className="text-2xl font-bold text-green-700 sm:text-3xl">
                                🛒 বাজার দর
                            </h1>
                        </Link>

                        <p className="mt-1 text-xs text-gray-500">
                            {banglaDate}
                        </p>
                    </div>

                    {/* Authentication */}
                    <div className="flex items-center gap-2">
                        {isPending ? (
                            <div className="h-9 w-28 animate-pulse rounded-full bg-gray-100" />
                        ) : session ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="rounded-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-green-50"
                                >
                                    {session.user.name || "প্রোফাইল"}
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    disabled={isSigningOut}
                                    className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                                >
                                    {isSigningOut
                                        ? "অপেক্ষা করুন..."
                                        : "সাইন আউট"}
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/signin"
                                    className="rounded-full border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
                                >
                                    সাইন ইন
                                </Link>

                                <Link
                                    href="/signup"
                                    className="rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
                                >
                                    সাইন আপ
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Category Navigation */}
                <nav
                    aria-label="Product categories"
                    className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:justify-center sm:px-0"
                >
                    <Link href="/" className={getLinkClass(pathname === "/")}>
                        সব পণ্য
                    </Link>

                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            aria-current={
                                pathname === `/category/${category.slug}`
                                    ? "page"
                                    : undefined
                            }
                            className={getLinkClass(
                                pathname === `/category/${category.slug}`,
                            )}
                        >
                            <span>{category.icon}</span>
                            <span>{category.nameBn}</span>
                        </Link>
                    ))}
                </nav>
            </Container>
        </header>
    );
}
