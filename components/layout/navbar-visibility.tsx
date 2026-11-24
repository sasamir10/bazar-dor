"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavbarVisibilityProps = {
    children: ReactNode;
};

export function NavbarVisibility({ children }: NavbarVisibilityProps) {
    const pathname = usePathname();

    if (pathname === "/signin" || pathname === "/signup") {
        return null;
    }

    return <>{children}</>;
}
