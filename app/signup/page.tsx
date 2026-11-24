"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

type SocialProvider = "google" | "github";

export default function SignUpPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(
        null,
    );

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name.trim() || !email.trim() || !password) {
            toast.error("সবগুলো তথ্য পূরণ করুন।");
            return;
        }

        if (password.length < 8) {
            toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
            return;
        }

        try {
            setIsSubmitting(true);

            const { error } = await authClient.signUp.email({
                name: name.trim(),
                email: email.trim(),
                password,
            });

            if (error) {
                toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
                return;
            }

            toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
            router.push("/signin");
        } catch {
            toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSocialSignUp = async (provider: SocialProvider) => {
        try {
            setSocialLoading(provider);

            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: "/",
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
                        অ্যাকাউন্ট তৈরি করুন
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        BazarDor-এ যোগ দিতে আপনার তথ্য দিন।
                    </p>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            সম্পূর্ণ নাম
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="আপনার নাম লিখুন"
                            required
                            autoComplete="name"
                            disabled={isSubmitting}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
                        />
                    </div>

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
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            required
                            minLength={8}
                            autoComplete="new-password"
                            disabled={isSubmitting}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || socialLoading !== null}
                        className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-sm text-gray-400">অথবা</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Social Signup */}
                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={() => handleSocialSignUp("google")}
                        disabled={isSubmitting || socialLoading !== null}
                        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <FcGoogle size={21} />
                        {socialLoading === "google"
                            ? "Google দিয়ে এগিয়ে যাচ্ছি..."
                            : "Google দিয়ে সাইন আপ"}
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocialSignUp("github")}
                        disabled={isSubmitting || socialLoading !== null}
                        className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <FaGithub size={21} />
                        {socialLoading === "github"
                            ? "GitHub দিয়ে এগিয়ে যাচ্ছি..."
                            : "GitHub দিয়ে সাইন আপ"}
                    </button>
                </div>

                {/* Signin Link */}
                <p className="mt-7 text-center text-sm text-gray-600">
                    ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/signin"
                        className="font-semibold text-green-700 hover:underline"
                    >
                        সাইন ইন করুন
                    </Link>
                </p>
            </div>
        </main>
    );
}
