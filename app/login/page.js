"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { MapPin, Lock, User, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const user = login(form.username, form.password);
            if (user.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/agent");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 transition-colors duration-250"
            style={{ background: "var(--bg-primary)" }}
        >
            <div
                className="w-full max-w-md p-8 rounded-2xl relative overflow-hidden"
                style={{
                    background: "var(--card-gradient)",
                    border: "1px solid var(--border-color)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                }}
            >
                {/* Glow accent */}
                <div
                    className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-20 blur-3xl pointer-events-none"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                />

                <div className="text-center mb-8 relative">
                    <div
                        className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4"
                        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                    >
                        <MapPin size={28} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>SalesTrack</h1>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        Sign in to your account
                    </p>
                </div>

                {error && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg mb-6 text-sm" style={{ background: "#450a0a55", border: "1px solid #7f1d1d", color: "#f87171" }}>
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 relative">
                    <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                            Username
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                                <User size={16} />
                            </span>
                            <input
                                name="username"
                                type="text"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                style={{
                                    background: "var(--bg-input)",
                                    border: "1px solid var(--border-color)",
                                    color: "var(--text-primary)",
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                                <Lock size={16} />
                            </span>
                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                style={{
                                    background: "var(--bg-input)",
                                    border: "1px solid var(--border-color)",
                                    color: "var(--text-primary)",
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 active:scale-95 mt-2"
                        style={{
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
                        }}
                    >
                        Sign In
                    </button>

                    <div className="text-center pt-4 text-xs" style={{ color: "var(--text-muted)" }}>
                        <p>Demo accounts:</p>
                        <p className="mt-1">Admin: admin / 123 | Agent: abebe / 123</p>
                    </div>
                </form>
            </div>
        </div>
    );
}
