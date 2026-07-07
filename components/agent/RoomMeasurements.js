"use client";

import { Plus, Trash2 } from "lucide-react";

const inputClass = `
  w-full px-3 py-2 rounded-lg text-sm text-white
  focus:outline-none focus:ring-2 focus:ring-indigo-500
  transition-all duration-200 placeholder:text-slate-500
`;
const inputStyle = {
    background: "#0f172a",
    border: "1px solid #334155",
};

export default function RoomMeasurements({ rooms, setRooms }) {
    const handleAdd = () => {
        setRooms([...rooms, { roomName: "", width: "", height: "" }]);
    };

    const handleRemove = (index) => {
        setRooms(rooms.filter((_, i) => i !== index));
    };

    const handleChange = (index, field, value) => {
        const newRooms = [...rooms];
        newRooms[index][field] = value;
        setRooms(newRooms);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-400">Measurements</label>
                <button
                    type="button"
                    onClick={handleAdd}
                    className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                    style={{ border: "1px solid #6366f144" }}
                >
                    <Plus size={14} /> Add Measurement
                </button>
            </div>

            {rooms.length === 0 ? (
                <div className="text-center py-4 rounded-xl text-xs text-slate-500 border border-slate-700 border-dashed">
                    No rooms added yet. Click &quot;Add Room&quot; to begin.
                </div>
            ) : (
                <div className="space-y-3">
                    {rooms.map((room, idx) => (
                        <div
                            key={idx}
                            className="flex items-start gap-3 p-3 rounded-xl relative"
                            style={{ background: "#0f172a", border: "1px solid #334155" }}
                        >
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Room Name (e.g. Salon)"
                                        value={room.roomName}
                                        onChange={(e) => handleChange(idx, "roomName", e.target.value)}
                                        className={inputClass}
                                        style={{ background: "#1e293b", border: "1px solid #334155" }}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Width (m)"
                                        value={room.width}
                                        onChange={(e) => handleChange(idx, "width", e.target.value)}
                                        className={inputClass}
                                        style={{ background: "#1e293b", border: "1px solid #334155" }}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Height (m)"
                                        value={room.height}
                                        onChange={(e) => handleChange(idx, "height", e.target.value)}
                                        className={inputClass}
                                        style={{ background: "#1e293b", border: "1px solid #334155" }}
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemove(idx)}
                                className="w-9 h-9 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-500/10 flex-shrink-0 transition-colors mt-0 sm:mt-0"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
