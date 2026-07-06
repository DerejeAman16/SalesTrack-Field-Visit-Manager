export const SALESPEOPLE = [
    "Abebe Girma",
    "Mekdes Tadesse",
    "Yonas Hailu",
    "Selam Bekele",
    "Dawit Mengesha",
    "Tigist Alemu",
    "Bereket Wolde",
];

export const USERS = [
    { username: "admin", password: "123", role: "admin", name: "System Admin" },
    { username: "abebe", password: "123", role: "agent", name: "Abebe Girma" },
    { username: "mekdes", password: "123", role: "agent", name: "Mekdes Tadesse" },
];

export const initialVisits = [
    {
        id: "v-001",
        timestamp: new Date("2026-07-06T08:15:00").toISOString(),
        salesperson: "Abebe Girma",
        address: "Bole Sub-City, Woreda 03, House No. 512, Addis Ababa",
        latitude: "9.0227",
        longitude: "38.7469",
        clientManager: "Ato Tesfaye Kebede",
        clientPhone: "0911223344",
        rooms: [
            { roomName: "Living Room", width: 2, height: 1.5 },
            { roomName: "Kitchen", width: 1.2, height: 1.2 },
        ],
    },
    {
        id: "v-002",
        timestamp: new Date("2026-07-06T09:30:00").toISOString(),
        salesperson: "Mekdes Tadesse",
        address: "Kirkos Sub-City, Woreda 07, Sar Bet, Addis Ababa",
        latitude: "9.0056",
        longitude: "38.7578",
        clientManager: "W/ro Almaz Haile",
        clientPhone: "0922334455",
        rooms: [
            { roomName: "Master Bedroom", width: 2.5, height: 1.8 },
        ],
    },
];
