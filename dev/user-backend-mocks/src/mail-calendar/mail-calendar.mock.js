module.exports.mailCalendarData = {
    "unreadMails": "920",
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
        }
    ]
};