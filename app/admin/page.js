"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import VisitsTable from "@/components/VisitsTable";
import AddSalesperson from "@/components/admin/AddSalesperson";
import SalespersonList from "@/components/admin/SalespersonList";

export default function AdminDashboard() {
    const { user, visits } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else if (user.role !== "admin") {
            router.push(`/${user.role}`); // Redirect to agent page if they are an agent
        }
    }, [user, router]);

    if (!user || user.role !== "admin") return null;

    return (
        <div className="min-h-screen" style={{ background: "#0f172a" }}>
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
                {/* Page title */}
                <div>
                    <h2
                        className="text-2xl sm:text-3xl font-extrabold"
                        style={{
                            background: "linear-gradient(135deg, #e2e8f0, #94a3b8)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Admin Dashboard
                    </h2>
                    <p className="text-sm mt-1" style={{ color: "#475569" }}>
                        Overview of field visits and team management.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3 space-y-6">
                        <StatsCards visits={visits} />
                        <VisitsTable visits={visits} />
                    </div>
                    <div className="lg:col-span-1 space-y-6 flex flex-col h-full">
                        <div className="flex-none max-h-[360px]">
                            <AddSalesperson />
                        </div>
                        <div className="flex-1 min-h-[300px]">
                            <SalespersonList />
                        </div>
                    </div>
                </div>
            </main>

            <footer
                className="mt-8 py-5 text-center text-xs"
                style={{ color: "#334155", borderTop: "1px solid #1e293b" }}
            >
                SalesTrack &copy; {new Date().getFullYear()} &mdash; Admin Dashboard
            </footer>
        </div>
    );
}
