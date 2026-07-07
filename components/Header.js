"use client";

import { MapPin, LogOut, Sun, Moon } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { useRouter } from "next/navigation";

export default function Header() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <header
            style={{
                background: "var(--header-bg)",
                borderBottom: "1px solid var(--border-color)",
            }}
            className="sticky top-0 z-50 transition-colors duration-250"
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
                        <h1 className="text-lg font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
                            SalesTrack
                        </h1>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Field Visit Manager
                        </p>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* Theme toggle button */}
                    <button
                        onClick={toggleTheme}
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                            background: theme === "dark" ? "#1e293b" : "#f1f5f9",
                            border: "1px solid var(--border-color)",
                            color: theme === "dark" ? "#f59e0b" : "#6366f1",
                        }}
                        title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    </button>

                    {user && (
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>
                                    {user.name}
                                </span>
                                <span
                                    className="text-xs font-medium"
                                    style={{ color: user.role === "admin" ? "#60a5fa" : "#4ade80" }}
                                >
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
