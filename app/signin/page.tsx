"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { authClient } from "@/lib/auth-client";

type SocialProvider = "google" | "github";

export default function SignInPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(
        null,
    );

    const getCallbackURL = () => {
        const params = new URLSearchParams(window.location.search);
        const redirectTo = params.get("callbackURL");

        if (redirectTo?.startsWith("/") && !redirectTo.startsWith("//")) {
            return redirectTo;
        }

        return "/";
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const reason = params.get("reason");

        if (reason === "unauthorized") {
            toast.error("এই পেজটি দেখতে হলে আগে সাইন ইন করুন।");
        }

        // Prevent the same toast from appearing again on refresh.
        params.delete("reason");

        const remainingQuery = params.toString();

        window.history.replaceState(
            null,
            "",
            `${window.location.pathname}${remainingQuery ? `?${remainingQuery}` : ""}`,
        );
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.trim() || !password) {
            toast.error("ইমেইল ও পাসওয়ার্ড দিন।");
            return;
        }

        try {
            setIsSubmitting(true);

            const { error } = await authClient.signIn.email({
                email: email.trim(),
                password,
            });

            if (error) {
                toast.error(error.message || "লগইন করা যায়নি।");
                return;
            }

            toast.success("সফলভাবে লগইন হয়েছে!");

            setTimeout(() => {
                router.push(getCallbackURL());
            }, 1200);
        } catch {
            toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSocialSignIn = async (provider: SocialProvider) => {
        try {
            setSocialLoading(provider);

            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: getCallbackURL(),
            });

            if (error) {
                toast.error(error.message || "Social login ব্যর্থ হয়েছে।");
                setSocialLoading(null);
            }
        } catch {
            toast.error("Social login করা যাচ্ছে না।");
            setSocialLoading(null);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg sm:p-10">
                {/* Logo */}
                <Link href="/" className="mb-8 block text-center">
                    <h1 className="text-3xl font-bold text-green-700">
                        🛒 বাজার দর
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </p>
                </Link>

                {/* Heading */}
                <div className="mb-7 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        স্বাগতম!
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        আপনার অ্যাকাউন্টে লগইন করুন।
                    </p>
                </div>

                {/* Sign In Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            ইমেইল ঠিকানা
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="name@example.com"
                            required
                            autoComplete="email"
                            disabled={isSubmitting}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="আপনার পাসওয়ার্ড দিন"
                            required
                            autoComplete="current-password"
                            disabled={isSubmitting}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || socialLoading !== null}
                        className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "লগইন হচ্ছে..." : "সাইন ইন"}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gray-200" />

                    <span className="text-sm text-gray-400">অথবা</span>

                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Social Sign In */}
                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={() => handleSocialSignIn("google")}
                        disabled={isSubmitting || socialLoading !== null}
                        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <FcGoogle size={21} />

                        {socialLoading === "google"
                            ? "Google দিয়ে এগিয়ে যাচ্ছি..."
                            : "Google দিয়ে সাইন ইন"}
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocialSignIn("github")}
                        disabled={isSubmitting || socialLoading !== null}
                        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <FaGithub size={21} />

                        {socialLoading === "github"
                            ? "GitHub দিয়ে এগিয়ে যাচ্ছি..."
                            : "GitHub দিয়ে সাইন ইন"}
                    </button>
                </div>

                {/* Signup Link */}
                <p className="mt-7 text-center text-sm text-gray-600">
                    নতুন ব্যবহারকারী?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-green-700 hover:underline"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>
            </div>
        </main>
    );
}
