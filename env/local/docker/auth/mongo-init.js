db.createUser(
    {
        user: "multi",
        pwd: "multi",
        roles: [
            {
                role: "readWrite",
                db: "multi2023"
            }
        ]
    }
);