"use client";

import { MapPin, Clock, UserCheck, TableProperties, Phone, Navigation } from "lucide-react";
import { useState } from "react";

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
            className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide flex-shrink-0"
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
    const [expandedRow, setExpandedRow] = useState(null);

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <TableProperties size={18} style={{ color: "#6366f1" }} />
                    <h2 className="text-base font-semibold" style={{ color: "#e2e8f0" }}>
                        Visit Logs
                    </h2>
                </div>
                <div
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: `#6366f122`, color: "#6366f1", border: `1px solid #6366f144` }}
                >
                    {visits.length} records
                </div>
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
                                {["Timestamp", "Salesperson", "Location", "Client Manager", "Rooms"].map((h) => (
                                    <th
                                        key={h}
                                        className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-[#0f172a]"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[...visits].reverse().map((v, i) => {
                                const color = getColor(v.salesperson);
                                const totalArea = v.rooms?.reduce((acc, r) => acc + (parseFloat(r.width) * parseFloat(r.height)), 0) || 0;
                                const isExpanded = expandedRow === v.id;

                                return (
                                    <tr
                                        key={v.id}
                                        className="transition-colors duration-150 cursor-pointer group"
                                        onClick={() => setExpandedRow(isExpanded ? null : v.id)}
                                        style={{
                                            borderBottom: "1px solid #1e293b",
                                            background: isExpanded ? "#1e293b" : i % 2 === 0 ? "transparent" : "#0a1628",
                                        }}
                                    >
                                        <td className="px-5 py-4 whitespace-nowrap align-top">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                <Clock size={12} />
                                                {formatDate(v.timestamp)}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 align-top">
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
                                        <td className="px-5 py-4 align-top">
                                            <div className="max-w-[200px]">
                                                <p className="text-xs text-white leading-snug truncate">{v.address}</p>
                                                <p className="text-[10px] font-mono mt-1 text-green-400">
                                                    {v.latitude}, {v.longitude}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 align-top">
                                            <div className="text-xs text-slate-300 font-medium">
                                                {v.clientManager}
                                            </div>
                                            {(v.clientPhone || v.clientPhone === "") && (
                                                <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500">
                                                    <Phone size={10} />
                                                    {v.clientPhone || "No Phone"}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 align-top">
                                            {!v.rooms || v.rooms.length === 0 ? (
                                                <span className="text-xs text-slate-500">No rooms</span>
                                            ) : (
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <Badge color="#10b981">{totalArea.toFixed(1)} m²</Badge>
                                                        <span className="text-[10px] text-slate-400">{v.rooms.length} room(s)</span>
                                                    </div>

                                                    {isExpanded && (
                                                        <div className="mt-4 space-y-3 pt-3 border-t border-slate-700/50">
                                                            {(v.visitNature?.length > 0 || v.approachedFor?.length > 0) && (
                                                                <div className="grid grid-cols-1 gap-2">
                                                                    {v.visitNature?.length > 0 && (
                                                                        <div>
                                                                            <span className="text-slate-500 font-semibold uppercase tracking-widest text-[9px] block mb-1">Visit Nature</span>
                                                                            <div className="flex flex-wrap gap-1">
                                                                                {v.visitNature.map(n => <Badge key={n} color="#3b82f6">{n}</Badge>)}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    {v.approachedFor?.length > 0 && (
                                                                        <div>
                                                                            <span className="text-slate-500 font-semibold uppercase tracking-widest text-[9px] block mb-1">Approached For</span>
                                                                            <div className="flex flex-wrap gap-1">
                                                                                {v.approachedFor.map(a => <Badge key={a} color="#ec4899">{a}</Badge>)}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                            <div>
                                                                <span className="text-slate-500 font-semibold uppercase tracking-widest text-[9px] block mb-1">Rooms</span>
                                                                <div className="space-y-1 text-xs">
                                                                    {v.rooms.map((r, rIdx) => {
                                                                        const area = parseFloat(r.width) * parseFloat(r.height);
                                                                        return (
                                                                            <div key={rIdx} className="flex items-center justify-between py-1 border-t border-slate-700/50">
                                                                                <span className="text-slate-300">{r.roomName}</span>
                                                                                <span className="font-mono text-slate-400 text-[10px]">{r.width} × {r.height} &nbsp;<span className="text-indigo-400">({area.toFixed(1)}m²)</span></span>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
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
                    const totalArea = v.rooms?.reduce((acc, r) => acc + (parseFloat(r.width) * parseFloat(r.height)), 0) || 0;

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
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[10px] text-slate-400">{formatDate(v.timestamp)}</span>
                                    <Badge color="#10b981">{totalArea.toFixed(1)} m²</Badge>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-2 text-xs" style={{ color: "#94a3b8" }}>
                                <div className="flex items-start gap-1.5">
                                    <MapPin size={12} className="mt-0.5 flex-shrink-0" style={{ color: "#6366f1" }} />
                                    <span>{v.address}</span>
                                </div>
                                <div className="flex items-center gap-1.5 font-mono text-green-400">
                                    <Navigation size={12} className="flex-shrink-0" />
                                    {v.latitude}, {v.longitude}
                                </div>
                                <div className="flex flex-col gap-1 mt-2">
                                    <div className="flex items-center gap-1.5 text-slate-300 font-medium pt-2 border-t border-slate-700/50">
                                        <UserCheck size={12} className="flex-shrink-0" />
                                        {v.clientManager}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-400">
                                        <Phone size={12} className="flex-shrink-0" />
                                        {v.clientPhone || "No phone provided"}
                                    </div>
                                </div>
                            </div>

                            {/* Classification Mobile */}
                            {(v.visitNature?.length > 0 || v.approachedFor?.length > 0) && (
                                <div className="pt-2 border-t border-slate-700/50">
                                    {v.visitNature?.length > 0 && (
                                        <div className="mb-2">
                                            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Visit Nature</div>
                                            <div className="flex flex-wrap gap-1">
                                                {v.visitNature.map(n => <Badge key={n} color="#3b82f6">{n}</Badge>)}
                                            </div>
                                        </div>
                                    )}
                                    {v.approachedFor?.length > 0 && (
                                        <div>
                                            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Approached For</div>
                                            <div className="flex flex-wrap gap-1">
                                                {v.approachedFor.map(a => <Badge key={a} color="#ec4899">{a}</Badge>)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Rooms List Mobile */}
                            {v.rooms && v.rooms.length > 0 && (
                                <div className="pt-2 border-t border-slate-700/50">
                                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Window Measurements</div>
                                    <div className="space-y-1">
                                        {v.rooms.map((r, rIdx) => {
                                            const area = parseFloat(r.width) * parseFloat(r.height);
                                            return (
                                                <div key={rIdx} className="flex items-center justify-between text-xs bg-slate-800/50 px-2 py-1.5 rounded">
                                                    <span className="text-slate-300">{r.roomName}</span>
                                                    <span className="font-mono text-indigo-400 text-[10px]">{area.toFixed(1)} m²</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
