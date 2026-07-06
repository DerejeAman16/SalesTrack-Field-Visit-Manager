"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Header from "@/components/Header";
import VisitForm from "@/components/VisitForm";
import VisitsTable from "@/components/VisitsTable";

export default function AgentDashboard() {
    const { user, visits, addVisit } = useAuth();
    const router = useRouter();

    // Fallback safely if user doesn't exist yet before redirect kicks in
    const agentVisits = user ? visits.filter((v) => v.salesperson === user.name) : [];

    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else if (user.role !== "agent") {
            router.push(`/${user.role}`); // Redirect to their actual role page
        }
    }, [user, router]);

    if (!user || user.role !== "agent") return null;

    const handleNewVisit = (visit) => {
        addVisit(visit);
    };

    return (
        <div className="min-h-screen" style={{ background: "#0f172a" }}>
            <Header />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
                <div>
                    <h2
                        className="text-2xl sm:text-3xl font-extrabold"
                        style={{
                            background: "linear-gradient(135deg, #e2e8f0, #94a3b8)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Welcome, {user.name}
                    </h2>
                    <p className="text-sm mt-1" style={{ color: "#475569" }}>
                        Log your field visits and measurements here.
                    </p>
                </div>

                <VisitForm onSubmit={handleNewVisit} />

                <div className="pt-4 border-t border-slate-800">
                    <h3 className="text-xl font-bold text-white mb-4">Your Recent Visits</h3>
                    <VisitsTable visits={agentVisits} />
                </div>
            </main>

            <footer
                className="mt-8 py-5 text-center text-xs"
                style={{ color: "#334155", borderTop: "1px solid #1e293b" }}
            >
                SalesTrack &copy; {new Date().getFullYear()} &mdash; Field Sales Visit Tracker
            </footer>
        </div>
    );
}
