"use client";

import { BarChart3, MapPin } from "lucide-react";

export default function Header() {
    return (
        <header
            style={{
                background:
                    "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                borderBottom: "1px solid #334155",
            }}
            className="sticky top-0 z-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                {/* Logo / Brand */}
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                    >
                        <MapPin size={20} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white leading-tight">
                            SalesTrack
                        </h1>
                        <p className="text-xs" style={{ color: "#94a3b8" }}>
                            Field Visit Manager
                        </p>
                    </div>
                </div>

                {/* Right side badge */}
                <div className="flex items-center gap-2">
                    <div
                        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{ background: "#1e3a5f", color: "#60a5fa" }}
                    >
                        <BarChart3 size={14} />
                        Admin Dashboard
                    </div>
                    <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                        style={{ background: "#14532d22", border: "1px solid #16a34a55", color: "#4ade80" }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ background: "#4ade80" }}
                        />
                        Live
                    </div>
                </div>
            </div>
        </header>
    );
}
