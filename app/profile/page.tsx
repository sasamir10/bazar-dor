import { requireSession } from "@/lib/session";

export default async function ProfilePage() {
    const session = await requireSession("/profile");

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-3">
            <h1 className="text-2xl font-bold">My Profile</h1>

            <p>Name: {session.user.name}</p>

            <p>Email: {session.user.email}</p>
        </main>
    );
}
