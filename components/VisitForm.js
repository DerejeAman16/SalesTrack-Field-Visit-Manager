"use client";

import { useState } from "react";
import { MapPin, User, Home, UserCheck, CheckCircle2, Loader2, Navigation } from "lucide-react";
import { SALESPEOPLE } from "@/lib/mockData";

const MOCK_LOCATIONS = [
    { lat: "9.0054", lng: "38.7636", address: "Bole Road, Friendship Area, Addis Ababa" },
    { lat: "9.0198", lng: "38.7527", address: "Mexico Square, Arada, Addis Ababa" },
    { lat: "8.9984", lng: "38.7893", address: "CMC Road, Yeka Sub-City, Addis Ababa" },
    { lat: "9.0341", lng: "38.7231", address: "Megenagna, Bole Sub-City, Addis Ababa" },
    { lat: "9.0123", lng: "38.7412", address: "Lideta, Woreda 07, Addis Ababa" },
];

const inputClass = `
  w-full px-4 py-2.5 rounded-xl text-sm text-white
  focus:outline-none focus:ring-2 focus:ring-indigo-500
  transition-all duration-200 placeholder:text-slate-500
`;
const inputStyle = {
    background: "#0f172a",
    border: "1px solid #334155",
};

export default function VisitForm({ onSubmit }) {
    const [form, setForm] = useState({
        salesperson: "",
        address: "",
        latitude: "",
        longitude: "",
        clientManager: "",
        houseSize: "",
    });
    const [locating, setLocating] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name]) {
            setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
        }
    };

    const captureLocation = () => {
        setLocating(true);
        const mock = MOCK_LOCATIONS[Math.floor(Math.random() * MOCK_LOCATIONS.length)];
        setTimeout(() => {
            setForm((prev) => ({
                ...prev,
                latitude: mock.lat,
                longitude: mock.lng,
                address: prev.address || mock.address,
            }));
            setLocating(false);
        }, 1200);
    };

    const validate = () => {
        const e = {};
        if (!form.salesperson) e.salesperson = "Required";
        if (!form.address) e.address = "Required";
        if (!form.latitude) e.latitude = "Capture location first";
        if (!form.clientManager) e.clientManager = "Required";
        if (!form.houseSize || Number(form.houseSize) <= 0) e.houseSize = "Enter a valid size";
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        onSubmit({
            id: `v-${Date.now()}`,
            timestamp: new Date().toISOString(),
            salesperson: form.salesperson,
            address: form.address,
            latitude: form.latitude,
            longitude: form.longitude,
            clientManager: form.clientManager,
            houseSize: Number(form.houseSize),
        });

        setSubmitted(true);
        setTimeout(() => {
            setForm({ salesperson: "", address: "", latitude: "", longitude: "", clientManager: "", houseSize: "" });
            setErrors({});
            setSubmitted(false);
        }, 2500);
    };

    return (
        <section
            className="rounded-2xl p-6"
            style={{
                background: "linear-gradient(145deg, #1e293b, #0f172a)",
                border: "1px solid #334155",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            }}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                >
                    <CheckCircle2 size={18} className="text-white" />
                </div>
                <div>
                    <h2 className="font-semibold text-white">Log a Visit</h2>
                    <p className="text-xs" style={{ color: "#64748b" }}>
                        Submit a new site check-in
                    </p>
                </div>
            </div>

            {submitted ? (
                <div
                    className="flex flex-col items-center justify-center gap-3 py-10 rounded-xl"
                    style={{ background: "#14532d22", border: "1px dashed #16a34a55" }}
                >
                    <CheckCircle2 size={40} style={{ color: "#4ade80" }} />
                    <p className="font-semibold" style={{ color: "#4ade80" }}>
                        Visit Logged Successfully!
                    </p>
                    <p className="text-sm" style={{ color: "#94a3b8" }}>
                        Statistics and table updated.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Salesperson */}
                    <div>
                        <label className="flex items-center gap-1.5 text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>
                            <User size={12} /> Salesperson Name
                        </label>
                        <select
                            name="salesperson"
                            value={form.salesperson}
                            onChange={handleChange}
                            className={inputClass}
                            style={{ ...inputStyle, appearance: "none" }}
                        >
                            <option value="">— Select salesperson —</option>
                            {SALESPEOPLE.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        {errors.salesperson && (
                            <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                                {errors.salesperson}
                            </p>
                        )}
                    </div>

                    {/* Pin Location */}
                    <div>
                        <label className="flex items-center gap-1.5 text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>
                            <MapPin size={12} /> Site Location
                        </label>
                        <button
                            type="button"
                            onClick={captureLocation}
                            disabled={locating}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-95 mb-2"
                            style={{
                                background: locating
                                    ? "#1e293b"
                                    : "linear-gradient(135deg, #1d4ed8, #6366f1)",
                                border: "1px solid #3b82f655",
                                color: locating ? "#64748b" : "white",
                                cursor: locating ? "not-allowed" : "pointer",
                            }}
                        >
                            {locating ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" /> Acquiring Location…
                                </>
                            ) : (
                                <>
                                    <Navigation size={16} /> Capture Current Location
                                </>
                            )}
                        </button>

                        {form.latitude && (
                            <div
                                className="flex items-center gap-2 px-3 py-2 rounded-lg mb-2 text-xs font-mono"
                                style={{ background: "#0f2a1a", border: "1px solid #16a34a44", color: "#4ade80" }}
                            >
                                <MapPin size={12} />
                                Lat: {form.latitude} &nbsp;|&nbsp; Lng: {form.longitude}
                            </div>
                        )}
                        {errors.latitude && (
                            <p className="text-xs mb-1" style={{ color: "#f87171" }}>
                                {errors.latitude}
                            </p>
                        )}
                        <input
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Site address (e.g. Bole Sub-City, Woreda 03…)"
                            className={inputClass}
                            style={inputStyle}
                        />
                        {errors.address && (
                            <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                                {errors.address}
                            </p>
                        )}
                    </div>

                    {/* Grid: Client Manager + House Size */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>
                                <UserCheck size={12} /> Client Manager Name
                            </label>
                            <input
                                name="clientManager"
                                value={form.clientManager}
                                onChange={handleChange}
                                placeholder="e.g. Ato Tesfaye Kebede"
                                className={inputClass}
                                style={inputStyle}
                            />
                            {errors.clientManager && (
                                <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                                    {errors.clientManager}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>
                                <Home size={12} /> House Size (m² / care)
                            </label>
                            <input
                                name="houseSize"
                                type="number"
                                min="1"
                                value={form.houseSize}
                                onChange={handleChange}
                                placeholder="e.g. 250"
                                className={inputClass}
                                style={inputStyle}
                            />
                            {errors.houseSize && (
                                <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                                    {errors.houseSize}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                        style={{
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
                        }}
                    >
                        Submit Visit Log
                    </button>
                </form>
            )}
        </section>
    );
}
