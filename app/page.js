"use client";

import { useState } from "react";
import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import VisitForm from "@/components/VisitForm";
import VisitsTable from "@/components/VisitsTable";
import { initialVisits } from "@/lib/mockData";

export default function HomePage() {
    const [visits, setVisits] = useState(initialVisits);

    const handleNewVisit = (visit) => {
        setVisits((prev) => [...prev, visit]);
    };

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
                        Visit Dashboard
                    </h2>
                    <p className="text-sm mt-1" style={{ color: "#475569" }}>
                        Track and manage field salesperson site visits in real-time.
                    </p>
                </div>

                {/* Stats */}
                <StatsCards visits={visits} />

                {/* Two-column layout: Form + Table */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form — takes 1/3 width on desktop */}
                    <div className="lg:col-span-1">
                        <VisitForm onSubmit={handleNewVisit} />
                    </div>

                    {/* Table — takes 2/3 width on desktop */}
                    <div className="lg:col-span-2">
                        <VisitsTable visits={visits} />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer
                className="mt-8 py-5 text-center text-xs"
                style={{ color: "#334155", borderTop: "1px solid #1e293b" }}
            >
                SalesTrack &copy; {new Date().getFullYear()} &mdash; Field Sales Visit Tracker
            </footer>
        </div>
    );
}
