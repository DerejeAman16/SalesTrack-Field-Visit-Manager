"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function HomePage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else if (user.role === "admin") {
            router.push("/admin");
        } else if (user.role === "agent") {
            router.push("/agent");
        }
    }, [user, router]);

    // Show a loading screen while redirecting
    return (
        <div className="min-h-screen flex items-center justify-center flex-col" style={{ background: "#0f172a" }}>
            <div className="w-10 h-10 border-4 border-[#334155] border-t-[#6366f1] rounded-full animate-spin"></div>
            <p className="mt-4 text-[#94a3b8] text-sm animate-pulse">Redirecting...</p>
        </div>
    );
}
