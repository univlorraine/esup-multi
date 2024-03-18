const { v4: uuid } = require('uuid');

module.exports.authTokenData = () => `TGT-${uuid()}-${uuid()}-LUKE`;
module.exports.userProviderData = {
    "displayName": "John DOE",
    "name": "Doe",
    "firstname": "John",
    "email": "john.doe@univ-lorraine.fr",
    "roles": [
        "student",
        "ET"
    ]
};
