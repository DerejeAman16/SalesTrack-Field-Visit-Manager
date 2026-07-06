"use client";

import { Users, Shield, User } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function SalespersonList() {
    const { usersList, user: currentUser } = useAuth();
    // Exclude the current admin if desired, but good to see everyone.
    const agents = usersList.filter(u => u.role !== "admin");

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
                <Users size={18} style={{ color: "#10b981" }} />
                <h2 className="text-base font-semibold" style={{ color: "#e2e8f0" }}>
                    Registered Salespeople
                </h2>
                <div
                    className="ml-auto px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: `#10b98122`, color: "#10b981", border: `1px solid #10b98144` }}
                >
                    {agents.length} members
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-2" style={{ maxHeight: "180px" }}>
                {agents.map((agent, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                        style={{ background: "#0a1628", border: "1px solid #1e293b" }}
                    >
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs flex-shrink-0"
                            style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                        >
                            {agent.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{agent.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono truncate">@{agent.username}</p>
                        </div>
                        <div className="flex-shrink-0 text-slate-500">
                            {agent.role === "admin" ? <Shield size={14} /> : <User size={14} />}
                        </div>
                    </div>
                ))}

                {agents.length === 0 && (
                    <div className="text-xs text-center text-slate-500 py-4">
                        No salespeople registered yet.
                    </div>
                )}
            </div>
        </section>
    );
}
