const { v4: uuid } = require('uuid');

module.exports.authTokenData = () => `TGT-${uuid()}-${uuid()}-LUKE`;
module.exports.userProviderData = {
    "etu": {
        "displayName": "John DOE",
        "name": "Doe",
        "firstname": "John",
        "email": "john.doe@univ-lorraine.fr",
        "roles": [
            "student",
            "ET"
        ]
    },
    "staff": {
        "displayName": "Alice DUPONT",
        "name": "Dupont",
        "firstname": "Alice",
        "email": "alice.dupont@univ-lorraine.fr",
        "roles": [
            "FB",
            "staff",
        ]
    },
    "prof": {
        "displayName": "Bruce WILLIS",
        "name": "Willis",
        "firstname": "Bruce",
        "email": "bruce.willis@univ-lorraine.fr",
        "roles": [
            "FE",
            "teacher",
        ]
    }
};
module.exports.errorsData = {
    unauthorized: (username) => ({
        "statusCode": 401,
        "message": `Invalid authentication for '${username}'`
    }),
    unknownUser: {
        "error": {
            "code": 400,
            "message": "Utilisateur inconnu"
        }
    }
}
