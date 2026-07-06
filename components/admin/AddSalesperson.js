"use client";

import { useState } from "react";
import { UserPlus, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function AddSalesperson() {
    const { addUser } = useAuth();
    const [form, setForm] = useState({ name: "", username: "", password: "" });
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser({
            name: form.name,
            username: form.username,
            password: form.password,
            role: "agent",
        });
        setSuccess(true);
        setTimeout(() => {
            setForm({ name: "", username: "", password: "" });
            setSuccess(false);
        }, 2000);
    };

    return (
        <section
            className="rounded-2xl p-6 h-full flex flex-col"
            style={{
                background: "linear-gradient(145deg, #1e293b, #0f172a)",
                border: "1px solid #334155",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            }}
        >
            <div className="flex items-center gap-2 mb-4">
                <UserPlus size={18} style={{ color: "#6366f1" }} />
                <h2 className="text-base font-semibold" style={{ color: "#e2e8f0" }}>
                    Add Salesperson
                </h2>
            </div>

            {success ? (
                <div className="flex flex-col items-center justify-center flex-1 gap-2 text-center">
                    <CheckCircle2 size={32} style={{ color: "#4ade80" }} />
                    <p className="font-semibold text-sm" style={{ color: "#4ade80" }}>Added Successfully!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-end">
                    <div>
                        <label className="block text-xs font-medium mb-1 text-slate-400">Full Name</label>
                        <input
                            required
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            style={{ background: "#0a1628", border: "1px solid #334155" }}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1 text-slate-400">Username</label>
                        <input
                            required
                            type="text"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            style={{ background: "#0a1628", border: "1px solid #334155" }}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1 text-slate-400">Password</label>
                        <input
                            required
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            style={{ background: "#0a1628", border: "1px solid #334155" }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:bg-indigo-600 mt-2"
                        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                    >
                        Create Account
                    </button>
                </form>
            )}
        </section>
    );
}
