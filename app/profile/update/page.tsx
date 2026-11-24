import Link from "next/link";

import { UpdateProfileForm } from "@/components/profile/update-profile-form";
import { Container } from "@/components/shared/container";
import { requireSession } from "@/lib/session";

export default async function UpdateProfilePage() {
    const session = await requireSession("/profile/update");

    return (
        <main className="flex-1 bg-gray-50 py-12 sm:py-16">
            <Container>
                <div className="mx-auto max-w-xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Update Information
                        </h1>

                        <p className="mt-2 text-gray-500">
                            আপনার প্রোফাইলের নাম পরিবর্তন করুন।
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                        <UpdateProfileForm currentName={session.user.name} />

                        <div className="mt-6 text-center">
                            <Link
                                href="/profile"
                                className="text-sm font-medium text-green-700 hover:underline"
                            >
                                ← প্রোফাইলে ফিরে যান
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
