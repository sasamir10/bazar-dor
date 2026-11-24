"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type SiteChromeVisibilityProps = {
    children: ReactNode;
};

export function SiteChromeVisibility({ children }: SiteChromeVisibilityProps) {
    const pathname = usePathname();

    if (pathname === "/signin" || pathname === "/signup") {
        return null;
    }

    return <>{children}</>;
}
