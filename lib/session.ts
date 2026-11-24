import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export async function getSession() {
    return await auth.api.getSession({
        headers: await headers(),
    });
}

export async function requireSession(callbackURL = "/") {
    const session = await getSession();

    if (!session) {
        const params = new URLSearchParams({
            reason: "unauthorized",
            callbackURL,
        });

        redirect(`/signin?${params.toString()}`);
    }

    return session;
}
