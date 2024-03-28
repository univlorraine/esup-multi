module.exports.mailCalendarData = () => ({
    "unreadMails": "92",
    "events": [
        {
            "label": "Réunion avec le directeur",
            "startDateTime": (() => {
                const now = new Date();
                const start = new Date(now.getTime() + 259200000).setHours(10, 30, 0, 0);
                return new Date(start).toISOString();
            })(),
            "endDateTime": (() => {
                const now = new Date();
                const end = new Date(now.getTime() + 259200000).setHours(12, 0, 0, 0);
                return new Date(end).toISOString();
            })(),
            "location": "Salle 12"
        },
        {
            "label": "Présentation des options",
            "startDateTime": (() => {
                const now = new Date();
                const start = new Date(now.getTime() + 345600000).setHours(14, 0, 0, 0);
                return new Date(start).toISOString();
            })(),
            "endDateTime": (() => {
                const now = new Date();
                const end = new Date(now.getTime() + 345600000).setHours(16, 0, 0, 0);
                return new Date(end).toISOString();
            })(),
            "location": "Bâtiment A, Amphi 3"
        }
    ]
});