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
        <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
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
                    <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                        Log your field visits and measurements here.
                    </p>
                </div>

                <VisitForm onSubmit={handleNewVisit} />

                <div className="pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
                    <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Your Recent Visits</h3>
                    <VisitsTable visits={agentVisits} />
                </div>
            </main>

            <footer
                className="mt-8 py-5 text-center text-xs"
                style={{ color: "var(--text-muted)", borderTop: "1px solid var(--border-subtle)" }}
            >
                SalesTrack &copy; {new Date().getFullYear()} &mdash; Field Sales Visit Tracker
            </footer>
        </div>
    );
}
