"use client";

import { BarChart3, MapPin, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

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
                <div className="flex items-center gap-4">
                    {user && (
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-semibold text-white leading-tight">{user.name}</span>
                                <span className="text-xs font-medium" style={{ color: user.role === "admin" ? "#60a5fa" : "#4ade80" }}>
                                    {user.role === "admin" ? "Administrator" : "Sales Agent"}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-9 h-9 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-900/30 transition-colors border border-red-500/20"
                                title="Sign Out"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
