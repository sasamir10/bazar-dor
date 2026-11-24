import { Container } from "@/components/shared/container";
import { requireSession } from "@/lib/session";
import Link from "next/link";

export default async function ProfilePage() {
    const session = await requireSession("/profile");

    const { name, email, image } = session.user;

    return (
        <main className="flex-1 bg-gray-50 py-12 sm:py-16">
            <Container>
                <div className="mx-auto max-w-xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            আমার প্রোফাইল
                        </h1>

                        <p className="mt-2 text-gray-500">
                            আপনার অ্যাকাউন্টের তথ্য দেখুন ও পরিচালনা করুন।
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                        {/* Profile Avatar */}
                        <div className="mb-6 flex justify-center">
                            {image ? (
                                <img
                                    src={image}
                                    alt={`${name}'s profile`}
                                    className="h-24 w-24 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-700">
                                    {name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}
                        </div>

                        {/* User Information */}
                        <div className="space-y-5">
                            <div>
                                <p className="text-sm text-gray-500">
                                    সম্পূর্ণ নাম
                                </p>

                                <p className="mt-1 font-semibold text-gray-900">
                                    {name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    ইমেইল ঠিকানা
                                </p>

                                <p className="mt-1 break-all font-semibold text-gray-900">
                                    {email}
                                </p>
                            </div>
                        </div>

                        {/* Update Button */}
                        <Link
                            href="/profile/update"
                            className="mt-8 flex w-full items-center justify-center rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
                        >
                            Update Information
                        </Link>
                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="text-sm font-medium text-green-700 hover:underline"
                        >
                            ← হোম পেজে ফিরে যান
                        </Link>
                    </div>
                </div>
            </Container>
        </main>
    );
}
