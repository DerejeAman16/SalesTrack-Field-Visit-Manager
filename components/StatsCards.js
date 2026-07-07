"use client";

import { ClipboardList, AreaChart, Trophy, TrendingUp } from "lucide-react";

function KpiCard({ icon: Icon, label, value, sub, color, gradient }) {
    return (
        <div
            className="relative overflow-hidden rounded-2xl p-5 group transition-all duration-300 hover:-translate-y-1"
            style={{
                background: "var(--card-gradient)",
                border: "1px solid var(--border-color)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            }}
        >
            {/* Glow blob */}
            <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"
                style={{ background: gradient }}
            />

            <div className="relative flex items-start justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                        {label}
                    </p>
                    <p
                        className="mt-2 text-3xl font-extrabold"
                        style={{ color }}
                    >
                        {value}
                    </p>
                    {sub && (
                        <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                            {sub}
                        </p>
                    )}
                </div>
                <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}22`, border: `1px solid ${color}44` }}
                >
                    <Icon size={22} style={{ color }} />
                </div>
            </div>

            {/* Bottom accent bar */}
            <div
                className="absolute bottom-0 left-0 h-1 w-full rounded-b-2xl opacity-40"
                style={{ background: gradient }}
            />
        </div>
    );
}

export default function StatsCards({ visits }) {
    const totalVisits = visits.length;
    let totalWindowArea = 0;

    visits.forEach(v => {
        if (v.rooms) {
            v.rooms.forEach(r => {
                const width = parseFloat(r.width) || 0;
                const height = parseFloat(r.height) || 0;
                totalWindowArea += (width * height);
            });
        }
    });

    // Find top performer
    const counts = {};
    visits.forEach((v) => {
        counts[v.salesperson] = (counts[v.salesperson] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const topPerson = sorted.length > 0 ? sorted[0] : null;

    return (
        <section>
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} style={{ color: "#6366f1" }} />
                <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                    Performance Overview
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <KpiCard
                    icon={ClipboardList}
                    label="Total Visits Logged"
                    value={totalVisits}
                    sub="All time records"
                    color="#6366f1"
                    gradient="linear-gradient(135deg, #6366f1, #8b5cf6)"
                />
                <KpiCard
                    icon={AreaChart}
                    label="Total Window Area"
                    value={`${totalWindowArea.toFixed(1)} m²`}
                    sub="Cumulative measurement"
                    color="#10b981"
                    gradient="linear-gradient(135deg, #10b981, #059669)"
                />
                <KpiCard
                    icon={Trophy}
                    label="Top Performer"
                    value={topPerson ? topPerson[0].split(" ")[0] : "—"}
                    sub={
                        topPerson
                            ? `${topPerson[1]} visit${topPerson[1] !== 1 ? "s" : ""} • ${topPerson[0]}`
                            : "No data yet"
                    }
                    color="#f59e0b"
                    gradient="linear-gradient(135deg, #f59e0b, #d97706)"
                />
            </div>
        </section>
    );
}
