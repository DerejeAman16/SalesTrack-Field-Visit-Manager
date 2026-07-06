"use client";

import { MapPin, Clock, User, Home, UserCheck, TableProperties } from "lucide-react";

function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function Badge({ children, color }) {
    return (
        <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
        >
            {children}
        </span>
    );
}

// A color map for salesperson names (cycles through palette)
const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#3b82f6", "#ec4899", "#8b5cf6", "#14b8a6"];
const colorMap = {};
let colorIdx = 0;
function getColor(name) {
    if (!colorMap[name]) {
        colorMap[name] = COLORS[colorIdx % COLORS.length];
        colorIdx++;
    }
    return colorMap[name];
}

export default function VisitsTable({ visits }) {
    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <TableProperties size={18} style={{ color: "#6366f1" }} />
                    <h2 className="text-base font-semibold" style={{ color: "#e2e8f0" }}>
                        Visit Logs
                    </h2>
                </div>
                <Badge color="#6366f1">{visits.length} records</Badge>
            </div>

            {/* Desktop Table */}
            <div
                className="hidden md:block rounded-2xl overflow-hidden"
                style={{
                    background: "linear-gradient(145deg, #1e293b, #0f172a)",
                    border: "1px solid #334155",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ borderBottom: "1px solid #1e293b" }}>
                                {["Timestamp", "Salesperson", "Location", "Client Manager", "House Size"].map((h) => (
                                    <th
                                        key={h}
                                        className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                                        style={{ color: "#475569", background: "#0f172a" }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[...visits].reverse().map((v, i) => {
                                const color = getColor(v.salesperson);
                                return (
                                    <tr
                                        key={v.id}
                                        className="transition-colors duration-150"
                                        style={{
                                            borderBottom: "1px solid #1e293b",
                                            background: i % 2 === 0 ? "transparent" : "#0a1628",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#1e293b")}
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "#0a1628")
                                        }
                                    >
                                        <td className="px-5 py-3.5 whitespace-nowrap">
                                            <div className="flex items-center gap-1.5 text-xs" style={{ color: "#64748b" }}>
                                                <Clock size={12} />
                                                {formatDate(v.timestamp)}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                                    style={{ background: color }}
                                                >
                                                    {v.salesperson.charAt(0)}
                                                </div>
                                                <span className="font-medium text-white text-xs">{v.salesperson}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="max-w-[200px]">
                                                <p className="text-xs text-white leading-snug truncate">{v.address}</p>
                                                <p className="text-xs font-mono mt-0.5" style={{ color: "#4ade80" }}>
                                                    {v.latitude}, {v.longitude}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="text-xs" style={{ color: "#cbd5e1" }}>
                                                {v.clientManager}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <Badge color="#10b981">{v.houseSize} m²</Badge>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
                {[...visits].reverse().map((v) => {
                    const color = getColor(v.salesperson);
                    return (
                        <div
                            key={v.id}
                            className="rounded-2xl p-4 space-y-3"
                            style={{
                                background: "linear-gradient(145deg, #1e293b, #0f172a)",
                                border: "1px solid #334155",
                            }}
                        >
                            {/* Top row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white"
                                        style={{ background: color }}
                                    >
                                        {v.salesperson.charAt(0)}
                                    </div>
                                    <span className="text-sm font-semibold text-white">{v.salesperson}</span>
                                </div>
                                <Badge color="#10b981">{v.houseSize} m²</Badge>
                            </div>

                            {/* Details */}
                            <div className="space-y-1.5 text-xs" style={{ color: "#94a3b8" }}>
                                <div className="flex items-start gap-1.5">
                                    <MapPin size={12} className="mt-0.5 flex-shrink-0" style={{ color: "#6366f1" }} />
                                    <span>{v.address}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={12} className="flex-shrink-0" style={{ color: "#4ade80" }} />
                                    <span className="font-mono" style={{ color: "#4ade80" }}>
                                        {v.latitude}, {v.longitude}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <UserCheck size={12} className="flex-shrink-0" />
                                    {v.clientManager}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={12} className="flex-shrink-0" />
                                    {formatDate(v.timestamp)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
