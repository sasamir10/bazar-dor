"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

type UpdateProfileFormProps = {
    currentName: string;
};

export function UpdateProfileForm({ currentName }: UpdateProfileFormProps) {
    const router = useRouter();

    const [name, setName] = useState(currentName);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const updatedName = name.trim();

        if (!updatedName || updatedName.length < 2) {
            toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
            return;
        }

        if (updatedName === currentName) {
            toast.error("আপনার নাম পরিবর্তন করা হয়নি।");
            return;
        }

        try {
            setIsSubmitting(true);

            const { error } = await authClient.updateUser({
                name: updatedName,
            });

            if (error) {
                toast.error(error.message || "তথ্য আপডেট করা যায়নি।");
                return;
            }

            toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে!");

            setTimeout(() => {
                router.push("/profile");
            }, 1000);
        } catch {
            toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
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
                    minLength={2}
                    maxLength={100}
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
                />
            </div>

            <button
                type="submit"
                disabled={
                    isSubmitting || !name.trim() || name.trim() === currentName
                }
                className="w-full rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
                {isSubmitting ? "Updating..." : "Update Information"}
            </button>
        </form>
    );
}
