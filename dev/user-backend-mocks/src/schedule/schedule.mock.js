/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

const schedule = {
    "messages": [],
    "plannings": [
        {
            "id": "voiry8u-9WIMAH-805",
            "label": "Mon planning de M2-Management et administration des entreprises PT Administration des entreprises (METZ) (CONV ECOLE ING)",
            "default": true,
            "type": "USER",
            "messages": [
                {
                    "level": "INFO",
                    "text": "Votre emploi du temps personnalisé tient compte de vos inscriptions aux groupes et options. Vous pouvez également consulter le planning général de votre formation qui affiche tous les groupes et toutes les options."
                }
            ],
            "events": [
                {
                    "id": 33482,
                    "startDateTime": "2023-12-19T18:00:00+01:00",
                    "endDateTime": "2023-12-19T20:00:00+01:00",
                    "course": {
                        "id": "11-103937",
                        "label": "DOUBLE DIPLOME INGENIEURS MANAGERS",
                        "color": "#ffffff",
                        "type": "",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 19111,
                            "label": "Technopole_204",
                            "type": "Salle banalisée",
                            "building": "IPEFAM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 354594,
                            "displayname": "MARTIN Jean",
                            "email": "jean.martin54@gmail.com"
                        }
                    ],
                    "groups": []
                }
            ]
        },
        {
            "id": "9WIMAH-805",
            "label": "Planning général de M2-Management et administration des entreprises PT Administration des entreprises (METZ) (CONV ECOLE ING)",
            "default": false,
            "type": "VET",
            "messages": [],
            "events": [
                {
                    "id": 33482,
                    "startDateTime": "2023-12-19T18:00:00+01:00",
                    "endDateTime": "2023-12-19T20:00:00+01:00",
                    "course": {
                        "id": "11-103937",
                        "label": "DOUBLE DIPLOME INGENIEURS MANAGERS",
                        "color": "#ffffff",
                        "type": "",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 19111,
                            "label": "Technopole_204",
                            "type": "Salle banalisée",
                            "building": "IPEFAM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 354594,
                            "displayname": "MARTIN Jean",
                            "email": "jean.martin54@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 101850,
                            "label": "M2-Management et administration des entreprises PT Administration des entreprises (METZ) (CONV ECOLE ING)"
                        }
                    ]
                }
            ]
        },
        {
            "id": "voiry8u-9KIML1-500",
            "label": "Mon planning de INGENIEUR ENIM 5A",
            "default": true,
            "type": "USER",
            "messages": [
                {
                    "level": "INFO",
                    "text": "Votre emploi du temps personnalisé tient compte de vos inscriptions aux groupes et options. Vous pouvez également consulter le planning général de votre formation qui affiche tous les groupes et toutes les options."
                }
            ],
            "events": [
                {
                    "id": 192186,
                    "startDateTime": "2023-12-04T08:45:00+01:00",
                    "endDateTime": "2023-12-04T11:45:00+01:00",
                    "course": {
                        "id": "11-140677",
                        "label": "TD La cindynique 3A39",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 63334,
                            "displayname": "Enseignant 1",
                            "email": ""
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 228538,
                    "startDateTime": "2023-12-04T11:45:00+01:00",
                    "endDateTime": "2023-12-04T12:45:00+01:00",
                    "course": {
                        "id": "11-192683",
                        "label": "ALL 5A renforcé ECRIRE",
                        "color": "#ffffff",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120320,
                            "label": "Technopole_1A02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 174923,
                            "displayname": "POTTER Harry",
                            "email": "harry.potter@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 185867,
                            "label": "5A ALLEMAND"
                        }
                    ]
                },
                {
                    "id": 192187,
                    "startDateTime": "2023-12-04T13:30:00+01:00",
                    "endDateTime": "2023-12-04T17:30:00+01:00",
                    "course": {
                        "id": "11-140677",
                        "label": "TD La cindynique 3A39",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 63334,
                            "displayname": "Enseignant 1",
                            "email": ""
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 192785,
                    "startDateTime": "2023-12-05T07:45:00+01:00",
                    "endDateTime": "2023-12-05T11:45:00+01:00",
                    "course": {
                        "id": "11-294417",
                        "label": "CM Management du risque et des hommes, Fact. humain et pratique 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 192841,
                    "startDateTime": "2023-12-05T13:30:00+01:00",
                    "endDateTime": "2023-12-05T17:30:00+01:00",
                    "course": {
                        "id": "11-294417",
                        "label": "CM Management du risque et des hommes, Fact. humain et pratique 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 192850,
                    "startDateTime": "2023-12-06T07:45:00+01:00",
                    "endDateTime": "2023-12-06T11:45:00+01:00",
                    "course": {
                        "id": "11-294417",
                        "label": "CM Management du risque et des hommes, Fact. humain et pratique 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 56832,
                    "startDateTime": "2023-12-06T12:30:00+01:00",
                    "endDateTime": "2023-12-06T13:30:00+01:00",
                    "course": {
                        "id": "11-103829",
                        "label": "ESP 5A renforcé ECRIRE",
                        "color": "#ffffff",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120320,
                            "label": "Technopole_1A02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168115,
                            "displayname": "GAUTIER Juliette",
                            "email": "juliette.gautier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 205266,
                            "label": "5A ESPAGNOL"
                        }
                    ]
                },
                {
                    "id": 193452,
                    "startDateTime": "2023-12-06T13:30:00+01:00",
                    "endDateTime": "2023-12-06T17:30:00+01:00",
                    "course": {
                        "id": "11-294380",
                        "label": "CM Maîtrise des conséquences 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 22243,
                    "startDateTime": "2023-12-07T13:30:00+01:00",
                    "endDateTime": "2023-12-07T16:00:00+01:00",
                    "course": {
                        "id": "11-127201",
                        "label": "LINGUASKILL 5A",
                        "color": "#ffffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45955,
                            "label": "Technopole_1A39",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        },
                        {
                            "id": 45956,
                            "label": "Technopole_1A40",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 123580,
                            "displayname": "WILLIS Bruce",
                            "email": "bruce.willis@univ-lorraine.fr"
                        },
                        {
                            "id": 204316,
                            "displayname": "BLANCHARD Fabiene",
                            "email": "fabiene.blanchard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162838,
                            "label": "5A"
                        }
                    ]
                },
                {
                    "id": 193448,
                    "startDateTime": "2023-12-08T07:45:00+01:00",
                    "endDateTime": "2023-12-08T09:45:00+01:00",
                    "course": {
                        "id": "11-294380",
                        "label": "CM Maîtrise des conséquences 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 193472,
                    "startDateTime": "2023-12-08T09:45:00+01:00",
                    "endDateTime": "2023-12-08T11:45:00+01:00",
                    "course": {
                        "id": "11-136029",
                        "label": "CM Contexte sociétal 3A39",
                        "color": "#21ff37",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 193474,
                    "startDateTime": "2023-12-08T13:30:00+01:00",
                    "endDateTime": "2023-12-08T17:30:00+01:00",
                    "course": {
                        "id": "11-136029",
                        "label": "CM Contexte sociétal 3A39",
                        "color": "#21ff37",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 193488,
                    "startDateTime": "2023-12-11T07:45:00+01:00",
                    "endDateTime": "2023-12-11T09:45:00+01:00",
                    "course": {
                        "id": "11-136029",
                        "label": "CM Contexte sociétal 3A39",
                        "color": "#21ff37",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 193489,
                    "startDateTime": "2023-12-11T09:45:00+01:00",
                    "endDateTime": "2023-12-11T11:45:00+01:00",
                    "course": {
                        "id": "11-136029",
                        "label": "CM Contexte sociétal 3A39",
                        "color": "#21ff37",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 228537,
                    "startDateTime": "2023-12-11T11:45:00+01:00",
                    "endDateTime": "2023-12-11T12:45:00+01:00",
                    "course": {
                        "id": "11-192683",
                        "label": "ALL 5A renforcé ECRIRE",
                        "color": "#ffffff",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120320,
                            "label": "Technopole_1A02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 174923,
                            "displayname": "POTTER Harry",
                            "email": "harry.potter@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 185867,
                            "label": "5A ALLEMAND"
                        }
                    ]
                },
                {
                    "id": 193445,
                    "startDateTime": "2023-12-11T13:30:00+01:00",
                    "endDateTime": "2023-12-11T17:30:00+01:00",
                    "course": {
                        "id": "11-294380",
                        "label": "CM Maîtrise des conséquences 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 61598,
                    "startDateTime": "2023-12-12T12:45:00+01:00",
                    "endDateTime": "2023-12-12T13:15:00+01:00",
                    "course": {
                        "id": "11-284503",
                        "label": "ESP 5A renforcé EXPOSER",
                        "color": "#ffffff",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45996,
                            "label": "Technopole_1A08",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168115,
                            "displayname": "GAUTIER Juliette",
                            "email": "juliette.gautier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 205266,
                            "label": "5A ESPAGNOL"
                        }
                    ]
                },
                {
                    "id": 193558,
                    "startDateTime": "2023-12-12T13:30:00+01:00",
                    "endDateTime": "2023-12-12T16:30:00+01:00",
                    "course": {
                        "id": "11-145716",
                        "label": "TP Projet étude de cas 3A39",
                        "color": "#9999ff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 2043,
                            "displayname": "LEROY Romain",
                            "email": "romain.leroy@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 192196,
                    "startDateTime": "2023-12-13T08:45:00+01:00",
                    "endDateTime": "2023-12-13T11:45:00+01:00",
                    "course": {
                        "id": "11-140677",
                        "label": "TD La cindynique 3A39",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 63334,
                            "displayname": "Enseignant 1",
                            "email": ""
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 56693,
                    "startDateTime": "2023-12-13T12:30:00+01:00",
                    "endDateTime": "2023-12-13T13:30:00+01:00",
                    "course": {
                        "id": "11-103829",
                        "label": "ESP 5A renforcé ECRIRE",
                        "color": "#ffffff",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120320,
                            "label": "Technopole_1A02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168115,
                            "displayname": "GAUTIER Juliette",
                            "email": "juliette.gautier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 205266,
                            "label": "5A ESPAGNOL"
                        }
                    ]
                },
                {
                    "id": 192198,
                    "startDateTime": "2023-12-13T13:30:00+01:00",
                    "endDateTime": "2023-12-13T17:30:00+01:00",
                    "course": {
                        "id": "11-140677",
                        "label": "TD La cindynique 3A39",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 63334,
                            "displayname": "Enseignant 1",
                            "email": ""
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 193580,
                    "startDateTime": "2023-12-14T08:45:00+01:00",
                    "endDateTime": "2023-12-14T11:45:00+01:00",
                    "course": {
                        "id": "11-145716",
                        "label": "TP Projet étude de cas 3A39",
                        "color": "#9999ff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 2043,
                            "displayname": "LEROY Romain",
                            "email": "romain.leroy@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 193436,
                    "startDateTime": "2023-12-15T07:45:00+01:00",
                    "endDateTime": "2023-12-15T11:45:00+01:00",
                    "course": {
                        "id": "11-294380",
                        "label": "CM Maîtrise des conséquences 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 193438,
                    "startDateTime": "2023-12-15T13:30:00+01:00",
                    "endDateTime": "2023-12-15T17:30:00+01:00",
                    "course": {
                        "id": "11-294380",
                        "label": "CM Maîtrise des conséquences 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 228536,
                    "startDateTime": "2023-12-18T11:45:00+01:00",
                    "endDateTime": "2023-12-18T12:45:00+01:00",
                    "course": {
                        "id": "11-192683",
                        "label": "ALL 5A renforcé ECRIRE",
                        "color": "#ffffff",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120320,
                            "label": "Technopole_1A02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 174923,
                            "displayname": "POTTER Harry",
                            "email": "harry.potter@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 185867,
                            "label": "5A ALLEMAND"
                        }
                    ]
                },
                {
                    "id": 191678,
                    "startDateTime": "2023-12-19T08:45:00+01:00",
                    "endDateTime": "2023-12-19T11:45:00+01:00",
                    "course": {
                        "id": "11-148272",
                        "label": "TD Connaissance de soi et des autres - 3A39",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 2043,
                            "displayname": "LEROY Romain",
                            "email": "romain.leroy@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 55591,
                    "startDateTime": "2023-12-19T12:45:00+01:00",
                    "endDateTime": "2023-12-19T13:15:00+01:00",
                    "course": {
                        "id": "11-103829",
                        "label": "ESP 5A renforcé ECRIRE",
                        "color": "#ffffff",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120320,
                            "label": "Technopole_1A02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168115,
                            "displayname": "GAUTIER Juliette",
                            "email": "juliette.gautier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 205266,
                            "label": "5A ESPAGNOL"
                        }
                    ]
                },
                {
                    "id": 191695,
                    "startDateTime": "2023-12-20T09:45:00+01:00",
                    "endDateTime": "2023-12-20T11:45:00+01:00",
                    "course": {
                        "id": "11-148272",
                        "label": "TD Connaissance de soi et des autres - 3A39",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 2043,
                            "displayname": "LEROY Romain",
                            "email": "romain.leroy@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 193581,
                    "startDateTime": "2023-12-20T13:30:00+01:00",
                    "endDateTime": "2023-12-20T15:30:00+01:00",
                    "course": {
                        "id": "11-145716",
                        "label": "TP Projet étude de cas 3A39",
                        "color": "#9999ff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 2043,
                            "displayname": "LEROY Romain",
                            "email": "romain.leroy@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 193430,
                    "startDateTime": "2023-12-21T08:45:00+01:00",
                    "endDateTime": "2023-12-21T11:45:00+01:00",
                    "course": {
                        "id": "11-222812",
                        "label": "Concours d'éloquence",
                        "color": "#cccccc",
                        "type": "",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46008,
                            "label": "Technopole_AUDITORIUM B. BOLLE",
                            "type": "Amphithéâtre",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 2043,
                            "displayname": "LEROY Romain",
                            "email": "romain.leroy@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 193139,
                    "startDateTime": "2023-12-22T07:45:00+01:00",
                    "endDateTime": "2023-12-22T09:45:00+01:00",
                    "course": {
                        "id": "11-294389",
                        "label": "CM Posture de l'acteur de la sécurité 3A39",
                        "color": "#66ff66",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 193140,
                    "startDateTime": "2023-12-22T09:45:00+01:00",
                    "endDateTime": "2023-12-22T11:45:00+01:00",
                    "course": {
                        "id": "11-294389",
                        "label": "CM Posture de l'acteur de la sécurité 3A39",
                        "color": "#66ff66",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                }
            ]
        },
        {
            "id": "9KIML1-500",
            "label": "Planning général de INGENIEUR ENIM 5A",
            "default": false,
            "type": "VET",
            "messages": [],
            "events": [
                {
                    "id": 186429,
                    "startDateTime": "2023-12-01T07:45:00+01:00",
                    "endDateTime": "2023-12-01T09:45:00+01:00",
                    "course": {
                        "id": "11-258288",
                        "label": "TD Cycles industriels thermodynamiques",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 167656,
                            "displayname": "DUVAL René",
                            "email": "rene.duval@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 35471,
                    "startDateTime": "2023-12-01T07:45:00+01:00",
                    "endDateTime": "2023-12-01T11:45:00+01:00",
                    "course": {
                        "id": "11-251998",
                        "label": "TD Communication Management CMAO",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45957,
                            "label": "Technopole_2A10",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 9757,
                            "displayname": "DUPUYS Danielle",
                            "email": "danielle.dupuys@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162840,
                            "label": "5ACMAO"
                        }
                    ]
                },
                {
                    "id": 187658,
                    "startDateTime": "2023-12-01T07:45:00+01:00",
                    "endDateTime": "2023-12-01T11:45:00+01:00",
                    "course": {
                        "id": "11-189234",
                        "label": "CM Modélisation et optimisation moteur 5ASPM",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46001,
                            "label": "Technopole_1B95",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201500,
                            "displayname": "BEAULIEU Patricia",
                            "email": "pbeaulieu@aliceadsl.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162846,
                            "label": "5ASPM"
                        }
                    ]
                },
                {
                    "id": 187826,
                    "startDateTime": "2023-12-01T07:45:00+01:00",
                    "endDateTime": "2023-12-01T11:45:00+01:00",
                    "course": {
                        "id": "11-90916",
                        "label": "TP Matériaux composites MAPI1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 4540,
                            "label": "-1B70",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134963,
                            "displayname": "PELLETIER Lucas",
                            "email": "lucas.pelletier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275526,
                            "label": "5A MAPI 1"
                        }
                    ]
                },
                {
                    "id": 191694,
                    "startDateTime": "2023-12-01T07:45:00+01:00",
                    "endDateTime": "2023-12-01T11:45:00+01:00",
                    "course": {
                        "id": "11-152703",
                        "label": "TD Supply chain 5AMLP DA",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 342470,
                            "label": "Technopole_1B97",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11702,
                            "displayname": "DESROSIERS Dwayne",
                            "email": "dwayne.desrosiers@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162879,
                            "label": "5AMLP"
                        }
                    ]
                },
                {
                    "id": 201861,
                    "startDateTime": "2023-12-01T07:45:00+01:00",
                    "endDateTime": "2023-12-01T11:45:00+01:00",
                    "course": {
                        "id": "11-189153",
                        "label": "TP Outils de l'Ingénierie de Maintenance 5MAI 1 DH",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 7195,
                            "displayname": "SCHNEIDER Isabelle",
                            "email": "isabelle.schneider@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193004,
                            "label": "5A MAI1"
                        }
                    ]
                },
                {
                    "id": 230049,
                    "startDateTime": "2023-12-01T07:45:00+01:00",
                    "endDateTime": "2023-12-01T11:45:00+01:00",
                    "course": {
                        "id": "11-51341",
                        "label": "TP Fusion multi-capteurs",
                        "color": "#03fff2",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45953,
                            "label": "Technopole_1A37",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 553,
                            "displayname": "COLLIN Valerie",
                            "email": "valerie.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 230880,
                    "startDateTime": "2023-12-01T07:45:00+01:00",
                    "endDateTime": "2023-12-01T11:45:00+01:00",
                    "course": {
                        "id": "11-48426",
                        "label": "TP Patient-specific FE modeling",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134965,
                            "displayname": "ARNOUX Violette",
                            "email": "violette.arnoux@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 120047,
                    "startDateTime": "2023-12-01T08:45:00+01:00",
                    "endDateTime": "2023-12-01T11:45:00+01:00",
                    "course": {
                        "id": "11-189279",
                        "label": "TD Entreprenariat - Communication externe 5AINE",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 371427,
                            "displayname": "JOLY Marceau",
                            "email": "marceau@jodion.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 184818,
                    "startDateTime": "2023-12-01T09:45:00+01:00",
                    "endDateTime": "2023-12-01T11:45:00+01:00",
                    "course": {
                        "id": "11-258295",
                        "label": "CM Conférences - filières nucléaire, pétrole, gaz 5ANRJ",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 141507,
                            "displayname": "Enseignant 10",
                            "email": ""
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 191512,
                    "startDateTime": "2023-12-01T13:00:00+01:00",
                    "endDateTime": "2023-12-01T17:00:00+01:00",
                    "course": {
                        "id": "11-189249",
                        "label": "TD Sécurité 5AMLP",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 342470,
                            "label": "Technopole_1B97",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 375802,
                            "displayname": "LUC Alexis",
                            "email": "aluc176@orange.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162879,
                            "label": "5AMLP"
                        }
                    ]
                },
                {
                    "id": 187505,
                    "startDateTime": "2023-12-01T13:15:00+01:00",
                    "endDateTime": "2023-12-01T16:15:00+01:00",
                    "course": {
                        "id": "11-189234",
                        "label": "CM Modélisation et optimisation moteur 5ASPM",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46001,
                            "label": "Technopole_1B95",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201500,
                            "displayname": "BEAULIEU Patricia",
                            "email": "pbeaulieu@aliceadsl.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162846,
                            "label": "5ASPM"
                        }
                    ]
                },
                {
                    "id": 102036,
                    "startDateTime": "2023-12-01T13:30:00+01:00",
                    "endDateTime": "2023-12-01T15:30:00+01:00",
                    "course": {
                        "id": "11-34013",
                        "label": "CM Moteurs à Combustion Interne & Défis Environnementaux",
                        "color": "#08ff10",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46006,
                            "label": "Technopole_1B04",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 125534,
                            "displayname": "JARDINE Alphonse",
                            "email": "alphonse.jardine@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374592,
                            "label": "5AVEHA"
                        }
                    ]
                },
                {
                    "id": 186495,
                    "startDateTime": "2023-12-01T13:30:00+01:00",
                    "endDateTime": "2023-12-01T15:30:00+01:00",
                    "course": {
                        "id": "11-239287",
                        "label": "CM Mécanismes de déformation et microstructures FY",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45999,
                            "label": "Technopole_1B68",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 7493,
                            "displayname": "NATUREL Anne-Marie",
                            "email": "anne-marie.naturel@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275537,
                            "label": "5A MAPI"
                        }
                    ]
                },
                {
                    "id": 194504,
                    "startDateTime": "2023-12-01T13:30:00+01:00",
                    "endDateTime": "2023-12-01T15:30:00+01:00",
                    "course": {
                        "id": "11-291095",
                        "label": "TD Modélisation et analyse des processus industriels 5AQUA",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45996,
                            "label": "Technopole_1A08",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 10934,
                            "displayname": "GROSJEAN Lucie",
                            "email": "lucie.grosjean@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        },
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 185494,
                    "startDateTime": "2023-12-01T13:30:00+01:00",
                    "endDateTime": "2023-12-01T17:30:00+01:00",
                    "course": {
                        "id": "11-257614",
                        "label": "CM Performance énergétique des bâtiments 5ANRJ",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 235498,
                            "displayname": "LAMARRE Lucas",
                            "email": "lucas.lamarre@orange.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 186277,
                    "startDateTime": "2023-12-01T13:30:00+01:00",
                    "endDateTime": "2023-12-01T17:30:00+01:00",
                    "course": {
                        "id": "11-56221",
                        "label": "CM Maillage avancé et optimisation CMAO",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201589,
                            "displayname": "JACQUIOT France",
                            "email": "france.jacquiot@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162842,
                            "label": "5ACMAO2"
                        },
                        {
                            "id": 162844,
                            "label": "5ACMAO1"
                        }
                    ]
                },
                {
                    "id": 230921,
                    "startDateTime": "2023-12-01T13:30:00+01:00",
                    "endDateTime": "2023-12-01T17:30:00+01:00",
                    "course": {
                        "id": "11-122046",
                        "label": "TP Mechanical behaviour of biological tissues",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 343513,
                            "label": "Technopole_-1B47/1",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168226,
                            "displayname": "FAURE Jacques",
                            "email": "jacques.faure@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 278880,
                    "startDateTime": "2023-12-01T14:00:00+01:00",
                    "endDateTime": "2023-12-01T17:00:00+01:00",
                    "course": {
                        "id": "11-124311",
                        "label": "CM Techniques d'optimisation",
                        "color": "#03ff3d",
                        "type": "CM",
                        "online": true,
                        "url": "https://arche.univ-lorraine.fr/course/view.php?id=68137"
                    },
                    "rooms": [
                        {
                            "id": 215891,
                            "label": "ENSAM-ME_A_AMPHI_1",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 4792,
                            "displayname": "BOURGET Marjolaine",
                            "email": "marjolaine.bourget@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 96886,
                    "startDateTime": "2023-12-01T15:30:00+01:00",
                    "endDateTime": "2023-12-01T17:30:00+01:00",
                    "course": {
                        "id": "11-156003",
                        "label": "🎥 TD Communication - Management 5AQUA",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 292695,
                            "label": "En direct à distance",
                            "type": "SYNCHRONE",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 9757,
                            "displayname": "DUPUYS Danielle",
                            "email": "danielle.dupuys@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162887,
                            "label": "5AQUA"
                        }
                    ]
                },
                {
                    "id": 125666,
                    "startDateTime": "2023-12-02T07:45:00+01:00",
                    "endDateTime": "2023-12-02T09:45:00+01:00",
                    "course": {
                        "id": "11-123809",
                        "label": "TD Droit IPI4.0/MAPI",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120335,
                            "label": "Technopole_3A41",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 311444,
                            "displayname": "PELLETIER Germain",
                            "email": "germain.pelletier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        },
                        {
                            "id": 275537,
                            "label": "5A MAPI"
                        }
                    ]
                },
                {
                    "id": 201389,
                    "startDateTime": "2023-12-02T07:45:00+01:00",
                    "endDateTime": "2023-12-02T09:45:00+01:00",
                    "course": {
                        "id": "11-158447",
                        "label": "TD Excellence Opérationnelle : Maitrise des procédés",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 342470,
                            "label": "Technopole_1B97",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 198215,
                            "displayname": "BUSSON Baptiste",
                            "email": "baptiste.busson@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162879,
                            "label": "5AMLP"
                        }
                    ]
                },
                {
                    "id": 201862,
                    "startDateTime": "2023-12-02T07:45:00+01:00",
                    "endDateTime": "2023-12-02T09:45:00+01:00",
                    "course": {
                        "id": "11-27544",
                        "label": "CM Prévention des Pannes et Maîtrise des Disponibilités 5AMAI HJC",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201574,
                            "displayname": "BOURGIGNON Vincent",
                            "email": "vincent.bourgignon@sfr.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 187864,
                    "startDateTime": "2023-12-02T07:45:00+01:00",
                    "endDateTime": "2023-12-02T11:45:00+01:00",
                    "course": {
                        "id": "11-189235",
                        "label": "TP Modélisation et optimisation moteur 5ASPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46073,
                            "label": "Technopole_2A21",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 409670,
                            "displayname": "NORMAND Louise",
                            "email": "lnormand99@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 193380,
                    "startDateTime": "2023-12-02T07:45:00+01:00",
                    "endDateTime": "2023-12-02T11:45:00+01:00",
                    "course": {
                        "id": "11-132536",
                        "label": "CM Management intégré 5AQUA TH",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 361520,
                            "label": "Technopole_1A11",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 7907,
                            "displayname": "LAURENT Fabien",
                            "email": "fabien.laurent@live.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        },
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 254100,
                    "startDateTime": "2023-12-02T07:45:00+01:00",
                    "endDateTime": "2023-12-02T11:45:00+01:00",
                    "course": {
                        "id": "11-104241",
                        "label": "CM Lean Supply Chain 5ASCM",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46011,
                            "label": "Technopole_1B24",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 166061,
                            "displayname": "MICHEL Robert",
                            "email": "michel.robert@gmx.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        },
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 201863,
                    "startDateTime": "2023-12-02T09:45:00+01:00",
                    "endDateTime": "2023-12-02T11:45:00+01:00",
                    "course": {
                        "id": "11-27544",
                        "label": "CM Prévention des Pannes et Maîtrise des Disponibilités 5AMAI HJC",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201574,
                            "displayname": "BOURGIGNON Vincent",
                            "email": "vincent.bourgignon@sfr.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 341083,
                    "startDateTime": "2023-12-02T09:45:00+01:00",
                    "endDateTime": "2023-12-02T11:45:00+01:00",
                    "course": {
                        "id": "11-32104",
                        "label": "TD Droit 5A MLP - VEHA",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120335,
                            "label": "Technopole_3A41",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 311444,
                            "displayname": "PELLETIER Germain",
                            "email": "germain.pelletier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162879,
                            "label": "5AMLP"
                        },
                        {
                            "id": 374592,
                            "label": "5AVEHA"
                        }
                    ]
                },
                {
                    "id": 212607,
                    "startDateTime": "2023-12-04T07:45:00+01:00",
                    "endDateTime": "2023-12-04T08:45:00+01:00",
                    "course": {
                        "id": "11-231568",
                        "label": "CM Droit 5AINE",
                        "color": "#1cff4d",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46072,
                            "label": "Technopole_3A40",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 311444,
                            "displayname": "PELLETIER Germain",
                            "email": "germain.pelletier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 190314,
                    "startDateTime": "2023-12-04T07:45:00+01:00",
                    "endDateTime": "2023-12-04T09:45:00+01:00",
                    "course": {
                        "id": "11-123900",
                        "label": "CM Réseaux de terrain",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120307,
                            "label": "Technopole_-1B28",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 198465,
                            "displayname": "LACIEN Amélie",
                            "email": "amelie.lacien@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 194558,
                    "startDateTime": "2023-12-04T07:45:00+01:00",
                    "endDateTime": "2023-12-04T09:45:00+01:00",
                    "course": {
                        "id": "11-228001",
                        "label": "CM Commande et diagnostic des systèmes 5AQUA",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120326,
                            "label": "Technopole_1A05",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162887,
                            "label": "5AQUA"
                        }
                    ]
                },
                {
                    "id": 183672,
                    "startDateTime": "2023-12-04T07:45:00+01:00",
                    "endDateTime": "2023-12-04T11:45:00+01:00",
                    "course": {
                        "id": "11-156622",
                        "label": "TP Projet de conception - Etude de cas CMAO1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46074,
                            "label": "Technopole_2A12/3",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        },
                        {
                            "id": 46075,
                            "label": "Technopole_2A12/2",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 144299,
                            "displayname": "LAKARIM Clarice",
                            "email": "clarice.lakarim@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162844,
                            "label": "5ACMAO1"
                        }
                    ]
                },
                {
                    "id": 184179,
                    "startDateTime": "2023-12-04T07:45:00+01:00",
                    "endDateTime": "2023-12-04T11:45:00+01:00",
                    "course": {
                        "id": "11-251953",
                        "label": "TP Projet de conception - Etude de cas CMAO2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45959,
                            "label": "Technopole_2A12/1",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 153203,
                            "displayname": "SOUCY Simon",
                            "email": "simon.soucy@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162842,
                            "label": "5ACMAO2"
                        }
                    ]
                },
                {
                    "id": 187017,
                    "startDateTime": "2023-12-04T07:45:00+01:00",
                    "endDateTime": "2023-12-04T11:45:00+01:00",
                    "course": {
                        "id": "11-121338",
                        "label": "TP Commande et acquisition du  véhicule 5ASPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45977,
                            "label": "Technopole_-1B26",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134967,
                            "displayname": "BELLEFEUILLE Dwayne",
                            "email": "dwayne.bellefeuille@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 189131,
                    "startDateTime": "2023-12-04T07:45:00+01:00",
                    "endDateTime": "2023-12-04T11:45:00+01:00",
                    "course": {
                        "id": "11-141929",
                        "label": "TP Analyse modale experimentale 5ASPM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 248518,
                            "label": "-1B41/2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 186991,
                            "displayname": "POUCHARD Louis",
                            "email": "louis.pouchard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 230934,
                    "startDateTime": "2023-12-04T07:45:00+01:00",
                    "endDateTime": "2023-12-04T11:45:00+01:00",
                    "course": {
                        "id": "11-231427",
                        "label": "Autonomie - Review of literature for Master's thesis",
                        "color": "#00ff00",
                        "type": "DIVERS",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46007,
                            "label": "Technopole_1B05",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 74463,
                    "startDateTime": "2023-12-04T08:15:00+01:00",
                    "endDateTime": "2023-12-04T09:15:00+01:00",
                    "course": {
                        "id": "11-250942",
                        "label": "CM Modificat° de surface des matériaux : analyse de surface",
                        "color": "#0aff23",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45999,
                            "label": "Technopole_1B68",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 496,
                            "displayname": "BERNARD Nicolas",
                            "email": "nicolas.bernard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275537,
                            "label": "5A MAPI"
                        }
                    ]
                },
                {
                    "id": 341082,
                    "startDateTime": "2023-12-04T08:45:00+01:00",
                    "endDateTime": "2023-12-04T10:45:00+01:00",
                    "course": {
                        "id": "11-32104",
                        "label": "TD Droit 5A MLP - VEHA",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46072,
                            "label": "Technopole_3A40",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 311444,
                            "displayname": "PELLETIER Germain",
                            "email": "germain.pelletier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162879,
                            "label": "5AMLP"
                        },
                        {
                            "id": 374592,
                            "label": "5AVEHA"
                        }
                    ]
                },
                {
                    "id": 192186,
                    "startDateTime": "2023-12-04T08:45:00+01:00",
                    "endDateTime": "2023-12-04T11:45:00+01:00",
                    "course": {
                        "id": "11-140677",
                        "label": "TD La cindynique 3A39",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 63334,
                            "displayname": "Enseignant 1",
                            "email": ""
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 293656,
                    "startDateTime": "2023-12-04T08:45:00+01:00",
                    "endDateTime": "2023-12-04T11:45:00+01:00",
                    "course": {
                        "id": "11-189287",
                        "label": "CM Entreprenariat - Interlocuteurs de l'entreprise 5AINE",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 204518,
                            "displayname": "FLAMAND Felicien",
                            "email": "felicien.flamand@outlook.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 74565,
                    "startDateTime": "2023-12-04T09:15:00+01:00",
                    "endDateTime": "2023-12-04T09:45:00+01:00",
                    "course": {
                        "id": "11-260118",
                        "label": "TD Modificat° de surface des matériaux : analyse de surface",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45999,
                            "label": "Technopole_1B68",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 496,
                            "displayname": "BERNARD Nicolas",
                            "email": "nicolas.bernard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275537,
                            "label": "5A MAPI"
                        }
                    ]
                },
                {
                    "id": 186443,
                    "startDateTime": "2023-12-04T09:45:00+01:00",
                    "endDateTime": "2023-12-04T11:45:00+01:00",
                    "course": {
                        "id": "11-256052",
                        "label": "CM Systèmes de stockage d'énergie 5ANRJ",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 196104,
                    "startDateTime": "2023-12-04T09:45:00+01:00",
                    "endDateTime": "2023-12-04T11:45:00+01:00",
                    "course": {
                        "id": "11-74735",
                        "label": "CM Tribologie - Frottement - Interactions dynamiques",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45999,
                            "label": "Technopole_1B68",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 125534,
                            "displayname": "JARDINE Alphonse",
                            "email": "alphonse.jardine@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275537,
                            "label": "5A MAPI"
                        }
                    ]
                },
                {
                    "id": 200816,
                    "startDateTime": "2023-12-04T09:45:00+01:00",
                    "endDateTime": "2023-12-04T11:45:00+01:00",
                    "course": {
                        "id": "11-189359",
                        "label": "CM Pilotage d'une Supply Chain 5ASCM ML",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46011,
                            "label": "Technopole_1B24",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12437,
                            "displayname": "LEFEBVRE Arthur",
                            "email": "a.lefebvre@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        },
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 190305,
                    "startDateTime": "2023-12-04T10:00:00+01:00",
                    "endDateTime": "2023-12-04T12:00:00+01:00",
                    "course": {
                        "id": "11-123783",
                        "label": "CM Commande des systèmes de production",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 354548,
                            "label": "ENSAM-ME_B_139",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 302765,
                            "displayname": "DUMON Sylvain",
                            "email": "sylvain.dumon@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 228538,
                    "startDateTime": "2023-12-04T11:45:00+01:00",
                    "endDateTime": "2023-12-04T12:45:00+01:00",
                    "course": {
                        "id": "11-192683",
                        "label": "ALL 5A renforcé ECRIRE",
                        "color": "#ffffff",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120320,
                            "label": "Technopole_1A02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 174923,
                            "displayname": "POTTER Harry",
                            "email": "harry.potter@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 185867,
                            "label": "5A ALLEMAND"
                        }
                    ]
                },
                {
                    "id": 86360,
                    "startDateTime": "2023-12-04T13:30:00+01:00",
                    "endDateTime": "2023-12-04T15:30:00+01:00",
                    "course": {
                        "id": "11-250943",
                        "label": "TD Modificat° de surface des matériaux : analyse de surface LE",
                        "color": "#ffff05",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45999,
                            "label": "Technopole_1B68",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 198369,
                            "displayname": "POULET Coralie",
                            "email": "coralie.poulet@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275537,
                            "label": "5A MAPI"
                        }
                    ]
                },
                {
                    "id": 194530,
                    "startDateTime": "2023-12-04T13:30:00+01:00",
                    "endDateTime": "2023-12-04T15:30:00+01:00",
                    "course": {
                        "id": "11-133052",
                        "label": "TD Gestion de la maintenance 5AQUA KL",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120326,
                            "label": "Technopole_1A05",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 7195,
                            "displayname": "SCHNEIDER Isabelle",
                            "email": "isabelle.schneider@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        },
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 210395,
                    "startDateTime": "2023-12-04T13:30:00+01:00",
                    "endDateTime": "2023-12-04T15:30:00+01:00",
                    "course": {
                        "id": "11-48401",
                        "label": "CM Scientific communication",
                        "color": "#00ff2f",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120330,
                            "label": "Technopole_0A64",
                            "type": "Amphithéâtre",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 7493,
                            "displayname": "NATUREL Anne-Marie",
                            "email": "anne-marie.naturel@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 262342,
                    "startDateTime": "2023-12-04T13:30:00+01:00",
                    "endDateTime": "2023-12-04T15:30:00+01:00",
                    "course": {
                        "id": "11-123899",
                        "label": "CM Robotics",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 218406,
                            "label": "ENSAM-ME_A_AMPHI_2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 302765,
                            "displayname": "DUMON Sylvain",
                            "email": "sylvain.dumon@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 185385,
                    "startDateTime": "2023-12-04T13:30:00+01:00",
                    "endDateTime": "2023-12-04T16:30:00+01:00",
                    "course": {
                        "id": "11-257521",
                        "label": "CM Les financements de la R&D&I dans la filière Energie",
                        "color": "#0dff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 299915,
                            "displayname": "CAPALDI Larry",
                            "email": "larry.capaldi@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 200821,
                    "startDateTime": "2023-12-04T13:30:00+01:00",
                    "endDateTime": "2023-12-04T16:30:00+01:00",
                    "course": {
                        "id": "11-233928",
                        "label": "CM Technologies de l'information pour la Supply Chain 5ASCM ML",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45956,
                            "label": "Technopole_1A40",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12437,
                            "displayname": "LEFEBVRE Arthur",
                            "email": "a.lefebvre@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        },
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 185592,
                    "startDateTime": "2023-12-04T13:30:00+01:00",
                    "endDateTime": "2023-12-04T17:30:00+01:00",
                    "course": {
                        "id": "11-251964",
                        "label": "TP Critères de dimensionnement des structures CMAO1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 398293,
                            "displayname": "PARISEAU Olivier",
                            "email": "olivier.pariseau@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162844,
                            "label": "5ACMAO1"
                        }
                    ]
                },
                {
                    "id": 185785,
                    "startDateTime": "2023-12-04T13:30:00+01:00",
                    "endDateTime": "2023-12-04T17:30:00+01:00",
                    "course": {
                        "id": "11-251987",
                        "label": "TP Spécifiations géométriques CMAO2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120307,
                            "label": "Technopole_-1B28",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 198465,
                            "displayname": "LACIEN Amélie",
                            "email": "amelie.lacien@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162842,
                            "label": "5ACMAO2"
                        }
                    ]
                },
                {
                    "id": 188712,
                    "startDateTime": "2023-12-04T13:30:00+01:00",
                    "endDateTime": "2023-12-04T17:30:00+01:00",
                    "course": {
                        "id": "11-141929",
                        "label": "TP Analyse modale experimentale 5ASPM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 248518,
                            "label": "-1B41/2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 186991,
                            "displayname": "POUCHARD Louis",
                            "email": "louis.pouchard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 189411,
                    "startDateTime": "2023-12-04T13:30:00+01:00",
                    "endDateTime": "2023-12-04T17:30:00+01:00",
                    "course": {
                        "id": "11-81576",
                        "label": "TP Simulation d'écoulements SMP1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45955,
                            "label": "Technopole_1A39",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 144298,
                            "displayname": "LATOURELLE Charlyne",
                            "email": "charlyne.latourelle@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 192187,
                    "startDateTime": "2023-12-04T13:30:00+01:00",
                    "endDateTime": "2023-12-04T17:30:00+01:00",
                    "course": {
                        "id": "11-140677",
                        "label": "TD La cindynique 3A39",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 63334,
                            "displayname": "Enseignant 1",
                            "email": ""
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 229893,
                    "startDateTime": "2023-12-04T13:30:00+01:00",
                    "endDateTime": "2023-12-04T17:30:00+01:00",
                    "course": {
                        "id": "11-50227",
                        "label": "TP Chaine de traction électrique",
                        "color": "#05ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45952,
                            "label": "Technopole_1A36",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 169249,
                    "startDateTime": "2023-12-04T15:30:00+01:00",
                    "endDateTime": "2023-12-04T17:30:00+01:00",
                    "course": {
                        "id": "11-258836",
                        "label": "CM Micromécanique des milieux hétérogènes",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45999,
                            "label": "Technopole_1B68",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 167654,
                            "displayname": "FORTIER Astrid",
                            "email": "astrid.fortier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275537,
                            "label": "5A MAPI"
                        }
                    ]
                },
                {
                    "id": 194532,
                    "startDateTime": "2023-12-04T15:30:00+01:00",
                    "endDateTime": "2023-12-04T17:30:00+01:00",
                    "course": {
                        "id": "11-133856",
                        "label": "TD Management de projet",
                        "color": "#fff708",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 162125,
                            "label": "Technopole_2A26",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 510,
                            "displayname": "CHATIGNY Sébastien",
                            "email": "sebastien.chatigny@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162887,
                            "label": "5AQUA"
                        }
                    ]
                },
                {
                    "id": 294969,
                    "startDateTime": "2023-12-05T07:45:00+01:00",
                    "endDateTime": "2023-12-05T08:45:00+01:00",
                    "course": {
                        "id": "11-189288",
                        "label": "TD Entreprenariat - Interlocuteurs de l'entreprise 5AINE",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201580,
                            "displayname": "WAGNER Benjamin",
                            "email": "benwagner06@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 169058,
                    "startDateTime": "2023-12-05T07:45:00+01:00",
                    "endDateTime": "2023-12-05T09:45:00+01:00",
                    "course": {
                        "id": "11-258836",
                        "label": "CM Micromécanique des milieux hétérogènes",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45999,
                            "label": "Technopole_1B68",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 167654,
                            "displayname": "FORTIER Astrid",
                            "email": "astrid.fortier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275537,
                            "label": "5A MAPI"
                        }
                    ]
                },
                {
                    "id": 190326,
                    "startDateTime": "2023-12-05T07:45:00+01:00",
                    "endDateTime": "2023-12-05T09:45:00+01:00",
                    "course": {
                        "id": "11-124150",
                        "label": "TD Intégration et applications de la robotique",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45954,
                            "label": "Technopole_1A38",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 302765,
                            "displayname": "DUMON Sylvain",
                            "email": "sylvain.dumon@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 230961,
                    "startDateTime": "2023-12-05T07:45:00+01:00",
                    "endDateTime": "2023-12-05T09:45:00+01:00",
                    "course": {
                        "id": "11-122045",
                        "label": "CM Mechanical behaviour of biological tissues",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46007,
                            "label": "Technopole_1B05",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168226,
                            "displayname": "FAURE Jacques",
                            "email": "jacques.faure@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 35472,
                    "startDateTime": "2023-12-05T07:45:00+01:00",
                    "endDateTime": "2023-12-05T11:45:00+01:00",
                    "course": {
                        "id": "11-251998",
                        "label": "TD Communication Management CMAO",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45982,
                            "label": "Technopole_-1B68",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 9757,
                            "displayname": "DUPUYS Danielle",
                            "email": "danielle.dupuys@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162840,
                            "label": "5ACMAO"
                        }
                    ]
                },
                {
                    "id": 159500,
                    "startDateTime": "2023-12-05T07:45:00+01:00",
                    "endDateTime": "2023-12-05T11:45:00+01:00",
                    "course": {
                        "id": "11-189351",
                        "label": "TP Gestion de projets 5ASCM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45955,
                            "label": "Technopole_1A39",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 510,
                            "displayname": "CHATIGNY Sébastien",
                            "email": "sebastien.chatigny@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        }
                    ]
                },
                {
                    "id": 187012,
                    "startDateTime": "2023-12-05T07:45:00+01:00",
                    "endDateTime": "2023-12-05T11:45:00+01:00",
                    "course": {
                        "id": "11-121055",
                        "label": "TP Commande et acquisition du  véhicule 5ASPM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45977,
                            "label": "Technopole_-1B26",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134967,
                            "displayname": "BELLEFEUILLE Dwayne",
                            "email": "dwayne.bellefeuille@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 188828,
                    "startDateTime": "2023-12-05T07:45:00+01:00",
                    "endDateTime": "2023-12-05T11:45:00+01:00",
                    "course": {
                        "id": "11-141502",
                        "label": "TP Analyse modale experimentale 5ASPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 248518,
                            "label": "-1B41/2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 186991,
                            "displayname": "POUCHARD Louis",
                            "email": "louis.pouchard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 192785,
                    "startDateTime": "2023-12-05T07:45:00+01:00",
                    "endDateTime": "2023-12-05T11:45:00+01:00",
                    "course": {
                        "id": "11-294417",
                        "label": "CM Management du risque et des hommes, Fact. humain et pratique 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 308628,
                    "startDateTime": "2023-12-05T08:00:00+01:00",
                    "endDateTime": "2023-12-05T10:00:00+01:00",
                    "course": {
                        "id": "11-50309",
                        "label": "CM Pile à Combustible et Photovoltaïque",
                        "color": "#08ff10",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46006,
                            "label": "Technopole_1B04",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 297,
                            "displayname": "ROUX Lilian",
                            "email": "lilian.roux@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374592,
                            "label": "5AVEHA"
                        }
                    ]
                },
                {
                    "id": 294808,
                    "startDateTime": "2023-12-05T08:45:00+01:00",
                    "endDateTime": "2023-12-05T10:45:00+01:00",
                    "course": {
                        "id": "11-231062",
                        "label": "CM Entreprenariat - Comptabilité Finances 5AINE",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 281452,
                            "displayname": "MAROIS Simon",
                            "email": "simon.marois58@wanadoo.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 186034,
                    "startDateTime": "2023-12-05T09:45:00+01:00",
                    "endDateTime": "2023-12-05T11:45:00+01:00",
                    "course": {
                        "id": "11-111453",
                        "label": "TP Modélisation des systèmes énergétiques - Thermoptim NRJ1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45960,
                            "label": "Technopole_2A19/1",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 144299,
                            "displayname": "LAKARIM Clarice",
                            "email": "clarice.lakarim@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162857,
                            "label": "5ANRJ1"
                        }
                    ]
                },
                {
                    "id": 190308,
                    "startDateTime": "2023-12-05T09:45:00+01:00",
                    "endDateTime": "2023-12-05T11:45:00+01:00",
                    "course": {
                        "id": "11-123837",
                        "label": "CM Intégration et applications de la robotique",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45954,
                            "label": "Technopole_1A38",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 302765,
                            "displayname": "DUMON Sylvain",
                            "email": "sylvain.dumon@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 190741,
                    "startDateTime": "2023-12-05T09:45:00+01:00",
                    "endDateTime": "2023-12-05T11:45:00+01:00",
                    "course": {
                        "id": "11-260118",
                        "label": "TD Modificat° de surface des matériaux : analyse de surface",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45999,
                            "label": "Technopole_1B68",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 496,
                            "displayname": "BERNARD Nicolas",
                            "email": "nicolas.bernard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275537,
                            "label": "5A MAPI"
                        }
                    ]
                },
                {
                    "id": 194564,
                    "startDateTime": "2023-12-05T09:45:00+01:00",
                    "endDateTime": "2023-12-05T11:45:00+01:00",
                    "course": {
                        "id": "11-228000",
                        "label": "TD Commande et diagnostic des systèmes 5AQUA",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120326,
                            "label": "Technopole_1A05",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162887,
                            "label": "5AQUA"
                        }
                    ]
                },
                {
                    "id": 230935,
                    "startDateTime": "2023-12-05T09:45:00+01:00",
                    "endDateTime": "2023-12-05T11:45:00+01:00",
                    "course": {
                        "id": "11-48167",
                        "label": "TD Conferences and seminars",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46007,
                            "label": "Technopole_1B05",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 398293,
                            "displayname": "PARISEAU Olivier",
                            "email": "olivier.pariseau@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 102415,
                    "startDateTime": "2023-12-05T13:30:00+01:00",
                    "endDateTime": "2023-12-05T15:30:00+01:00",
                    "course": {
                        "id": "11-34013",
                        "label": "CM Moteurs à Combustion Interne & Défis Environnementaux",
                        "color": "#08ff10",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46006,
                            "label": "Technopole_1B04",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 125534,
                            "displayname": "JARDINE Alphonse",
                            "email": "alphonse.jardine@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374592,
                            "label": "5AVEHA"
                        }
                    ]
                },
                {
                    "id": 185686,
                    "startDateTime": "2023-12-05T13:30:00+01:00",
                    "endDateTime": "2023-12-05T15:30:00+01:00",
                    "course": {
                        "id": "11-251972",
                        "label": "CM Techniques expérimentales",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120332,
                            "label": "Technopole_0A69",
                            "type": "Amphithéâtre",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 125533,
                            "displayname": "LEPAGE Karim",
                            "email": "karim.lepage@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162840,
                            "label": "5ACMAO"
                        },
                        {
                            "id": 162846,
                            "label": "5ASPM"
                        }
                    ]
                },
                {
                    "id": 194513,
                    "startDateTime": "2023-12-05T13:30:00+01:00",
                    "endDateTime": "2023-12-05T15:30:00+01:00",
                    "course": {
                        "id": "11-291095",
                        "label": "TD Modélisation et analyse des processus industriels 5AQUA",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120326,
                            "label": "Technopole_1A05",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 10934,
                            "displayname": "GROSJEAN Lucie",
                            "email": "lucie.grosjean@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        },
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 200833,
                    "startDateTime": "2023-12-05T13:30:00+01:00",
                    "endDateTime": "2023-12-05T15:30:00+01:00",
                    "course": {
                        "id": "11-233929",
                        "label": "TD Technologies de l'information pour la Supply Chain 5ASCM ML",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45952,
                            "label": "Technopole_1A36",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12437,
                            "displayname": "LEFEBVRE Arthur",
                            "email": "a.lefebvre@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        },
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 278755,
                    "startDateTime": "2023-12-05T13:30:00+01:00",
                    "endDateTime": "2023-12-05T15:30:00+01:00",
                    "course": {
                        "id": "11-124310",
                        "label": "TD Techniques d'optimisation",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 218406,
                            "label": "ENSAM-ME_A_AMPHI_2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 510,
                            "displayname": "CHATIGNY Sébastien",
                            "email": "sebastien.chatigny@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 271361,
                    "startDateTime": "2023-12-05T13:30:00+01:00",
                    "endDateTime": "2023-12-05T16:30:00+01:00",
                    "course": {
                        "id": "11-189290",
                        "label": "CM Entreprenariat - Aspects Pratiques 5AINE",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 392088,
                            "displayname": "DELONG Adam",
                            "email": "adam.delong@tylop.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 185488,
                    "startDateTime": "2023-12-05T13:30:00+01:00",
                    "endDateTime": "2023-12-05T17:30:00+01:00",
                    "course": {
                        "id": "11-257632",
                        "label": "TD Performance énergétique des bâtiments 5ANRJ",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 235498,
                            "displayname": "LAMARRE Lucas",
                            "email": "lucas.lamarre@orange.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 192841,
                    "startDateTime": "2023-12-05T13:30:00+01:00",
                    "endDateTime": "2023-12-05T17:30:00+01:00",
                    "course": {
                        "id": "11-294417",
                        "label": "CM Management du risque et des hommes, Fact. humain et pratique 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 349110,
                    "startDateTime": "2023-12-05T13:30:00+01:00",
                    "endDateTime": "2023-12-05T17:30:00+01:00",
                    "course": {
                        "id": "11-90476",
                        "label": "TP Critères de Dimensionnement des structures MAPI1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134965,
                            "displayname": "ARNOUX Violette",
                            "email": "violette.arnoux@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275526,
                            "label": "5A MAPI 1"
                        }
                    ]
                },
                {
                    "id": 156579,
                    "startDateTime": "2023-12-05T15:30:00+01:00",
                    "endDateTime": "2023-12-05T17:30:00+01:00",
                    "course": {
                        "id": "11-251928",
                        "label": "CM Techniques d'innovation - TRIZ",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 162125,
                            "label": "Technopole_2A26",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11974,
                            "displayname": "PETIT Anne-Marie",
                            "email": "anne-marie.petit@laposte.net"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162840,
                            "label": "5ACMAO"
                        }
                    ]
                },
                {
                    "id": 349335,
                    "startDateTime": "2023-12-05T15:30:00+01:00",
                    "endDateTime": "2023-12-05T17:30:00+01:00",
                    "course": {
                        "id": "11-123856",
                        "label": "UE1 Methods, models for integration",
                        "color": "#00ff00",
                        "type": "GRACIEUX",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 214550,
                            "label": "ENSAM-ME_B_140",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 63334,
                            "displayname": "Enseignant 1",
                            "email": ""
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 208585,
                    "startDateTime": "2023-12-06T07:45:00+01:00",
                    "endDateTime": "2023-12-06T09:45:00+01:00",
                    "course": {
                        "id": "11-47612",
                        "label": "TD Communication - Management MAPI - NRJ",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45982,
                            "label": "Technopole_-1B68",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 9757,
                            "displayname": "DUPUYS Danielle",
                            "email": "danielle.dupuys@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        },
                        {
                            "id": 275537,
                            "label": "5A MAPI"
                        }
                    ]
                },
                {
                    "id": 230986,
                    "startDateTime": "2023-12-06T07:45:00+01:00",
                    "endDateTime": "2023-12-06T09:45:00+01:00",
                    "course": {
                        "id": "11-122814",
                        "label": "TP Review of literature for Master's thesis",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45953,
                            "label": "Technopole_1A37",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168224,
                            "displayname": "PRUNEL Lina",
                            "email": "lina.prunel@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 85246,
                    "startDateTime": "2023-12-06T07:45:00+01:00",
                    "endDateTime": "2023-12-06T11:45:00+01:00",
                    "course": {
                        "id": "11-122577",
                        "label": "TP Intégration et applications de la robotique 1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": true,
                        "url": "https://arche.univ-lorraine.fr/course/view.php?id=68341"
                    },
                    "rooms": [
                        {
                            "id": 45976,
                            "label": "Technopole_-1B27",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 339077,
                            "displayname": "TRUFFEAU Jacques",
                            "email": "jacques.truffeau@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 219147,
                            "label": "5A IP4.0 1"
                        }
                    ]
                },
                {
                    "id": 185596,
                    "startDateTime": "2023-12-06T07:45:00+01:00",
                    "endDateTime": "2023-12-06T11:45:00+01:00",
                    "course": {
                        "id": "11-251963",
                        "label": "TP Critères de dimensionnement des structures CMAO2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 339172,
                            "displayname": "GARNIER Hugo",
                            "email": "hugo.garnier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162842,
                            "label": "5ACMAO2"
                        }
                    ]
                },
                {
                    "id": 185821,
                    "startDateTime": "2023-12-06T07:45:00+01:00",
                    "endDateTime": "2023-12-06T11:45:00+01:00",
                    "course": {
                        "id": "11-251986",
                        "label": "TP Spécifiations géométriques CMAO1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120307,
                            "label": "Technopole_-1B28",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 198465,
                            "displayname": "LACIEN Amélie",
                            "email": "amelie.lacien@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162844,
                            "label": "5ACMAO1"
                        }
                    ]
                },
                {
                    "id": 192850,
                    "startDateTime": "2023-12-06T07:45:00+01:00",
                    "endDateTime": "2023-12-06T11:45:00+01:00",
                    "course": {
                        "id": "11-294417",
                        "label": "CM Management du risque et des hommes, Fact. humain et pratique 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 194545,
                    "startDateTime": "2023-12-06T07:45:00+01:00",
                    "endDateTime": "2023-12-06T11:45:00+01:00",
                    "course": {
                        "id": "11-133877",
                        "label": "TP Management de projet QUA 1",
                        "color": "#05fffb",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45955,
                            "label": "Technopole_1A39",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 510,
                            "displayname": "CHATIGNY Sébastien",
                            "email": "sebastien.chatigny@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        }
                    ]
                },
                {
                    "id": 200723,
                    "startDateTime": "2023-12-06T07:45:00+01:00",
                    "endDateTime": "2023-12-06T11:45:00+01:00",
                    "course": {
                        "id": "11-119722",
                        "label": "TP Pilotage d'une Supply Chain 5ASCM2 DA",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46011,
                            "label": "Technopole_1B24",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11702,
                            "displayname": "DESROSIERS Dwayne",
                            "email": "dwayne.desrosiers@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 201865,
                    "startDateTime": "2023-12-06T07:45:00+01:00",
                    "endDateTime": "2023-12-06T11:45:00+01:00",
                    "course": {
                        "id": "11-266242",
                        "label": "TP Fiabilité & Politiques de Maintenance et Visio-surveillance 5AMAI1 BM",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45956,
                            "label": "Technopole_1A40",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193004,
                            "label": "5A MAI1"
                        }
                    ]
                },
                {
                    "id": 31131,
                    "startDateTime": "2023-12-06T08:45:00+01:00",
                    "endDateTime": "2023-12-06T11:45:00+01:00",
                    "course": {
                        "id": "11-231568",
                        "label": "CM Droit 5AINE",
                        "color": "#1cff4d",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46072,
                            "label": "Technopole_3A40",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 311444,
                            "displayname": "PELLETIER Germain",
                            "email": "germain.pelletier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 65661,
                    "startDateTime": "2023-12-06T09:45:00+01:00",
                    "endDateTime": "2023-12-06T11:45:00+01:00",
                    "course": {
                        "id": "11-236205",
                        "label": "TD Critères de dimensionnement des structures",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120334,
                            "label": "Technopole_0A65",
                            "type": "Amphithéâtre",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134965,
                            "displayname": "ARNOUX Violette",
                            "email": "violette.arnoux@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162846,
                            "label": "5ASPM"
                        },
                        {
                            "id": 275537,
                            "label": "5A MAPI"
                        }
                    ]
                },
                {
                    "id": 186430,
                    "startDateTime": "2023-12-06T09:45:00+01:00",
                    "endDateTime": "2023-12-06T11:45:00+01:00",
                    "course": {
                        "id": "11-258288",
                        "label": "TD Cycles industriels thermodynamiques",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 167656,
                            "displayname": "DUVAL René",
                            "email": "rene.duval@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 231043,
                    "startDateTime": "2023-12-06T09:45:00+01:00",
                    "endDateTime": "2023-12-06T11:45:00+01:00",
                    "course": {
                        "id": "11-48167",
                        "label": "TD Conferences and seminars",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46007,
                            "label": "Technopole_1B05",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 398293,
                            "displayname": "PARISEAU Olivier",
                            "email": "olivier.pariseau@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 56832,
                    "startDateTime": "2023-12-06T12:30:00+01:00",
                    "endDateTime": "2023-12-06T13:30:00+01:00",
                    "course": {
                        "id": "11-103829",
                        "label": "ESP 5A renforcé ECRIRE",
                        "color": "#ffffff",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120320,
                            "label": "Technopole_1A02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168115,
                            "displayname": "GAUTIER Juliette",
                            "email": "juliette.gautier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 205266,
                            "label": "5A ESPAGNOL"
                        }
                    ]
                },
                {
                    "id": 152706,
                    "startDateTime": "2023-12-06T13:30:00+01:00",
                    "endDateTime": "2023-12-06T15:30:00+01:00",
                    "course": {
                        "id": "11-286970",
                        "label": "EXAMEN Production Management",
                        "color": "#00ff00",
                        "type": "EXAMEN",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 215891,
                            "label": "ENSAM-ME_A_AMPHI_1",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 1061,
                            "displayname": "JACKSON Alexis",
                            "email": "alexis.jackson@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 200756,
                    "startDateTime": "2023-12-06T13:30:00+01:00",
                    "endDateTime": "2023-12-06T15:30:00+01:00",
                    "course": {
                        "id": "11-234508",
                        "label": "CM Pilotage d'une Supply Chain 5ASCM DA",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46011,
                            "label": "Technopole_1B24",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11702,
                            "displayname": "DESROSIERS Dwayne",
                            "email": "dwayne.desrosiers@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        },
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 297957,
                    "startDateTime": "2023-12-06T13:30:00+01:00",
                    "endDateTime": "2023-12-06T15:30:00+01:00",
                    "course": {
                        "id": "11-257634",
                        "label": "CM Management du développement durable 5ANRJ",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 241,
                            "displayname": "PAULIN Victor",
                            "email": "victor.paulin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 188602,
                    "startDateTime": "2023-12-06T13:30:00+01:00",
                    "endDateTime": "2023-12-06T17:30:00+01:00",
                    "course": {
                        "id": "11-141040",
                        "label": "TP Critères de dimensionnement des structures 5ASPM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45959,
                            "label": "Technopole_2A12/1",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134965,
                            "displayname": "ARNOUX Violette",
                            "email": "violette.arnoux@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 193452,
                    "startDateTime": "2023-12-06T13:30:00+01:00",
                    "endDateTime": "2023-12-06T17:30:00+01:00",
                    "course": {
                        "id": "11-294380",
                        "label": "CM Maîtrise des conséquences 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 194552,
                    "startDateTime": "2023-12-06T13:30:00+01:00",
                    "endDateTime": "2023-12-06T17:30:00+01:00",
                    "course": {
                        "id": "11-133865",
                        "label": "TP Management de projet QUA2",
                        "color": "#05fffb",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45955,
                            "label": "Technopole_1A39",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 510,
                            "displayname": "CHATIGNY Sébastien",
                            "email": "sebastien.chatigny@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 229956,
                    "startDateTime": "2023-12-06T13:30:00+01:00",
                    "endDateTime": "2023-12-06T17:30:00+01:00",
                    "course": {
                        "id": "11-50227",
                        "label": "TP Chaine de traction électrique",
                        "color": "#05ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45953,
                            "label": "Technopole_1A37",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 231047,
                    "startDateTime": "2023-12-06T13:30:00+01:00",
                    "endDateTime": "2023-12-06T17:30:00+01:00",
                    "course": {
                        "id": "11-121448",
                        "label": "TP CAD Project",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120192,
                            "label": "Technopole_-1B47/2",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168226,
                            "displayname": "FAURE Jacques",
                            "email": "jacques.faure@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 81329,
                    "startDateTime": "2023-12-06T15:30:00+01:00",
                    "endDateTime": "2023-12-06T17:30:00+01:00",
                    "course": {
                        "id": "11-305424",
                        "label": "FLE 5A renforcé GP1",
                        "color": "#fffb05",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46012,
                            "label": "Technopole_3A38",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 144297,
                            "displayname": "LEMOINE Tanguy",
                            "email": "tanguy.lemoine@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 205267,
                            "label": "5A FLE G1"
                        }
                    ]
                },
                {
                    "id": 260483,
                    "startDateTime": "2023-12-06T18:00:00+01:00",
                    "endDateTime": "2023-12-06T19:00:00+01:00",
                    "course": {
                        "id": "11-298272",
                        "label": "TD Stratégie",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46011,
                            "label": "Technopole_1B24",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 29670,
                            "displayname": "PICARD Louis",
                            "email": "louis.picard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        },
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 134461,
                    "startDateTime": "2023-12-07T07:45:00+01:00",
                    "endDateTime": "2023-12-07T09:45:00+01:00",
                    "course": {
                        "id": "11-251928",
                        "label": "CM Techniques d'innovation - TRIZ",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 361520,
                            "label": "Technopole_1A11",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11974,
                            "displayname": "PETIT Anne-Marie",
                            "email": "anne-marie.petit@laposte.net"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162840,
                            "label": "5ACMAO"
                        }
                    ]
                },
                {
                    "id": 189985,
                    "startDateTime": "2023-12-07T07:45:00+01:00",
                    "endDateTime": "2023-12-07T09:45:00+01:00",
                    "course": {
                        "id": "11-189238",
                        "label": "TP Développement monoplace 5ASPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46001,
                            "label": "Technopole_1B95",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 929,
                            "displayname": "RENAUD Baptiste",
                            "email": "baptiste.renaud@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 79594,
                    "startDateTime": "2023-12-07T07:45:00+01:00",
                    "endDateTime": "2023-12-07T11:45:00+01:00",
                    "course": {
                        "id": "11-122230",
                        "label": "TP Techniques d'optimisation 1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120319,
                            "label": "Technopole_-1B36",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 229668,
                            "displayname": "CLERC Axel",
                            "email": "axel.clerc@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 219147,
                            "label": "5A IP4.0 1"
                        }
                    ]
                },
                {
                    "id": 189211,
                    "startDateTime": "2023-12-07T07:45:00+01:00",
                    "endDateTime": "2023-12-07T11:45:00+01:00",
                    "course": {
                        "id": "11-141955",
                        "label": "TP Techniques expérimentales 5ASPM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 96036,
                            "label": "Technopole_-1B41/1",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 125533,
                            "displayname": "LEPAGE Karim",
                            "email": "karim.lepage@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 229959,
                    "startDateTime": "2023-12-07T07:45:00+01:00",
                    "endDateTime": "2023-12-07T11:45:00+01:00",
                    "course": {
                        "id": "11-50138",
                        "label": "TP Projet Développement ",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45956,
                            "label": "Technopole_1A40",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 309663,
                    "startDateTime": "2023-12-07T07:45:00+01:00",
                    "endDateTime": "2023-12-07T11:45:00+01:00",
                    "course": {
                        "id": "11-35350",
                        "label": "TP Outils de l'Ingénierie de Maintenance 5MAI 1 HK",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46078,
                            "label": "Technopole_2A19/2",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 144299,
                            "displayname": "LAKARIM Clarice",
                            "email": "clarice.lakarim@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193004,
                            "label": "5A MAI1"
                        }
                    ]
                },
                {
                    "id": 156569,
                    "startDateTime": "2023-12-07T09:45:00+01:00",
                    "endDateTime": "2023-12-07T11:45:00+01:00",
                    "course": {
                        "id": "11-251928",
                        "label": "CM Techniques d'innovation - TRIZ",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 361520,
                            "label": "Technopole_1A11",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11974,
                            "displayname": "PETIT Anne-Marie",
                            "email": "anne-marie.petit@laposte.net"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162840,
                            "label": "5ACMAO"
                        }
                    ]
                },
                {
                    "id": 185670,
                    "startDateTime": "2023-12-07T09:45:00+01:00",
                    "endDateTime": "2023-12-07T11:45:00+01:00",
                    "course": {
                        "id": "11-257634",
                        "label": "CM Management du développement durable 5ANRJ",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 241,
                            "displayname": "PAULIN Victor",
                            "email": "victor.paulin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 231059,
                    "startDateTime": "2023-12-07T09:45:00+01:00",
                    "endDateTime": "2023-12-07T11:45:00+01:00",
                    "course": {
                        "id": "11-157434",
                        "label": "EXAMEN patient specific FE",
                        "color": "#ff0000",
                        "type": "EXAMEN",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45996,
                            "label": "Technopole_1A08",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168224,
                            "displayname": "PRUNEL Lina",
                            "email": "lina.prunel@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 22243,
                    "startDateTime": "2023-12-07T13:30:00+01:00",
                    "endDateTime": "2023-12-07T16:00:00+01:00",
                    "course": {
                        "id": "11-127201",
                        "label": "LINGUASKILL 5A",
                        "color": "#ffffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45955,
                            "label": "Technopole_1A39",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        },
                        {
                            "id": 45956,
                            "label": "Technopole_1A40",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 123580,
                            "displayname": "WILLIS Bruce",
                            "email": "bruce.willis@univ-lorraine.fr"
                        },
                        {
                            "id": 204316,
                            "displayname": "BLANCHARD Fabiene",
                            "email": "fabiene.blanchard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162838,
                            "label": "5A"
                        }
                    ]
                },
                {
                    "id": 80597,
                    "startDateTime": "2023-12-07T16:30:00+01:00",
                    "endDateTime": "2023-12-07T18:30:00+01:00",
                    "course": {
                        "id": "11-305424",
                        "label": "FLE 5A renforcé GP1",
                        "color": "#fffb05",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120324,
                            "label": "Technopole_1A04",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 144297,
                            "displayname": "LEMOINE Tanguy",
                            "email": "tanguy.lemoine@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 205267,
                            "label": "5A FLE G1"
                        }
                    ]
                },
                {
                    "id": 193448,
                    "startDateTime": "2023-12-08T07:45:00+01:00",
                    "endDateTime": "2023-12-08T09:45:00+01:00",
                    "course": {
                        "id": "11-294380",
                        "label": "CM Maîtrise des conséquences 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 185395,
                    "startDateTime": "2023-12-08T07:45:00+01:00",
                    "endDateTime": "2023-12-08T11:45:00+01:00",
                    "course": {
                        "id": "11-251971",
                        "label": "TP Analyse modale expérimentale CMAO1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 248518,
                            "label": "-1B41/2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 186991,
                            "displayname": "POUCHARD Louis",
                            "email": "louis.pouchard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162844,
                            "label": "5ACMAO1"
                        }
                    ]
                },
                {
                    "id": 189205,
                    "startDateTime": "2023-12-08T07:45:00+01:00",
                    "endDateTime": "2023-12-08T11:45:00+01:00",
                    "course": {
                        "id": "11-141954",
                        "label": "TP Techniques expérimentales 5ASPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 96036,
                            "label": "Technopole_-1B41/1",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 125533,
                            "displayname": "LEPAGE Karim",
                            "email": "karim.lepage@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 191817,
                    "startDateTime": "2023-12-08T07:45:00+01:00",
                    "endDateTime": "2023-12-08T11:45:00+01:00",
                    "course": {
                        "id": "11-140125",
                        "label": "TP Excellence Opérationnelle : Maitrise des procédés FD",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 339068,
                            "label": "Technopole_-1B67",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 198215,
                            "displayname": "BUSSON Baptiste",
                            "email": "baptiste.busson@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162879,
                            "label": "5AMLP"
                        }
                    ]
                },
                {
                    "id": 193450,
                    "startDateTime": "2023-12-08T07:45:00+01:00",
                    "endDateTime": "2023-12-08T11:45:00+01:00",
                    "course": {
                        "id": "11-132536",
                        "label": "CM Management intégré 5AQUA TH",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 361520,
                            "label": "Technopole_1A11",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 7907,
                            "displayname": "LAURENT Fabien",
                            "email": "fabien.laurent@live.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        },
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 201870,
                    "startDateTime": "2023-12-08T07:45:00+01:00",
                    "endDateTime": "2023-12-08T11:45:00+01:00",
                    "course": {
                        "id": "11-138096",
                        "label": "TD Gestion et Budget de la Maintenance 5AMAI DD",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 350923,
                            "displayname": "FOLY Bruno",
                            "email": "bruno.foly@bbox.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 231064,
                    "startDateTime": "2023-12-08T07:45:00+01:00",
                    "endDateTime": "2023-12-08T11:45:00+01:00",
                    "course": {
                        "id": "11-228952",
                        "label": "TP Patient-specific FE modeling",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46075,
                            "label": "Technopole_2A12/2",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134965,
                            "displayname": "ARNOUX Violette",
                            "email": "violette.arnoux@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 229962,
                    "startDateTime": "2023-12-08T08:00:00+01:00",
                    "endDateTime": "2023-12-08T12:00:00+01:00",
                    "course": {
                        "id": "11-50310",
                        "label": "TP Pile à Combustible et Photovoltaïque",
                        "color": "#00ffee",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 297,
                            "displayname": "ROUX Lilian",
                            "email": "lilian.roux@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 240560,
                    "startDateTime": "2023-12-08T08:45:00+01:00",
                    "endDateTime": "2023-12-08T11:45:00+01:00",
                    "course": {
                        "id": "11-189291",
                        "label": "TD Entreprenariat - Aspects Pratiques 5AINE",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 5456,
                            "displayname": "FARMER Hervé",
                            "email": "herve.farmer@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 184834,
                    "startDateTime": "2023-12-08T09:45:00+01:00",
                    "endDateTime": "2023-12-08T11:45:00+01:00",
                    "course": {
                        "id": "11-258295",
                        "label": "CM Conférences - filières nucléaire, pétrole, gaz 5ANRJ",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 141507,
                            "displayname": "Enseignant 10",
                            "email": ""
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 189990,
                    "startDateTime": "2023-12-08T09:45:00+01:00",
                    "endDateTime": "2023-12-08T11:45:00+01:00",
                    "course": {
                        "id": "11-142134",
                        "label": "TP Développement monoplace 5ASPM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46001,
                            "label": "Technopole_1B95",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 929,
                            "displayname": "RENAUD Baptiste",
                            "email": "baptiste.renaud@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 193472,
                    "startDateTime": "2023-12-08T09:45:00+01:00",
                    "endDateTime": "2023-12-08T11:45:00+01:00",
                    "course": {
                        "id": "11-136029",
                        "label": "CM Contexte sociétal 3A39",
                        "color": "#21ff37",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 186498,
                    "startDateTime": "2023-12-08T13:30:00+01:00",
                    "endDateTime": "2023-12-08T15:30:00+01:00",
                    "course": {
                        "id": "11-239287",
                        "label": "CM Mécanismes de déformation et microstructures FY",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45999,
                            "label": "Technopole_1B68",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 7493,
                            "displayname": "NATUREL Anne-Marie",
                            "email": "anne-marie.naturel@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275537,
                            "label": "5A MAPI"
                        }
                    ]
                },
                {
                    "id": 191203,
                    "startDateTime": "2023-12-08T13:30:00+01:00",
                    "endDateTime": "2023-12-08T15:30:00+01:00",
                    "course": {
                        "id": "11-189240",
                        "label": "TD Ergonomie 5AMLP FG",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 342470,
                            "label": "Technopole_1B97",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 198519,
                            "displayname": "LAVOIX Francis",
                            "email": "francis.lavoix@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162879,
                            "label": "5AMLP"
                        }
                    ]
                },
                {
                    "id": 185376,
                    "startDateTime": "2023-12-08T13:30:00+01:00",
                    "endDateTime": "2023-12-08T16:30:00+01:00",
                    "course": {
                        "id": "11-257523",
                        "label": "CM Les filières éolienne et solaire 5ANRJ",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 229654,
                            "displayname": "DUTRONC Blaise",
                            "email": "blaise.dutronc@tgb-societe.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 271701,
                    "startDateTime": "2023-12-08T13:30:00+01:00",
                    "endDateTime": "2023-12-08T16:30:00+01:00",
                    "course": {
                        "id": "11-189293",
                        "label": "CM Entreprenariat - Hygiène Sécurité Psychologie 5AINE",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 204513,
                            "displayname": "RICHARD Daniel",
                            "email": "daniel.richard@laposte.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 185531,
                    "startDateTime": "2023-12-08T13:30:00+01:00",
                    "endDateTime": "2023-12-08T17:30:00+01:00",
                    "course": {
                        "id": "11-83732",
                        "label": "TP Mise en oeuvre des matériaux composites SPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45988,
                            "label": "Technopole_-1BMP",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 302884,
                            "displayname": "FONTAINE Elodie",
                            "email": "elodie.fontaine@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 186325,
                    "startDateTime": "2023-12-08T13:30:00+01:00",
                    "endDateTime": "2023-12-08T17:30:00+01:00",
                    "course": {
                        "id": "11-56221",
                        "label": "CM Maillage avancé et optimisation CMAO",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201589,
                            "displayname": "JACQUIOT France",
                            "email": "france.jacquiot@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162842,
                            "label": "5ACMAO2"
                        },
                        {
                            "id": 162844,
                            "label": "5ACMAO1"
                        }
                    ]
                },
                {
                    "id": 189419,
                    "startDateTime": "2023-12-08T13:30:00+01:00",
                    "endDateTime": "2023-12-08T17:30:00+01:00",
                    "course": {
                        "id": "11-81578",
                        "label": "TP Simulation d'écoulements SMP2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45954,
                            "label": "Technopole_1A38",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168225,
                            "displayname": "LECLERC Dominique",
                            "email": "dominique.leclerc@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 193458,
                    "startDateTime": "2023-12-08T13:30:00+01:00",
                    "endDateTime": "2023-12-08T17:30:00+01:00",
                    "course": {
                        "id": "11-132536",
                        "label": "CM Management intégré 5AQUA TH",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 361520,
                            "label": "Technopole_1A11",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 7907,
                            "displayname": "LAURENT Fabien",
                            "email": "fabien.laurent@live.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        },
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 193474,
                    "startDateTime": "2023-12-08T13:30:00+01:00",
                    "endDateTime": "2023-12-08T17:30:00+01:00",
                    "course": {
                        "id": "11-136029",
                        "label": "CM Contexte sociétal 3A39",
                        "color": "#21ff37",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 229971,
                    "startDateTime": "2023-12-08T13:30:00+01:00",
                    "endDateTime": "2023-12-08T17:30:00+01:00",
                    "course": {
                        "id": "11-50932",
                        "label": "TP Système de communication",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45978,
                            "label": "Technopole_-1B38",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 669,
                            "displayname": "HARRIS Ernest",
                            "email": "ernest.harris@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 213143,
                    "startDateTime": "2023-12-08T14:30:00+01:00",
                    "endDateTime": "2023-12-08T16:30:00+01:00",
                    "course": {
                        "id": "11-287002",
                        "label": "Examen Techniques d'optimisation",
                        "color": "#00ffff",
                        "type": "EXAMEN",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 398419,
                            "label": "ENSAM-ME_A_104",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 4792,
                            "displayname": "BOURGET Marjolaine",
                            "email": "marjolaine.bourget@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 259821,
                    "startDateTime": "2023-12-08T17:00:00+01:00",
                    "endDateTime": "2023-12-08T19:00:00+01:00",
                    "course": {
                        "id": "11-104241",
                        "label": "CM Lean Supply Chain 5ASCM",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46011,
                            "label": "Technopole_1B24",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 166061,
                            "displayname": "MICHEL Robert",
                            "email": "michel.robert@gmx.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        },
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 259401,
                    "startDateTime": "2023-12-09T07:45:00+01:00",
                    "endDateTime": "2023-12-09T09:45:00+01:00",
                    "course": {
                        "id": "11-104245",
                        "label": "TD 6 Sigma - Lean Supply Chain",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46011,
                            "label": "Technopole_1B24",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 166061,
                            "displayname": "MICHEL Robert",
                            "email": "michel.robert@gmx.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        },
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 271330,
                    "startDateTime": "2023-12-09T07:45:00+01:00",
                    "endDateTime": "2023-12-09T09:45:00+01:00",
                    "course": {
                        "id": "11-189149",
                        "label": "TD Prévention des Pannes et Maîtrise des Disponibilités 5AMAI HJC",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201574,
                            "displayname": "BOURGIGNON Vincent",
                            "email": "vincent.bourgignon@sfr.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 188004,
                    "startDateTime": "2023-12-09T07:45:00+01:00",
                    "endDateTime": "2023-12-09T11:45:00+01:00",
                    "course": {
                        "id": "11-136225",
                        "label": "TP Modélisation et optimisation moteur 5ASPM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 409670,
                            "displayname": "NORMAND Louise",
                            "email": "lnormand99@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 186696,
                    "startDateTime": "2023-12-09T08:30:00+01:00",
                    "endDateTime": "2023-12-09T11:30:00+01:00",
                    "course": {
                        "id": "11-258824",
                        "label": "TD Ecosystème de l'innovation",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45999,
                            "label": "Technopole_1B68",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 235499,
                            "displayname": "DELONG Alexi",
                            "email": "alexi.delong@protonmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275537,
                            "label": "5A MAPI"
                        }
                    ]
                },
                {
                    "id": 80601,
                    "startDateTime": "2023-12-09T09:45:00+01:00",
                    "endDateTime": "2023-12-09T11:45:00+01:00",
                    "course": {
                        "id": "11-305424",
                        "label": "FLE 5A renforcé GP1",
                        "color": "#fffb05",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120328,
                            "label": "Technopole_1A06",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 144297,
                            "displayname": "LEMOINE Tanguy",
                            "email": "tanguy.lemoine@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 205267,
                            "label": "5A FLE G1"
                        }
                    ]
                },
                {
                    "id": 190315,
                    "startDateTime": "2023-12-11T07:45:00+01:00",
                    "endDateTime": "2023-12-11T09:45:00+01:00",
                    "course": {
                        "id": "11-123900",
                        "label": "CM Réseaux de terrain",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120307,
                            "label": "Technopole_-1B28",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 198465,
                            "displayname": "LACIEN Amélie",
                            "email": "amelie.lacien@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 193488,
                    "startDateTime": "2023-12-11T07:45:00+01:00",
                    "endDateTime": "2023-12-11T09:45:00+01:00",
                    "course": {
                        "id": "11-136029",
                        "label": "CM Contexte sociétal 3A39",
                        "color": "#21ff37",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 194576,
                    "startDateTime": "2023-12-11T07:45:00+01:00",
                    "endDateTime": "2023-12-11T09:45:00+01:00",
                    "course": {
                        "id": "11-228001",
                        "label": "CM Commande et diagnostic des systèmes 5AQUA",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45995,
                            "label": "Technopole_1A07",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162887,
                            "label": "5AQUA"
                        }
                    ]
                },
                {
                    "id": 201874,
                    "startDateTime": "2023-12-11T07:45:00+01:00",
                    "endDateTime": "2023-12-11T09:45:00+01:00",
                    "course": {
                        "id": "11-189142",
                        "label": "CM Gestion et Budget de la Maintenance 5AMAI MS",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 82262,
                            "displayname": "FERRER Ilona",
                            "email": "ilona.ferrer@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 185532,
                    "startDateTime": "2023-12-11T07:45:00+01:00",
                    "endDateTime": "2023-12-11T11:45:00+01:00",
                    "course": {
                        "id": "11-83498",
                        "label": "TP Mise en oeuvre des matériaux composites SPM2",
                        "color": "#00fbff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45988,
                            "label": "Technopole_-1BMP",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 302884,
                            "displayname": "FONTAINE Elodie",
                            "email": "elodie.fontaine@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 231067,
                    "startDateTime": "2023-12-11T07:45:00+01:00",
                    "endDateTime": "2023-12-11T11:45:00+01:00",
                    "course": {
                        "id": "11-228952",
                        "label": "TP Patient-specific FE modeling",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46075,
                            "label": "Technopole_2A12/2",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168224,
                            "displayname": "PRUNEL Lina",
                            "email": "lina.prunel@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 229979,
                    "startDateTime": "2023-12-11T08:00:00+01:00",
                    "endDateTime": "2023-12-11T12:00:00+01:00",
                    "course": {
                        "id": "11-50310",
                        "label": "TP Pile à Combustible et Photovoltaïque",
                        "color": "#00ffee",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 297,
                            "displayname": "ROUX Lilian",
                            "email": "lilian.roux@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 186435,
                    "startDateTime": "2023-12-11T09:45:00+01:00",
                    "endDateTime": "2023-12-11T11:45:00+01:00",
                    "course": {
                        "id": "11-256052",
                        "label": "CM Systèmes de stockage d'énergie 5ANRJ",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 191949,
                    "startDateTime": "2023-12-11T09:45:00+01:00",
                    "endDateTime": "2023-12-11T11:45:00+01:00",
                    "course": {
                        "id": "11-286125",
                        "label": "TP Acquisition et exploitation des données SC",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 342470,
                            "label": "Technopole_1B97",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 125524,
                            "displayname": "VACK Roger",
                            "email": "roger.vack@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162879,
                            "label": "5AMLP"
                        }
                    ]
                },
                {
                    "id": 193489,
                    "startDateTime": "2023-12-11T09:45:00+01:00",
                    "endDateTime": "2023-12-11T11:45:00+01:00",
                    "course": {
                        "id": "11-136029",
                        "label": "CM Contexte sociétal 3A39",
                        "color": "#21ff37",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 201875,
                    "startDateTime": "2023-12-11T09:45:00+01:00",
                    "endDateTime": "2023-12-11T11:45:00+01:00",
                    "course": {
                        "id": "11-189149",
                        "label": "TD Prévention des Pannes et Maîtrise des Disponibilités 5AMAI HJC",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201574,
                            "displayname": "BOURGIGNON Vincent",
                            "email": "vincent.bourgignon@sfr.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 271027,
                    "startDateTime": "2023-12-11T09:45:00+01:00",
                    "endDateTime": "2023-12-11T11:45:00+01:00",
                    "course": {
                        "id": "11-189278",
                        "label": "CM Entreprenariat - Communication externe 5AINE",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 82262,
                            "displayname": "FERRER Ilona",
                            "email": "ilona.ferrer@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 190306,
                    "startDateTime": "2023-12-11T10:00:00+01:00",
                    "endDateTime": "2023-12-11T12:00:00+01:00",
                    "course": {
                        "id": "11-123783",
                        "label": "CM Commande des systèmes de production",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 218406,
                            "label": "ENSAM-ME_A_AMPHI_2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 302765,
                            "displayname": "DUMON Sylvain",
                            "email": "sylvain.dumon@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 228537,
                    "startDateTime": "2023-12-11T11:45:00+01:00",
                    "endDateTime": "2023-12-11T12:45:00+01:00",
                    "course": {
                        "id": "11-192683",
                        "label": "ALL 5A renforcé ECRIRE",
                        "color": "#ffffff",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120320,
                            "label": "Technopole_1A02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 174923,
                            "displayname": "POTTER Harry",
                            "email": "harry.potter@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 185867,
                            "label": "5A ALLEMAND"
                        }
                    ]
                },
                {
                    "id": 189940,
                    "startDateTime": "2023-12-11T13:30:00+01:00",
                    "endDateTime": "2023-12-11T15:30:00+01:00",
                    "course": {
                        "id": "11-189238",
                        "label": "TP Développement monoplace 5ASPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120193,
                            "label": "Technopole_-1B22",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 302884,
                            "displayname": "FONTAINE Elodie",
                            "email": "elodie.fontaine@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 190311,
                    "startDateTime": "2023-12-11T13:30:00+01:00",
                    "endDateTime": "2023-12-11T15:30:00+01:00",
                    "course": {
                        "id": "11-123899",
                        "label": "CM Robotics",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 218406,
                            "label": "ENSAM-ME_A_AMPHI_2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 302765,
                            "displayname": "DUMON Sylvain",
                            "email": "sylvain.dumon@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 194572,
                    "startDateTime": "2023-12-11T13:30:00+01:00",
                    "endDateTime": "2023-12-11T15:30:00+01:00",
                    "course": {
                        "id": "11-133052",
                        "label": "TD Gestion de la maintenance 5AQUA KL",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120326,
                            "label": "Technopole_1A05",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 7195,
                            "displayname": "SCHNEIDER Isabelle",
                            "email": "isabelle.schneider@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        },
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 210400,
                    "startDateTime": "2023-12-11T13:30:00+01:00",
                    "endDateTime": "2023-12-11T15:30:00+01:00",
                    "course": {
                        "id": "11-48401",
                        "label": "CM Scientific communication",
                        "color": "#00ff2f",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120334,
                            "label": "Technopole_0A65",
                            "type": "Amphithéâtre",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 7493,
                            "displayname": "NATUREL Anne-Marie",
                            "email": "anne-marie.naturel@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 271337,
                    "startDateTime": "2023-12-11T13:30:00+01:00",
                    "endDateTime": "2023-12-11T15:30:00+01:00",
                    "course": {
                        "id": "11-189149",
                        "label": "TD Prévention des Pannes et Maîtrise des Disponibilités 5AMAI HJC",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201574,
                            "displayname": "BOURGIGNON Vincent",
                            "email": "vincent.bourgignon@sfr.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 185435,
                    "startDateTime": "2023-12-11T13:30:00+01:00",
                    "endDateTime": "2023-12-11T16:30:00+01:00",
                    "course": {
                        "id": "11-257521",
                        "label": "CM Les financements de la R&D&I dans la filière Energie",
                        "color": "#0dff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 299915,
                            "displayname": "CAPALDI Larry",
                            "email": "larry.capaldi@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 191644,
                    "startDateTime": "2023-12-11T13:30:00+01:00",
                    "endDateTime": "2023-12-11T16:30:00+01:00",
                    "course": {
                        "id": "11-173672",
                        "label": "TD Supply chain 5AMLP ML",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 342470,
                            "label": "Technopole_1B97",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12437,
                            "displayname": "LEFEBVRE Arthur",
                            "email": "a.lefebvre@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162879,
                            "label": "5AMLP"
                        }
                    ]
                },
                {
                    "id": 271398,
                    "startDateTime": "2023-12-11T13:30:00+01:00",
                    "endDateTime": "2023-12-11T16:30:00+01:00",
                    "course": {
                        "id": "11-189290",
                        "label": "CM Entreprenariat - Aspects Pratiques 5AINE",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 392088,
                            "displayname": "DELONG Adam",
                            "email": "adam.delong@tylop.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 185410,
                    "startDateTime": "2023-12-11T13:30:00+01:00",
                    "endDateTime": "2023-12-11T17:30:00+01:00",
                    "course": {
                        "id": "11-251968",
                        "label": "TP Analyse modale expérimentale CMAO2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 96036,
                            "label": "Technopole_-1B41/1",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 186991,
                            "displayname": "POUCHARD Louis",
                            "email": "louis.pouchard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162842,
                            "label": "5ACMAO2"
                        }
                    ]
                },
                {
                    "id": 185606,
                    "startDateTime": "2023-12-11T13:30:00+01:00",
                    "endDateTime": "2023-12-11T17:30:00+01:00",
                    "course": {
                        "id": "11-251964",
                        "label": "TP Critères de dimensionnement des structures CMAO1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46078,
                            "label": "Technopole_2A19/2",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 398293,
                            "displayname": "PARISEAU Olivier",
                            "email": "olivier.pariseau@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162844,
                            "label": "5ACMAO1"
                        }
                    ]
                },
                {
                    "id": 193445,
                    "startDateTime": "2023-12-11T13:30:00+01:00",
                    "endDateTime": "2023-12-11T17:30:00+01:00",
                    "course": {
                        "id": "11-294380",
                        "label": "CM Maîtrise des conséquences 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 229980,
                    "startDateTime": "2023-12-11T13:30:00+01:00",
                    "endDateTime": "2023-12-11T17:30:00+01:00",
                    "course": {
                        "id": "11-50932",
                        "label": "TP Système de communication",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45978,
                            "label": "Technopole_-1B38",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 669,
                            "displayname": "HARRIS Ernest",
                            "email": "ernest.harris@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 190316,
                    "startDateTime": "2023-12-11T15:30:00+01:00",
                    "endDateTime": "2023-12-11T17:30:00+01:00",
                    "course": {
                        "id": "11-124275",
                        "label": "TD Réseaux de terrain",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120307,
                            "label": "Technopole_-1B28",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 198465,
                            "displayname": "LACIEN Amélie",
                            "email": "amelie.lacien@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 271341,
                    "startDateTime": "2023-12-11T15:30:00+01:00",
                    "endDateTime": "2023-12-11T17:30:00+01:00",
                    "course": {
                        "id": "11-189149",
                        "label": "TD Prévention des Pannes et Maîtrise des Disponibilités 5AMAI HJC",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201574,
                            "displayname": "BOURGIGNON Vincent",
                            "email": "vincent.bourgignon@sfr.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 149238,
                    "startDateTime": "2023-12-12T07:45:00+01:00",
                    "endDateTime": "2023-12-12T09:45:00+01:00",
                    "course": {
                        "id": "11-251928",
                        "label": "CM Techniques d'innovation - TRIZ",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 162125,
                            "label": "Technopole_2A26",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11974,
                            "displayname": "PETIT Anne-Marie",
                            "email": "anne-marie.petit@laposte.net"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162840,
                            "label": "5ACMAO"
                        }
                    ]
                },
                {
                    "id": 194601,
                    "startDateTime": "2023-12-12T07:45:00+01:00",
                    "endDateTime": "2023-12-12T09:45:00+01:00",
                    "course": {
                        "id": "11-133052",
                        "label": "TD Gestion de la maintenance 5AQUA KL",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120324,
                            "label": "Technopole_1A04",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 7195,
                            "displayname": "SCHNEIDER Isabelle",
                            "email": "isabelle.schneider@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        },
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 36709,
                    "startDateTime": "2023-12-12T07:45:00+01:00",
                    "endDateTime": "2023-12-12T11:45:00+01:00",
                    "course": {
                        "id": "11-129758",
                        "label": "CM Technologies de l'information - SAP 5ASCM3",
                        "color": "#ffffff",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 218021,
                            "label": "ISTEC PARIS",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12437,
                            "displayname": "LEFEBVRE Arthur",
                            "email": "a.lefebvre@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162897,
                            "label": "5ASCM3"
                        }
                    ]
                },
                {
                    "id": 125994,
                    "startDateTime": "2023-12-12T07:45:00+01:00",
                    "endDateTime": "2023-12-12T11:45:00+01:00",
                    "course": {
                        "id": "11-157888",
                        "label": "TP Gestion de projets 5ASCM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45954,
                            "label": "Technopole_1A38",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 510,
                            "displayname": "CHATIGNY Sébastien",
                            "email": "sebastien.chatigny@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 187031,
                    "startDateTime": "2023-12-12T07:45:00+01:00",
                    "endDateTime": "2023-12-12T11:45:00+01:00",
                    "course": {
                        "id": "11-121055",
                        "label": "TP Commande et acquisition du  véhicule 5ASPM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45977,
                            "label": "Technopole_-1B26",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134967,
                            "displayname": "BELLEFEUILLE Dwayne",
                            "email": "dwayne.bellefeuille@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 188823,
                    "startDateTime": "2023-12-12T07:45:00+01:00",
                    "endDateTime": "2023-12-12T11:45:00+01:00",
                    "course": {
                        "id": "11-141502",
                        "label": "TP Analyse modale experimentale 5ASPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 248518,
                            "label": "-1B41/2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 186991,
                            "displayname": "POUCHARD Louis",
                            "email": "louis.pouchard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 201866,
                    "startDateTime": "2023-12-12T07:45:00+01:00",
                    "endDateTime": "2023-12-12T11:45:00+01:00",
                    "course": {
                        "id": "11-266242",
                        "label": "TP Fiabilité & Politiques de Maintenance et Visio-surveillance 5AMAI1 BM",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193004,
                            "label": "5A MAI1"
                        }
                    ]
                },
                {
                    "id": 223473,
                    "startDateTime": "2023-12-12T07:45:00+01:00",
                    "endDateTime": "2023-12-12T11:45:00+01:00",
                    "course": {
                        "id": "11-90879",
                        "label": "TP Métallurgie des poudres et fabrication additive MAPI1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        },
                        {
                            "id": 45983,
                            "label": "Technopole_-1B76/3",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134963,
                            "displayname": "PELLETIER Lucas",
                            "email": "lucas.pelletier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275526,
                            "label": "5A MAPI 1"
                        }
                    ]
                },
                {
                    "id": 230182,
                    "startDateTime": "2023-12-12T07:45:00+01:00",
                    "endDateTime": "2023-12-12T11:45:00+01:00",
                    "course": {
                        "id": "11-31982",
                        "label": "TP Projet Développement",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46006,
                            "label": "Technopole_1B04",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 553,
                            "displayname": "COLLIN Valerie",
                            "email": "valerie.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 230754,
                    "startDateTime": "2023-12-12T07:45:00+01:00",
                    "endDateTime": "2023-12-12T11:45:00+01:00",
                    "course": {
                        "id": "11-48426",
                        "label": "TP Patient-specific FE modeling",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46075,
                            "label": "Technopole_2A12/2",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168224,
                            "displayname": "PRUNEL Lina",
                            "email": "lina.prunel@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 240655,
                    "startDateTime": "2023-12-12T08:45:00+01:00",
                    "endDateTime": "2023-12-12T09:45:00+01:00",
                    "course": {
                        "id": "11-232440",
                        "label": "CM Entreprenariat - Communication interne 5AINE",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11712,
                            "displayname": "DUPAIN Marinette",
                            "email": "m.dupain@yahoo.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 185744,
                    "startDateTime": "2023-12-12T09:45:00+01:00",
                    "endDateTime": "2023-12-12T11:45:00+01:00",
                    "course": {
                        "id": "11-251984",
                        "label": "CM Spécifiations géométriques",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46005,
                            "label": "Technopole_1B03",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 198465,
                            "displayname": "LACIEN Amélie",
                            "email": "amelie.lacien@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162840,
                            "label": "5ACMAO"
                        }
                    ]
                },
                {
                    "id": 194570,
                    "startDateTime": "2023-12-12T09:45:00+01:00",
                    "endDateTime": "2023-12-12T11:45:00+01:00",
                    "course": {
                        "id": "11-291095",
                        "label": "TD Modélisation et analyse des processus industriels 5AQUA",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45952,
                            "label": "Technopole_1A36",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 10934,
                            "displayname": "GROSJEAN Lucie",
                            "email": "lucie.grosjean@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        },
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 294801,
                    "startDateTime": "2023-12-12T09:45:00+01:00",
                    "endDateTime": "2023-12-12T11:45:00+01:00",
                    "course": {
                        "id": "11-232441",
                        "label": "TD Entreprenariat - Communication interne 5AINE",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11712,
                            "displayname": "DUPAIN Marinette",
                            "email": "m.dupain@yahoo.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 190309,
                    "startDateTime": "2023-12-12T10:00:00+01:00",
                    "endDateTime": "2023-12-12T12:00:00+01:00",
                    "course": {
                        "id": "11-123837",
                        "label": "CM Intégration et applications de la robotique",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 302765,
                            "displayname": "DUMON Sylvain",
                            "email": "sylvain.dumon@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 61598,
                    "startDateTime": "2023-12-12T12:45:00+01:00",
                    "endDateTime": "2023-12-12T13:15:00+01:00",
                    "course": {
                        "id": "11-284503",
                        "label": "ESP 5A renforcé EXPOSER",
                        "color": "#ffffff",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45996,
                            "label": "Technopole_1A08",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168115,
                            "displayname": "GAUTIER Juliette",
                            "email": "juliette.gautier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 205266,
                            "label": "5A ESPAGNOL"
                        }
                    ]
                },
                {
                    "id": 194431,
                    "startDateTime": "2023-12-12T13:30:00+01:00",
                    "endDateTime": "2023-12-12T15:30:00+01:00",
                    "course": {
                        "id": "11-189260",
                        "label": "CM Modélisation et analyse des processus industriels 5AQUA",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45998,
                            "label": "Technopole_1A10",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 10934,
                            "displayname": "GROSJEAN Lucie",
                            "email": "lucie.grosjean@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        },
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 201227,
                    "startDateTime": "2023-12-12T13:30:00+01:00",
                    "endDateTime": "2023-12-12T15:30:00+01:00",
                    "course": {
                        "id": "11-234508",
                        "label": "CM Pilotage d'une Supply Chain 5ASCM DA",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46011,
                            "label": "Technopole_1B24",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11702,
                            "displayname": "DESROSIERS Dwayne",
                            "email": "dwayne.desrosiers@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        },
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 279126,
                    "startDateTime": "2023-12-12T13:30:00+01:00",
                    "endDateTime": "2023-12-12T15:30:00+01:00",
                    "course": {
                        "id": "11-143398",
                        "label": "UE21 LOGISTIQUE",
                        "color": "#00ff00",
                        "type": "DIVERS",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 215891,
                            "label": "ENSAM-ME_A_AMPHI_1",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 349111,
                    "startDateTime": "2023-12-12T13:30:00+01:00",
                    "endDateTime": "2023-12-12T15:30:00+01:00",
                    "course": {
                        "id": "11-90476",
                        "label": "TP Critères de Dimensionnement des structures MAPI1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45960,
                            "label": "Technopole_2A19/1",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134965,
                            "displayname": "ARNOUX Violette",
                            "email": "violette.arnoux@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275526,
                            "label": "5A MAPI 1"
                        }
                    ]
                },
                {
                    "id": 193558,
                    "startDateTime": "2023-12-12T13:30:00+01:00",
                    "endDateTime": "2023-12-12T16:30:00+01:00",
                    "course": {
                        "id": "11-145716",
                        "label": "TP Projet étude de cas 3A39",
                        "color": "#9999ff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 2043,
                            "displayname": "LEROY Romain",
                            "email": "romain.leroy@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 36721,
                    "startDateTime": "2023-12-12T13:30:00+01:00",
                    "endDateTime": "2023-12-12T17:30:00+01:00",
                    "course": {
                        "id": "11-129758",
                        "label": "CM Technologies de l'information - SAP 5ASCM3",
                        "color": "#ffffff",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 218021,
                            "label": "ISTEC PARIS",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12437,
                            "displayname": "LEFEBVRE Arthur",
                            "email": "a.lefebvre@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162897,
                            "label": "5ASCM3"
                        }
                    ]
                },
                {
                    "id": 185608,
                    "startDateTime": "2023-12-12T13:30:00+01:00",
                    "endDateTime": "2023-12-12T17:30:00+01:00",
                    "course": {
                        "id": "11-251963",
                        "label": "TP Critères de dimensionnement des structures CMAO2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 339172,
                            "displayname": "GARNIER Hugo",
                            "email": "hugo.garnier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162842,
                            "label": "5ACMAO2"
                        }
                    ]
                },
                {
                    "id": 188822,
                    "startDateTime": "2023-12-12T13:30:00+01:00",
                    "endDateTime": "2023-12-12T17:30:00+01:00",
                    "course": {
                        "id": "11-141929",
                        "label": "TP Analyse modale experimentale 5ASPM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 248518,
                            "label": "-1B41/2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 186991,
                            "displayname": "POUCHARD Louis",
                            "email": "louis.pouchard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 189198,
                    "startDateTime": "2023-12-12T13:30:00+01:00",
                    "endDateTime": "2023-12-12T17:30:00+01:00",
                    "course": {
                        "id": "11-141954",
                        "label": "TP Techniques expérimentales 5ASPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 96036,
                            "label": "Technopole_-1B41/1",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 125533,
                            "displayname": "LEPAGE Karim",
                            "email": "karim.lepage@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 201872,
                    "startDateTime": "2023-12-12T13:30:00+01:00",
                    "endDateTime": "2023-12-12T17:30:00+01:00",
                    "course": {
                        "id": "11-254938",
                        "label": "TP Prévention des Pannes et Maîtrise des Disponibilités 5AMAI1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201498,
                            "displayname": "DELACROIX Eddy",
                            "email": "eddy.delacroix@outlook.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193004,
                            "label": "5A MAI1"
                        }
                    ]
                },
                {
                    "id": 231070,
                    "startDateTime": "2023-12-12T13:30:00+01:00",
                    "endDateTime": "2023-12-12T17:30:00+01:00",
                    "course": {
                        "id": "11-137198",
                        "label": "TP Transverse Project",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120192,
                            "label": "Technopole_-1B47/2",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 767,
                            "displayname": "CARROLLES Marceau",
                            "email": "marceau.carrolles@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 182669,
                    "startDateTime": "2023-12-12T14:30:00+01:00",
                    "endDateTime": "2023-12-12T15:30:00+01:00",
                    "course": {
                        "id": "11-189278",
                        "label": "CM Entreprenariat - Communication externe 5AINE",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 281452,
                            "displayname": "MAROIS Simon",
                            "email": "simon.marois58@wanadoo.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 190329,
                    "startDateTime": "2023-12-12T15:30:00+01:00",
                    "endDateTime": "2023-12-12T17:30:00+01:00",
                    "course": {
                        "id": "11-124275",
                        "label": "TD Réseaux de terrain",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120307,
                            "label": "Technopole_-1B28",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 198465,
                            "displayname": "LACIEN Amélie",
                            "email": "amelie.lacien@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 294809,
                    "startDateTime": "2023-12-12T15:30:00+01:00",
                    "endDateTime": "2023-12-12T17:30:00+01:00",
                    "course": {
                        "id": "11-231062",
                        "label": "CM Entreprenariat - Comptabilité Finances 5AINE",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 281452,
                            "displayname": "MAROIS Simon",
                            "email": "simon.marois58@wanadoo.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 209002,
                    "startDateTime": "2023-12-13T07:45:00+01:00",
                    "endDateTime": "2023-12-13T09:45:00+01:00",
                    "course": {
                        "id": "11-47779",
                        "label": "TD Communication - Management MAI IPI4.0",
                        "color": "#f8ff38",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120335,
                            "label": "Technopole_3A41",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 9757,
                            "displayname": "DUPUYS Danielle",
                            "email": "danielle.dupuys@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        },
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 34894,
                    "startDateTime": "2023-12-13T07:45:00+01:00",
                    "endDateTime": "2023-12-13T11:45:00+01:00",
                    "course": {
                        "id": "11-180120",
                        "label": "Planification d'une Supply Chain - BASICS 5ASCM3",
                        "color": "#ffffff",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 12437,
                            "displayname": "LEFEBVRE Arthur",
                            "email": "a.lefebvre@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162897,
                            "label": "5ASCM3"
                        }
                    ]
                },
                {
                    "id": 186434,
                    "startDateTime": "2023-12-13T07:45:00+01:00",
                    "endDateTime": "2023-12-13T11:45:00+01:00",
                    "course": {
                        "id": "11-122648",
                        "label": "TP Systèmes de stockage d'énergie 5ANRJ1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162857,
                            "label": "5ANRJ1"
                        }
                    ]
                },
                {
                    "id": 194586,
                    "startDateTime": "2023-12-13T07:45:00+01:00",
                    "endDateTime": "2023-12-13T11:45:00+01:00",
                    "course": {
                        "id": "11-133865",
                        "label": "TP Management de projet QUA2",
                        "color": "#05fffb",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45953,
                            "label": "Technopole_1A37",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 510,
                            "displayname": "CHATIGNY Sébastien",
                            "email": "sebastien.chatigny@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 230183,
                    "startDateTime": "2023-12-13T07:45:00+01:00",
                    "endDateTime": "2023-12-13T11:45:00+01:00",
                    "course": {
                        "id": "11-31982",
                        "label": "TP Projet Développement",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46006,
                            "label": "Technopole_1B04",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 553,
                            "displayname": "COLLIN Valerie",
                            "email": "valerie.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 231083,
                    "startDateTime": "2023-12-13T07:45:00+01:00",
                    "endDateTime": "2023-12-13T11:45:00+01:00",
                    "course": {
                        "id": "11-231427",
                        "label": "Autonomie - Review of literature for Master's thesis",
                        "color": "#00ff00",
                        "type": "DIVERS",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46007,
                            "label": "Technopole_1B05",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 192196,
                    "startDateTime": "2023-12-13T08:45:00+01:00",
                    "endDateTime": "2023-12-13T11:45:00+01:00",
                    "course": {
                        "id": "11-140677",
                        "label": "TD La cindynique 3A39",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 63334,
                            "displayname": "Enseignant 1",
                            "email": ""
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 294954,
                    "startDateTime": "2023-12-13T08:45:00+01:00",
                    "endDateTime": "2023-12-13T11:45:00+01:00",
                    "course": {
                        "id": "11-189286",
                        "label": "TD Entreprenariat - Comptabilité Finances 5AINE",
                        "color": "#fbff05",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 204518,
                            "displayname": "FLAMAND Felicien",
                            "email": "felicien.flamand@outlook.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 190005,
                    "startDateTime": "2023-12-13T09:45:00+01:00",
                    "endDateTime": "2023-12-13T11:45:00+01:00",
                    "course": {
                        "id": "11-142134",
                        "label": "TP Développement monoplace 5ASPM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46001,
                            "label": "Technopole_1B95",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 302884,
                            "displayname": "FONTAINE Elodie",
                            "email": "elodie.fontaine@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 190328,
                    "startDateTime": "2023-12-13T09:45:00+01:00",
                    "endDateTime": "2023-12-13T11:45:00+01:00",
                    "course": {
                        "id": "11-124150",
                        "label": "TD Intégration et applications de la robotique",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46005,
                            "label": "Technopole_1B03",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 302765,
                            "displayname": "DUMON Sylvain",
                            "email": "sylvain.dumon@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 56693,
                    "startDateTime": "2023-12-13T12:30:00+01:00",
                    "endDateTime": "2023-12-13T13:30:00+01:00",
                    "course": {
                        "id": "11-103829",
                        "label": "ESP 5A renforcé ECRIRE",
                        "color": "#ffffff",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120320,
                            "label": "Technopole_1A02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168115,
                            "displayname": "GAUTIER Juliette",
                            "email": "juliette.gautier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 205266,
                            "label": "5A ESPAGNOL"
                        }
                    ]
                },
                {
                    "id": 294950,
                    "startDateTime": "2023-12-13T13:30:00+01:00",
                    "endDateTime": "2023-12-13T16:30:00+01:00",
                    "course": {
                        "id": "11-189286",
                        "label": "TD Entreprenariat - Comptabilité Finances 5AINE",
                        "color": "#fbff05",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 281452,
                            "displayname": "MAROIS Simon",
                            "email": "simon.marois58@wanadoo.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 36704,
                    "startDateTime": "2023-12-13T13:30:00+01:00",
                    "endDateTime": "2023-12-13T17:30:00+01:00",
                    "course": {
                        "id": "11-180120",
                        "label": "Planification d'une Supply Chain - BASICS 5ASCM3",
                        "color": "#ffffff",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 12437,
                            "displayname": "LEFEBVRE Arthur",
                            "email": "a.lefebvre@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162897,
                            "label": "5ASCM3"
                        }
                    ]
                },
                {
                    "id": 186327,
                    "startDateTime": "2023-12-13T13:30:00+01:00",
                    "endDateTime": "2023-12-13T17:30:00+01:00",
                    "course": {
                        "id": "11-56221",
                        "label": "CM Maillage avancé et optimisation CMAO",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201589,
                            "displayname": "JACQUIOT France",
                            "email": "france.jacquiot@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162842,
                            "label": "5ACMAO2"
                        },
                        {
                            "id": 162844,
                            "label": "5ACMAO1"
                        }
                    ]
                },
                {
                    "id": 188600,
                    "startDateTime": "2023-12-13T13:30:00+01:00",
                    "endDateTime": "2023-12-13T17:30:00+01:00",
                    "course": {
                        "id": "11-141039",
                        "label": "TP Critères de dimensionnement des structures 5ASPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45960,
                            "label": "Technopole_2A19/1",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 398293,
                            "displayname": "PARISEAU Olivier",
                            "email": "olivier.pariseau@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 188614,
                    "startDateTime": "2023-12-13T13:30:00+01:00",
                    "endDateTime": "2023-12-13T17:30:00+01:00",
                    "course": {
                        "id": "11-141040",
                        "label": "TP Critères de dimensionnement des structures 5ASPM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46078,
                            "label": "Technopole_2A19/2",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134965,
                            "displayname": "ARNOUX Violette",
                            "email": "violette.arnoux@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 192198,
                    "startDateTime": "2023-12-13T13:30:00+01:00",
                    "endDateTime": "2023-12-13T17:30:00+01:00",
                    "course": {
                        "id": "11-140677",
                        "label": "TD La cindynique 3A39",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 63334,
                            "displayname": "Enseignant 1",
                            "email": ""
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 194582,
                    "startDateTime": "2023-12-13T13:30:00+01:00",
                    "endDateTime": "2023-12-13T17:30:00+01:00",
                    "course": {
                        "id": "11-133877",
                        "label": "TP Management de projet QUA 1",
                        "color": "#05fffb",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45952,
                            "label": "Technopole_1A36",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 510,
                            "displayname": "CHATIGNY Sébastien",
                            "email": "sebastien.chatigny@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        }
                    ]
                },
                {
                    "id": 229987,
                    "startDateTime": "2023-12-13T13:30:00+01:00",
                    "endDateTime": "2023-12-13T17:30:00+01:00",
                    "course": {
                        "id": "11-50488",
                        "label": "TP Commande avancée",
                        "color": "#05ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45955,
                            "label": "Technopole_1A39",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 231079,
                    "startDateTime": "2023-12-13T13:30:00+01:00",
                    "endDateTime": "2023-12-13T17:30:00+01:00",
                    "course": {
                        "id": "11-228952",
                        "label": "TP Patient-specific FE modeling",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45959,
                            "label": "Technopole_2A12/1",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168224,
                            "displayname": "PRUNEL Lina",
                            "email": "lina.prunel@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 272704,
                    "startDateTime": "2023-12-13T13:30:00+01:00",
                    "endDateTime": "2023-12-13T17:30:00+01:00",
                    "course": {
                        "id": "11-257605",
                        "label": "TP Caméras thermiques 5ANRJ1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 151881,
                            "label": "-1B69/2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 167656,
                            "displayname": "DUVAL René",
                            "email": "rene.duval@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162857,
                            "label": "5ANRJ1"
                        }
                    ]
                },
                {
                    "id": 201387,
                    "startDateTime": "2023-12-14T07:45:00+01:00",
                    "endDateTime": "2023-12-14T09:45:00+01:00",
                    "course": {
                        "id": "11-193647",
                        "label": "TD Excellence Opérationnelle : Maitrise des procédés",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120330,
                            "label": "Technopole_0A64",
                            "type": "Amphithéâtre",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 198215,
                            "displayname": "BUSSON Baptiste",
                            "email": "baptiste.busson@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162879,
                            "label": "5AMLP"
                        },
                        {
                            "id": 162887,
                            "label": "5AQUA"
                        }
                    ]
                },
                {
                    "id": 35507,
                    "startDateTime": "2023-12-14T07:45:00+01:00",
                    "endDateTime": "2023-12-14T11:45:00+01:00",
                    "course": {
                        "id": "11-251998",
                        "label": "🎥 TD Communication Management CMAO",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 292695,
                            "label": "En direct à distance",
                            "type": "SYNCHRONE",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 9757,
                            "displayname": "DUPUYS Danielle",
                            "email": "danielle.dupuys@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162840,
                            "label": "5ACMAO"
                        }
                    ]
                },
                {
                    "id": 189201,
                    "startDateTime": "2023-12-14T07:45:00+01:00",
                    "endDateTime": "2023-12-14T11:45:00+01:00",
                    "course": {
                        "id": "11-141955",
                        "label": "TP Techniques expérimentales 5ASPM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 96036,
                            "label": "Technopole_-1B41/1",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 125533,
                            "displayname": "LEPAGE Karim",
                            "email": "karim.lepage@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 190322,
                    "startDateTime": "2023-12-14T07:45:00+01:00",
                    "endDateTime": "2023-12-14T11:45:00+01:00",
                    "course": {
                        "id": "11-124175",
                        "label": "TP Intégration et applications de la robotique 2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": true,
                        "url": "https://arche.univ-lorraine.fr/course/view.php?id=68341"
                    },
                    "rooms": [
                        {
                            "id": 45976,
                            "label": "Technopole_-1B27",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 339077,
                            "displayname": "TRUFFEAU Jacques",
                            "email": "jacques.truffeau@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 219152,
                            "label": "5A IP4.0 2"
                        }
                    ]
                },
                {
                    "id": 201883,
                    "startDateTime": "2023-12-14T07:45:00+01:00",
                    "endDateTime": "2023-12-14T11:45:00+01:00",
                    "course": {
                        "id": "11-122940",
                        "label": "TD Fiabilité & Politiques de Maintenance et Visio-surveillance 5AMAI BL",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201677,
                            "displayname": "BERGMAN Simon",
                            "email": "simon.bergman@free.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 231092,
                    "startDateTime": "2023-12-14T07:45:00+01:00",
                    "endDateTime": "2023-12-14T11:45:00+01:00",
                    "course": {
                        "id": "11-688",
                        "label": "TP Transverse Project",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 343513,
                            "label": "Technopole_-1B47/1",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 767,
                            "displayname": "CARROLLES Marceau",
                            "email": "marceau.carrolles@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 193580,
                    "startDateTime": "2023-12-14T08:45:00+01:00",
                    "endDateTime": "2023-12-14T11:45:00+01:00",
                    "course": {
                        "id": "11-145716",
                        "label": "TP Projet étude de cas 3A39",
                        "color": "#9999ff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 2043,
                            "displayname": "LEROY Romain",
                            "email": "romain.leroy@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 341086,
                    "startDateTime": "2023-12-14T09:45:00+01:00",
                    "endDateTime": "2023-12-14T10:45:00+01:00",
                    "course": {
                        "id": "11-32104",
                        "label": "TD Droit 5A MLP - VEHA",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45998,
                            "label": "Technopole_1A10",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 311444,
                            "displayname": "PELLETIER Germain",
                            "email": "germain.pelletier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162879,
                            "label": "5AMLP"
                        },
                        {
                            "id": 374592,
                            "label": "5AVEHA"
                        }
                    ]
                },
                {
                    "id": 189998,
                    "startDateTime": "2023-12-14T09:45:00+01:00",
                    "endDateTime": "2023-12-14T11:45:00+01:00",
                    "course": {
                        "id": "11-189238",
                        "label": "TP Développement monoplace 5ASPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46001,
                            "label": "Technopole_1B95",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 929,
                            "displayname": "RENAUD Baptiste",
                            "email": "baptiste.renaud@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 194589,
                    "startDateTime": "2023-12-14T09:45:00+01:00",
                    "endDateTime": "2023-12-14T11:45:00+01:00",
                    "course": {
                        "id": "11-133052",
                        "label": "TD Gestion de la maintenance 5AQUA KL",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45997,
                            "label": "Technopole_1A09",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 7195,
                            "displayname": "SCHNEIDER Isabelle",
                            "email": "isabelle.schneider@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        },
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 201886,
                    "startDateTime": "2023-12-14T13:30:00+01:00",
                    "endDateTime": "2023-12-14T15:30:00+01:00",
                    "course": {
                        "id": "11-189149",
                        "label": "TD Prévention des Pannes et Maîtrise des Disponibilités 5AMAI HJC",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201574,
                            "displayname": "BOURGIGNON Vincent",
                            "email": "vincent.bourgignon@sfr.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 191645,
                    "startDateTime": "2023-12-14T13:30:00+01:00",
                    "endDateTime": "2023-12-14T17:30:00+01:00",
                    "course": {
                        "id": "11-173672",
                        "label": "TD Supply chain 5AMLP ML",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 342470,
                            "label": "Technopole_1B97",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12437,
                            "displayname": "LEFEBVRE Arthur",
                            "email": "a.lefebvre@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162879,
                            "label": "5AMLP"
                        }
                    ]
                },
                {
                    "id": 259884,
                    "startDateTime": "2023-12-14T13:30:00+01:00",
                    "endDateTime": "2023-12-14T17:30:00+01:00",
                    "course": {
                        "id": "11-104245",
                        "label": "TD 6 Sigma - Lean Supply Chain",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46011,
                            "label": "Technopole_1B24",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 166061,
                            "displayname": "MICHEL Robert",
                            "email": "michel.robert@gmx.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        },
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 201885,
                    "startDateTime": "2023-12-14T15:30:00+01:00",
                    "endDateTime": "2023-12-14T17:30:00+01:00",
                    "course": {
                        "id": "11-189149",
                        "label": "TD Prévention des Pannes et Maîtrise des Disponibilités 5AMAI HJC",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201574,
                            "displayname": "BOURGIGNON Vincent",
                            "email": "vincent.bourgignon@sfr.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 37601,
                    "startDateTime": "2023-12-15T07:45:00+01:00",
                    "endDateTime": "2023-12-15T11:45:00+01:00",
                    "course": {
                        "id": "11-214349",
                        "label": "CM Technologies de l'information - ARENA 5ASCM3",
                        "color": "#ffffff",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 218021,
                            "label": "ISTEC PARIS",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11702,
                            "displayname": "DESROSIERS Dwayne",
                            "email": "dwayne.desrosiers@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162897,
                            "label": "5ASCM3"
                        }
                    ]
                },
                {
                    "id": 187724,
                    "startDateTime": "2023-12-15T07:45:00+01:00",
                    "endDateTime": "2023-12-15T11:45:00+01:00",
                    "course": {
                        "id": "11-189234",
                        "label": "CM Modélisation et optimisation moteur 5ASPM",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46001,
                            "label": "Technopole_1B95",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201500,
                            "displayname": "BEAULIEU Patricia",
                            "email": "pbeaulieu@aliceadsl.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162846,
                            "label": "5ASPM"
                        }
                    ]
                },
                {
                    "id": 193436,
                    "startDateTime": "2023-12-15T07:45:00+01:00",
                    "endDateTime": "2023-12-15T11:45:00+01:00",
                    "course": {
                        "id": "11-294380",
                        "label": "CM Maîtrise des conséquences 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 231107,
                    "startDateTime": "2023-12-15T07:45:00+01:00",
                    "endDateTime": "2023-12-15T11:45:00+01:00",
                    "course": {
                        "id": "11-48051",
                        "label": "TP Transverse Project",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120192,
                            "label": "Technopole_-1B47/2",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168224,
                            "displayname": "PRUNEL Lina",
                            "email": "lina.prunel@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 259887,
                    "startDateTime": "2023-12-15T07:45:00+01:00",
                    "endDateTime": "2023-12-15T11:45:00+01:00",
                    "course": {
                        "id": "11-104241",
                        "label": "CM Lean Supply Chain 5ASCM",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46011,
                            "label": "Technopole_1B24",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 166061,
                            "displayname": "MICHEL Robert",
                            "email": "michel.robert@gmx.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        },
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 230024,
                    "startDateTime": "2023-12-15T08:00:00+01:00",
                    "endDateTime": "2023-12-15T12:00:00+01:00",
                    "course": {
                        "id": "11-50310",
                        "label": "TP Pile à Combustible et Photovoltaïque",
                        "color": "#00ffee",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 297,
                            "displayname": "ROUX Lilian",
                            "email": "lilian.roux@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 185348,
                    "startDateTime": "2023-12-15T08:45:00+01:00",
                    "endDateTime": "2023-12-15T11:45:00+01:00",
                    "course": {
                        "id": "11-257523",
                        "label": "CM Les filières éolienne et solaire 5ANRJ",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 229654,
                            "displayname": "DUTRONC Blaise",
                            "email": "blaise.dutronc@tgb-societe.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 294803,
                    "startDateTime": "2023-12-15T08:45:00+01:00",
                    "endDateTime": "2023-12-15T11:45:00+01:00",
                    "course": {
                        "id": "11-232441",
                        "label": "TD Entreprenariat - Communication interne 5AINE",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11712,
                            "displayname": "DUPAIN Marinette",
                            "email": "m.dupain@yahoo.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 279128,
                    "startDateTime": "2023-12-15T10:00:00+01:00",
                    "endDateTime": "2023-12-15T12:00:00+01:00",
                    "course": {
                        "id": "11-143398",
                        "label": "UE21 LOGISTIQUE",
                        "color": "#00ff00",
                        "type": "DIVERS",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 215891,
                            "label": "ENSAM-ME_A_AMPHI_1",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 186492,
                    "startDateTime": "2023-12-15T13:30:00+01:00",
                    "endDateTime": "2023-12-15T15:30:00+01:00",
                    "course": {
                        "id": "11-258849",
                        "label": "TD Mécanismes de déformation et microstructures FY",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45999,
                            "label": "Technopole_1B68",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 7493,
                            "displayname": "NATUREL Anne-Marie",
                            "email": "anne-marie.naturel@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275537,
                            "label": "5A MAPI"
                        }
                    ]
                },
                {
                    "id": 271368,
                    "startDateTime": "2023-12-15T13:30:00+01:00",
                    "endDateTime": "2023-12-15T15:30:00+01:00",
                    "course": {
                        "id": "11-189290",
                        "label": "CM Entreprenariat - Aspects Pratiques 5AINE",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 5456,
                            "displayname": "FARMER Hervé",
                            "email": "herve.farmer@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 278785,
                    "startDateTime": "2023-12-15T13:30:00+01:00",
                    "endDateTime": "2023-12-15T15:30:00+01:00",
                    "course": {
                        "id": "11-124310",
                        "label": "TD Techniques d'optimisation",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 218406,
                            "label": "ENSAM-ME_A_AMPHI_2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 510,
                            "displayname": "CHATIGNY Sébastien",
                            "email": "sebastien.chatigny@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 187698,
                    "startDateTime": "2023-12-15T13:30:00+01:00",
                    "endDateTime": "2023-12-15T16:30:00+01:00",
                    "course": {
                        "id": "11-189234",
                        "label": "CM Modélisation et optimisation moteur 5ASPM",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46001,
                            "label": "Technopole_1B95",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201500,
                            "displayname": "BEAULIEU Patricia",
                            "email": "pbeaulieu@aliceadsl.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162846,
                            "label": "5ASPM"
                        }
                    ]
                },
                {
                    "id": 37603,
                    "startDateTime": "2023-12-15T13:30:00+01:00",
                    "endDateTime": "2023-12-15T17:30:00+01:00",
                    "course": {
                        "id": "11-214349",
                        "label": "CM Technologies de l'information - ARENA 5ASCM3",
                        "color": "#ffffff",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 218021,
                            "label": "ISTEC PARIS",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11702,
                            "displayname": "DESROSIERS Dwayne",
                            "email": "dwayne.desrosiers@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162897,
                            "label": "5ASCM3"
                        }
                    ]
                },
                {
                    "id": 185472,
                    "startDateTime": "2023-12-15T13:30:00+01:00",
                    "endDateTime": "2023-12-15T17:30:00+01:00",
                    "course": {
                        "id": "11-257614",
                        "label": "CM Performance énergétique des bâtiments 5ANRJ",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 235498,
                            "displayname": "LAMARRE Lucas",
                            "email": "lucas.lamarre@orange.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 186231,
                    "startDateTime": "2023-12-15T13:30:00+01:00",
                    "endDateTime": "2023-12-15T17:30:00+01:00",
                    "course": {
                        "id": "11-56221",
                        "label": "CM Maillage avancé et optimisation CMAO",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201589,
                            "displayname": "JACQUIOT France",
                            "email": "france.jacquiot@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162842,
                            "label": "5ACMAO2"
                        },
                        {
                            "id": 162844,
                            "label": "5ACMAO1"
                        }
                    ]
                },
                {
                    "id": 193438,
                    "startDateTime": "2023-12-15T13:30:00+01:00",
                    "endDateTime": "2023-12-15T17:30:00+01:00",
                    "course": {
                        "id": "11-294380",
                        "label": "CM Maîtrise des conséquences 3A39",
                        "color": "#33ff33",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 230152,
                    "startDateTime": "2023-12-15T13:30:00+01:00",
                    "endDateTime": "2023-12-15T17:30:00+01:00",
                    "course": {
                        "id": "11-50137",
                        "label": "TP Projet Développement ",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46006,
                            "label": "Technopole_1B04",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 375803,
                            "displayname": "MARTINELLI Lionel",
                            "email": "lionel.martinelli@insa-strasbourg.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 259891,
                    "startDateTime": "2023-12-15T13:30:00+01:00",
                    "endDateTime": "2023-12-15T17:30:00+01:00",
                    "course": {
                        "id": "11-104245",
                        "label": "TD 6 Sigma - Lean Supply Chain",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46011,
                            "label": "Technopole_1B24",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 166061,
                            "displayname": "MICHEL Robert",
                            "email": "michel.robert@gmx.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        },
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 188123,
                    "startDateTime": "2023-12-15T15:30:00+01:00",
                    "endDateTime": "2023-12-15T17:30:00+01:00",
                    "course": {
                        "id": "11-189278",
                        "label": "CM Entreprenariat - Communication externe 5AINE",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 5456,
                            "displayname": "FARMER Hervé",
                            "email": "herve.farmer@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 349116,
                    "startDateTime": "2023-12-15T15:30:00+01:00",
                    "endDateTime": "2023-12-15T17:30:00+01:00",
                    "course": {
                        "id": "11-90476",
                        "label": "TP Critères de Dimensionnement des structures MAPI1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45960,
                            "label": "Technopole_2A19/1",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134965,
                            "displayname": "ARNOUX Violette",
                            "email": "violette.arnoux@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275526,
                            "label": "5A MAPI 1"
                        }
                    ]
                },
                {
                    "id": 187902,
                    "startDateTime": "2023-12-16T07:45:00+01:00",
                    "endDateTime": "2023-12-16T11:45:00+01:00",
                    "course": {
                        "id": "11-189235",
                        "label": "TP Modélisation et optimisation moteur 5ASPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 409670,
                            "displayname": "NORMAND Louise",
                            "email": "lnormand99@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 259916,
                    "startDateTime": "2023-12-16T07:45:00+01:00",
                    "endDateTime": "2023-12-16T11:45:00+01:00",
                    "course": {
                        "id": "11-104241",
                        "label": "CM Lean Supply Chain 5ASCM",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46011,
                            "label": "Technopole_1B24",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 166061,
                            "displayname": "MICHEL Robert",
                            "email": "michel.robert@gmx.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        },
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 194592,
                    "startDateTime": "2023-12-18T07:45:00+01:00",
                    "endDateTime": "2023-12-18T09:45:00+01:00",
                    "course": {
                        "id": "11-291095",
                        "label": "TD Modélisation et analyse des processus industriels 5AQUA",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120326,
                            "label": "Technopole_1A05",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 10934,
                            "displayname": "GROSJEAN Lucie",
                            "email": "lucie.grosjean@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        },
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 209022,
                    "startDateTime": "2023-12-18T07:45:00+01:00",
                    "endDateTime": "2023-12-18T09:45:00+01:00",
                    "course": {
                        "id": "11-47779",
                        "label": "TD Communication - Management MAI IPI4.0",
                        "color": "#f8ff38",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46072,
                            "label": "Technopole_3A40",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 9757,
                            "displayname": "DUPUYS Danielle",
                            "email": "danielle.dupuys@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        },
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 186431,
                    "startDateTime": "2023-12-18T07:45:00+01:00",
                    "endDateTime": "2023-12-18T11:45:00+01:00",
                    "course": {
                        "id": "11-122648",
                        "label": "TP Systèmes de stockage d'énergie 5ANRJ1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162857,
                            "label": "5ANRJ1"
                        }
                    ]
                },
                {
                    "id": 231156,
                    "startDateTime": "2023-12-18T07:45:00+01:00",
                    "endDateTime": "2023-12-18T11:45:00+01:00",
                    "course": {
                        "id": "11-231427",
                        "label": "Autonomie - Review of literature for Master's thesis",
                        "color": "#00ff00",
                        "type": "DIVERS",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46007,
                            "label": "Technopole_1B05",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 271401,
                    "startDateTime": "2023-12-18T08:45:00+01:00",
                    "endDateTime": "2023-12-18T11:45:00+01:00",
                    "course": {
                        "id": "11-189290",
                        "label": "CM Entreprenariat - Aspects Pratiques 5AINE",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201580,
                            "displayname": "WAGNER Benjamin",
                            "email": "benwagner06@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 228536,
                    "startDateTime": "2023-12-18T11:45:00+01:00",
                    "endDateTime": "2023-12-18T12:45:00+01:00",
                    "course": {
                        "id": "11-192683",
                        "label": "ALL 5A renforcé ECRIRE",
                        "color": "#ffffff",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120320,
                            "label": "Technopole_1A02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 174923,
                            "displayname": "POTTER Harry",
                            "email": "harry.potter@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 185867,
                            "label": "5A ALLEMAND"
                        }
                    ]
                },
                {
                    "id": 201240,
                    "startDateTime": "2023-12-18T13:00:00+01:00",
                    "endDateTime": "2023-12-18T15:00:00+01:00",
                    "course": {
                        "id": "11-234508",
                        "label": "CM Pilotage d'une Supply Chain 5ASCM DA",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46011,
                            "label": "Technopole_1B24",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11702,
                            "displayname": "DESROSIERS Dwayne",
                            "email": "dwayne.desrosiers@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        },
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 271346,
                    "startDateTime": "2023-12-18T13:30:00+01:00",
                    "endDateTime": "2023-12-18T15:30:00+01:00",
                    "course": {
                        "id": "11-189149",
                        "label": "TD Prévention des Pannes et Maîtrise des Disponibilités 5AMAI HJC",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201574,
                            "displayname": "BOURGIGNON Vincent",
                            "email": "vincent.bourgignon@sfr.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 318493,
                    "startDateTime": "2023-12-18T13:30:00+01:00",
                    "endDateTime": "2023-12-18T15:30:00+01:00",
                    "course": {
                        "id": "11-228000",
                        "label": "TD Commande et diagnostic des systèmes 5AQUA",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120324,
                            "label": "Technopole_1A04",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162887,
                            "label": "5AQUA"
                        }
                    ]
                },
                {
                    "id": 185421,
                    "startDateTime": "2023-12-18T13:30:00+01:00",
                    "endDateTime": "2023-12-18T16:30:00+01:00",
                    "course": {
                        "id": "11-257521",
                        "label": "CM Les financements de la R&D&I dans la filière Energie",
                        "color": "#0dff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 299915,
                            "displayname": "CAPALDI Larry",
                            "email": "larry.capaldi@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 271610,
                    "startDateTime": "2023-12-18T13:30:00+01:00",
                    "endDateTime": "2023-12-18T16:30:00+01:00",
                    "course": {
                        "id": "11-189284",
                        "label": "TD Entreprenariat - -Valeurs et société 5AINE",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120335,
                            "label": "Technopole_3A41",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 392088,
                            "displayname": "DELONG Adam",
                            "email": "adam.delong@tylop.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 96874,
                    "startDateTime": "2023-12-18T13:30:00+01:00",
                    "endDateTime": "2023-12-18T17:30:00+01:00",
                    "course": {
                        "id": "11-122577",
                        "label": "TP Intégration et applications de la robotique 1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": true,
                        "url": "https://arche.univ-lorraine.fr/course/view.php?id=68341"
                    },
                    "rooms": [
                        {
                            "id": 45976,
                            "label": "Technopole_-1B27",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 339077,
                            "displayname": "TRUFFEAU Jacques",
                            "email": "jacques.truffeau@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 219147,
                            "label": "5A IP4.0 1"
                        }
                    ]
                },
                {
                    "id": 98333,
                    "startDateTime": "2023-12-18T13:30:00+01:00",
                    "endDateTime": "2023-12-18T17:30:00+01:00",
                    "course": {
                        "id": "11-221450",
                        "label": "TP Techniques d'optimisation 2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120319,
                            "label": "Technopole_-1B36",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 229668,
                            "displayname": "CLERC Axel",
                            "email": "axel.clerc@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 219152,
                            "label": "5A IP4.0 2"
                        }
                    ]
                },
                {
                    "id": 185398,
                    "startDateTime": "2023-12-18T13:30:00+01:00",
                    "endDateTime": "2023-12-18T17:30:00+01:00",
                    "course": {
                        "id": "11-251971",
                        "label": "TP Analyse modale expérimentale CMAO1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 248518,
                            "label": "-1B41/2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 186991,
                            "displayname": "POUCHARD Louis",
                            "email": "louis.pouchard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162844,
                            "label": "5ACMAO1"
                        }
                    ]
                },
                {
                    "id": 185637,
                    "startDateTime": "2023-12-18T13:30:00+01:00",
                    "endDateTime": "2023-12-18T17:30:00+01:00",
                    "course": {
                        "id": "11-251963",
                        "label": "TP Critères de dimensionnement des structures CMAO2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 339172,
                            "displayname": "GARNIER Hugo",
                            "email": "hugo.garnier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162842,
                            "label": "5ACMAO2"
                        }
                    ]
                },
                {
                    "id": 189495,
                    "startDateTime": "2023-12-18T13:30:00+01:00",
                    "endDateTime": "2023-12-18T17:30:00+01:00",
                    "course": {
                        "id": "11-81576",
                        "label": "TP Simulation d'écoulements SMP1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45955,
                            "label": "Technopole_1A39",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 144298,
                            "displayname": "LATOURELLE Charlyne",
                            "email": "charlyne.latourelle@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 189664,
                    "startDateTime": "2023-12-18T13:30:00+01:00",
                    "endDateTime": "2023-12-18T17:30:00+01:00",
                    "course": {
                        "id": "11-233759",
                        "label": "TP Conception surfacique 5ASPM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": true,
                        "url": "https://arche.univ-lorraine.fr/course/view.php?id=66071"
                    },
                    "rooms": [
                        {
                            "id": 46078,
                            "label": "Technopole_2A19/2",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 144299,
                            "displayname": "LAKARIM Clarice",
                            "email": "clarice.lakarim@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 230065,
                    "startDateTime": "2023-12-18T13:30:00+01:00",
                    "endDateTime": "2023-12-18T17:30:00+01:00",
                    "course": {
                        "id": "11-50932",
                        "label": "TP Système de communication",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45978,
                            "label": "Technopole_-1B38",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 669,
                            "displayname": "HARRIS Ernest",
                            "email": "ernest.harris@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 231119,
                    "startDateTime": "2023-12-18T13:30:00+01:00",
                    "endDateTime": "2023-12-18T17:30:00+01:00",
                    "course": {
                        "id": "11-48051",
                        "label": "TP Transverse Project",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 343513,
                            "label": "Technopole_-1B47/1",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168224,
                            "displayname": "PRUNEL Lina",
                            "email": "lina.prunel@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 349112,
                    "startDateTime": "2023-12-18T13:30:00+01:00",
                    "endDateTime": "2023-12-18T17:30:00+01:00",
                    "course": {
                        "id": "11-90476",
                        "label": "TP Critères de Dimensionnement des structures MAPI1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45960,
                            "label": "Technopole_2A19/1",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134965,
                            "displayname": "ARNOUX Violette",
                            "email": "violette.arnoux@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275526,
                            "label": "5A MAPI 1"
                        }
                    ]
                },
                {
                    "id": 271347,
                    "startDateTime": "2023-12-18T15:30:00+01:00",
                    "endDateTime": "2023-12-18T17:30:00+01:00",
                    "course": {
                        "id": "11-189149",
                        "label": "TD Prévention des Pannes et Maîtrise des Disponibilités 5AMAI HJC",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201574,
                            "displayname": "BOURGIGNON Vincent",
                            "email": "vincent.bourgignon@sfr.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 271353,
                    "startDateTime": "2023-12-19T07:45:00+01:00",
                    "endDateTime": "2023-12-19T09:45:00+01:00",
                    "course": {
                        "id": "11-189149",
                        "label": "TD Prévention des Pannes et Maîtrise des Disponibilités 5AMAI HJC",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201574,
                            "displayname": "BOURGIGNON Vincent",
                            "email": "vincent.bourgignon@sfr.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 36421,
                    "startDateTime": "2023-12-19T07:45:00+01:00",
                    "endDateTime": "2023-12-19T11:45:00+01:00",
                    "course": {
                        "id": "11-251998",
                        "label": "🎥 TD Communication Management CMAO",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 292695,
                            "label": "En direct à distance",
                            "type": "SYNCHRONE",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 9757,
                            "displayname": "DUPUYS Danielle",
                            "email": "danielle.dupuys@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162840,
                            "label": "5ACMAO"
                        }
                    ]
                },
                {
                    "id": 188820,
                    "startDateTime": "2023-12-19T07:45:00+01:00",
                    "endDateTime": "2023-12-19T11:45:00+01:00",
                    "course": {
                        "id": "11-141502",
                        "label": "TP Analyse modale experimentale 5ASPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 248518,
                            "label": "-1B41/2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 186991,
                            "displayname": "POUCHARD Louis",
                            "email": "louis.pouchard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 189218,
                    "startDateTime": "2023-12-19T07:45:00+01:00",
                    "endDateTime": "2023-12-19T11:45:00+01:00",
                    "course": {
                        "id": "11-141955",
                        "label": "TP Techniques expérimentales 5ASPM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 96036,
                            "label": "Technopole_-1B41/1",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 125533,
                            "displayname": "LEPAGE Karim",
                            "email": "karim.lepage@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 194594,
                    "startDateTime": "2023-12-19T07:45:00+01:00",
                    "endDateTime": "2023-12-19T11:45:00+01:00",
                    "course": {
                        "id": "11-227998",
                        "label": "TP Commande et diagnostic des systèmes 5AQUA1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45953,
                            "label": "Technopole_1A37",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        }
                    ]
                },
                {
                    "id": 223472,
                    "startDateTime": "2023-12-19T07:45:00+01:00",
                    "endDateTime": "2023-12-19T11:45:00+01:00",
                    "course": {
                        "id": "11-90879",
                        "label": "TP Métallurgie des poudres et fabrication additive MAPI1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45955,
                            "label": "Technopole_1A39",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        },
                        {
                            "id": 45983,
                            "label": "Technopole_-1B76/3",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134963,
                            "displayname": "PELLETIER Lucas",
                            "email": "lucas.pelletier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275526,
                            "label": "5A MAPI 1"
                        }
                    ]
                },
                {
                    "id": 303623,
                    "startDateTime": "2023-12-19T07:45:00+01:00",
                    "endDateTime": "2023-12-19T11:45:00+01:00",
                    "course": {
                        "id": "11-157888",
                        "label": "TP Gestion de projets 5ASCM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45954,
                            "label": "Technopole_1A38",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 510,
                            "displayname": "CHATIGNY Sébastien",
                            "email": "sebastien.chatigny@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 190383,
                    "startDateTime": "2023-12-19T08:45:00+01:00",
                    "endDateTime": "2023-12-19T11:45:00+01:00",
                    "course": {
                        "id": "11-189294",
                        "label": "TD Entreprenariat - Hygiène Sécurité Psychologie 5AINE",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11712,
                            "displayname": "DUPAIN Marinette",
                            "email": "m.dupain@yahoo.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 191678,
                    "startDateTime": "2023-12-19T08:45:00+01:00",
                    "endDateTime": "2023-12-19T11:45:00+01:00",
                    "course": {
                        "id": "11-148272",
                        "label": "TD Connaissance de soi et des autres - 3A39",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 2043,
                            "displayname": "LEROY Romain",
                            "email": "romain.leroy@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 230063,
                    "startDateTime": "2023-12-19T09:45:00+01:00",
                    "endDateTime": "2023-12-19T11:45:00+01:00",
                    "course": {
                        "id": "11-51341",
                        "label": "TP Fusion multi-capteurs",
                        "color": "#03fff2",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45952,
                            "label": "Technopole_1A36",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 553,
                            "displayname": "COLLIN Valerie",
                            "email": "valerie.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 271354,
                    "startDateTime": "2023-12-19T09:45:00+01:00",
                    "endDateTime": "2023-12-19T11:45:00+01:00",
                    "course": {
                        "id": "11-189149",
                        "label": "TD Prévention des Pannes et Maîtrise des Disponibilités 5AMAI HJC",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201574,
                            "displayname": "BOURGIGNON Vincent",
                            "email": "vincent.bourgignon@sfr.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 55591,
                    "startDateTime": "2023-12-19T12:45:00+01:00",
                    "endDateTime": "2023-12-19T13:15:00+01:00",
                    "course": {
                        "id": "11-103829",
                        "label": "ESP 5A renforcé ECRIRE",
                        "color": "#ffffff",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120320,
                            "label": "Technopole_1A02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168115,
                            "displayname": "GAUTIER Juliette",
                            "email": "juliette.gautier@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 205266,
                            "label": "5A ESPAGNOL"
                        }
                    ]
                },
                {
                    "id": 271349,
                    "startDateTime": "2023-12-19T13:30:00+01:00",
                    "endDateTime": "2023-12-19T15:30:00+01:00",
                    "course": {
                        "id": "11-189149",
                        "label": "TD Prévention des Pannes et Maîtrise des Disponibilités 5AMAI HJC",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201574,
                            "displayname": "BOURGIGNON Vincent",
                            "email": "vincent.bourgignon@sfr.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 98335,
                    "startDateTime": "2023-12-19T13:30:00+01:00",
                    "endDateTime": "2023-12-19T17:30:00+01:00",
                    "course": {
                        "id": "11-122230",
                        "label": "TP Techniques d'optimisation 1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120319,
                            "label": "Technopole_-1B36",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 229668,
                            "displayname": "CLERC Axel",
                            "email": "axel.clerc@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 219147,
                            "label": "5A IP4.0 1"
                        }
                    ]
                },
                {
                    "id": 185403,
                    "startDateTime": "2023-12-19T13:30:00+01:00",
                    "endDateTime": "2023-12-19T17:30:00+01:00",
                    "course": {
                        "id": "11-251968",
                        "label": "TP Analyse modale expérimentale CMAO2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 248518,
                            "label": "-1B41/2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 186991,
                            "displayname": "POUCHARD Louis",
                            "email": "louis.pouchard@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162842,
                            "label": "5ACMAO2"
                        }
                    ]
                },
                {
                    "id": 185634,
                    "startDateTime": "2023-12-19T13:30:00+01:00",
                    "endDateTime": "2023-12-19T17:30:00+01:00",
                    "course": {
                        "id": "11-251964",
                        "label": "TP Critères de dimensionnement des structures CMAO1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 398293,
                            "displayname": "PARISEAU Olivier",
                            "email": "olivier.pariseau@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162844,
                            "label": "5ACMAO1"
                        }
                    ]
                },
                {
                    "id": 190319,
                    "startDateTime": "2023-12-19T13:30:00+01:00",
                    "endDateTime": "2023-12-19T17:30:00+01:00",
                    "course": {
                        "id": "11-124175",
                        "label": "TP Intégration et applications de la robotique 2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": true,
                        "url": "https://arche.univ-lorraine.fr/course/view.php?id=68341"
                    },
                    "rooms": [
                        {
                            "id": 45976,
                            "label": "Technopole_-1B27",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 339077,
                            "displayname": "TRUFFEAU Jacques",
                            "email": "jacques.truffeau@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 219152,
                            "label": "5A IP4.0 2"
                        }
                    ]
                },
                {
                    "id": 194596,
                    "startDateTime": "2023-12-19T13:30:00+01:00",
                    "endDateTime": "2023-12-19T17:30:00+01:00",
                    "course": {
                        "id": "11-145291",
                        "label": "TP Commande et diagnostic des systèmes 5AQUA2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45955,
                            "label": "Technopole_1A39",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 231128,
                    "startDateTime": "2023-12-19T13:30:00+01:00",
                    "endDateTime": "2023-12-19T17:30:00+01:00",
                    "course": {
                        "id": "11-231427",
                        "label": "Autonomie - Review of literature for Master's thesis",
                        "color": "#00ff00",
                        "type": "DIVERS",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46007,
                            "label": "Technopole_1B05",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 259925,
                    "startDateTime": "2023-12-19T13:30:00+01:00",
                    "endDateTime": "2023-12-19T17:30:00+01:00",
                    "course": {
                        "id": "11-233915",
                        "label": "TD Gestion de la  chaine Logistique Aval 5ASCM",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46011,
                            "label": "Technopole_1B24",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 255801,
                            "displayname": "LAFON Alexis",
                            "email": "lafonalexis@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162893,
                            "label": "5ASCM1"
                        },
                        {
                            "id": 162895,
                            "label": "5ASCM2"
                        }
                    ]
                },
                {
                    "id": 271352,
                    "startDateTime": "2023-12-19T15:30:00+01:00",
                    "endDateTime": "2023-12-19T17:30:00+01:00",
                    "course": {
                        "id": "11-189149",
                        "label": "TD Prévention des Pannes et Maîtrise des Disponibilités 5AMAI HJC",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46000,
                            "label": "Technopole_1B91",
                            "type": "Bureau fermé, Open space",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201574,
                            "displayname": "BOURGIGNON Vincent",
                            "email": "vincent.bourgignon@sfr.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        }
                    ]
                },
                {
                    "id": 194412,
                    "startDateTime": "2023-12-20T07:45:00+01:00",
                    "endDateTime": "2023-12-20T09:45:00+01:00",
                    "course": {
                        "id": "11-291095",
                        "label": "TD Modélisation et analyse des processus industriels 5AQUA",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120326,
                            "label": "Technopole_1A05",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 10934,
                            "displayname": "GROSJEAN Lucie",
                            "email": "lucie.grosjean@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 193008,
                            "label": "5A QUA1"
                        },
                        {
                            "id": 193010,
                            "label": "5A QUA2"
                        }
                    ]
                },
                {
                    "id": 209099,
                    "startDateTime": "2023-12-20T07:45:00+01:00",
                    "endDateTime": "2023-12-20T09:45:00+01:00",
                    "course": {
                        "id": "11-47779",
                        "label": "🎥 TD Communication - Management MAI IPI4.0",
                        "color": "#f8ff38",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 292695,
                            "label": "En direct à distance",
                            "type": "SYNCHRONE",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 9757,
                            "displayname": "DUPUYS Danielle",
                            "email": "danielle.dupuys@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        },
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 185827,
                    "startDateTime": "2023-12-20T07:45:00+01:00",
                    "endDateTime": "2023-12-20T11:45:00+01:00",
                    "course": {
                        "id": "11-251986",
                        "label": "TP Spécifiations géométriques CMAO1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120307,
                            "label": "Technopole_-1B28",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 198465,
                            "displayname": "LACIEN Amélie",
                            "email": "amelie.lacien@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162844,
                            "label": "5ACMAO1"
                        }
                    ]
                },
                {
                    "id": 230181,
                    "startDateTime": "2023-12-20T07:45:00+01:00",
                    "endDateTime": "2023-12-20T11:45:00+01:00",
                    "course": {
                        "id": "11-31982",
                        "label": "TP Projet Développement",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46006,
                            "label": "Technopole_1B04",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 553,
                            "displayname": "COLLIN Valerie",
                            "email": "valerie.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 374594,
                            "label": "5A VEHA1"
                        }
                    ]
                },
                {
                    "id": 291792,
                    "startDateTime": "2023-12-20T08:45:00+01:00",
                    "endDateTime": "2023-12-20T11:45:00+01:00",
                    "course": {
                        "id": "11-189278",
                        "label": "CM Entreprenariat - Communication externe 5AINE",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201584,
                            "displayname": "POMPIDOU Michael",
                            "email": "m.pompidou@az-sas.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 190008,
                    "startDateTime": "2023-12-20T09:45:00+01:00",
                    "endDateTime": "2023-12-20T11:45:00+01:00",
                    "course": {
                        "id": "11-189238",
                        "label": "TP Développement monoplace 5ASPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46001,
                            "label": "Technopole_1B95",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 929,
                            "displayname": "RENAUD Baptiste",
                            "email": "baptiste.renaud@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 191695,
                    "startDateTime": "2023-12-20T09:45:00+01:00",
                    "endDateTime": "2023-12-20T11:45:00+01:00",
                    "course": {
                        "id": "11-148272",
                        "label": "TD Connaissance de soi et des autres - 3A39",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 2043,
                            "displayname": "LEROY Romain",
                            "email": "romain.leroy@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 194603,
                    "startDateTime": "2023-12-20T09:45:00+01:00",
                    "endDateTime": "2023-12-20T11:45:00+01:00",
                    "course": {
                        "id": "11-228001",
                        "label": "CM Commande et diagnostic des systèmes 5AQUA",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45998,
                            "label": "Technopole_1A10",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 12709,
                            "displayname": "COLLIN Roland",
                            "email": "roland.collin@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162887,
                            "label": "5AQUA"
                        }
                    ]
                },
                {
                    "id": 209100,
                    "startDateTime": "2023-12-20T09:45:00+01:00",
                    "endDateTime": "2023-12-20T11:45:00+01:00",
                    "course": {
                        "id": "11-47779",
                        "label": "🎥 TD Communication - Management MAI IPI4.0",
                        "color": "#f8ff38",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 292695,
                            "label": "En direct à distance",
                            "type": "SYNCHRONE",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 9757,
                            "displayname": "DUPUYS Danielle",
                            "email": "danielle.dupuys@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        },
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 231131,
                    "startDateTime": "2023-12-20T09:45:00+01:00",
                    "endDateTime": "2023-12-20T11:45:00+01:00",
                    "course": {
                        "id": "11-51968",
                        "label": "EXAMEN Mechanical Behaviour of biological tissues",
                        "color": "#ff0000",
                        "type": "EXAMEN",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120320,
                            "label": "Technopole_1A02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168226,
                            "displayname": "FAURE Jacques",
                            "email": "jacques.faure@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 193581,
                    "startDateTime": "2023-12-20T13:30:00+01:00",
                    "endDateTime": "2023-12-20T15:30:00+01:00",
                    "course": {
                        "id": "11-145716",
                        "label": "TP Projet étude de cas 3A39",
                        "color": "#9999ff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [
                        {
                            "id": 2043,
                            "displayname": "LEROY Romain",
                            "email": "romain.leroy@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 278791,
                    "startDateTime": "2023-12-20T13:30:00+01:00",
                    "endDateTime": "2023-12-20T15:30:00+01:00",
                    "course": {
                        "id": "11-124310",
                        "label": "TD Techniques d'optimisation",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 218406,
                            "label": "ENSAM-ME_A_AMPHI_2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 510,
                            "displayname": "CHATIGNY Sébastien",
                            "email": "sebastien.chatigny@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 185824,
                    "startDateTime": "2023-12-20T13:30:00+01:00",
                    "endDateTime": "2023-12-20T17:30:00+01:00",
                    "course": {
                        "id": "11-251987",
                        "label": "TP Spécifiations géométriques CMAO2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 120307,
                            "label": "Technopole_-1B28",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 198465,
                            "displayname": "LACIEN Amélie",
                            "email": "amelie.lacien@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162842,
                            "label": "5ACMAO2"
                        }
                    ]
                },
                {
                    "id": 189425,
                    "startDateTime": "2023-12-20T13:30:00+01:00",
                    "endDateTime": "2023-12-20T17:30:00+01:00",
                    "course": {
                        "id": "11-81576",
                        "label": "TP Simulation d'écoulements SMP1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45954,
                            "label": "Technopole_1A38",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 144298,
                            "displayname": "LATOURELLE Charlyne",
                            "email": "charlyne.latourelle@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 349109,
                    "startDateTime": "2023-12-20T13:30:00+01:00",
                    "endDateTime": "2023-12-20T17:30:00+01:00",
                    "course": {
                        "id": "11-90476",
                        "label": "TP Critères de Dimensionnement des structures MAPI1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45960,
                            "label": "Technopole_2A19/1",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 134965,
                            "displayname": "ARNOUX Violette",
                            "email": "violette.arnoux@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275526,
                            "label": "5A MAPI 1"
                        }
                    ]
                },
                {
                    "id": 190010,
                    "startDateTime": "2023-12-20T15:30:00+01:00",
                    "endDateTime": "2023-12-20T17:30:00+01:00",
                    "course": {
                        "id": "11-142134",
                        "label": "TP Développement monoplace 5ASPM2",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46001,
                            "label": "Technopole_1B95",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 929,
                            "displayname": "RENAUD Baptiste",
                            "email": "baptiste.renaud@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 151485,
                            "label": "5ASPM2"
                        }
                    ]
                },
                {
                    "id": 194602,
                    "startDateTime": "2023-12-20T15:30:00+01:00",
                    "endDateTime": "2023-12-20T17:30:00+01:00",
                    "course": {
                        "id": "11-133856",
                        "label": "TD Management de projet",
                        "color": "#fff708",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46070,
                            "label": "Technopole_3A44",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 510,
                            "displayname": "CHATIGNY Sébastien",
                            "email": "sebastien.chatigny@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162887,
                            "label": "5AQUA"
                        }
                    ]
                },
                {
                    "id": 209023,
                    "startDateTime": "2023-12-21T07:45:00+01:00",
                    "endDateTime": "2023-12-21T09:45:00+01:00",
                    "course": {
                        "id": "11-47779",
                        "label": "🎥 TD Communication - Management MAI IPI4.0",
                        "color": "#f8ff38",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 292695,
                            "label": "En direct à distance",
                            "type": "SYNCHRONE",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 9757,
                            "displayname": "DUPUYS Danielle",
                            "email": "danielle.dupuys@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        },
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 189220,
                    "startDateTime": "2023-12-21T07:45:00+01:00",
                    "endDateTime": "2023-12-21T11:45:00+01:00",
                    "course": {
                        "id": "11-141954",
                        "label": "TP Techniques expérimentales 5ASPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 96036,
                            "label": "Technopole_-1B41/1",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 125533,
                            "displayname": "LEPAGE Karim",
                            "email": "karim.lepage@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 231127,
                    "startDateTime": "2023-12-21T07:45:00+01:00",
                    "endDateTime": "2023-12-21T11:45:00+01:00",
                    "course": {
                        "id": "11-78112",
                        "label": "TP Transverse Project",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 343513,
                            "label": "Technopole_-1B47/1",
                            "type": "Salle de TP, Laboratoires, Atelier",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 168224,
                            "displayname": "PRUNEL Lina",
                            "email": "lina.prunel@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162851,
                            "label": "5ABIO"
                        }
                    ]
                },
                {
                    "id": 272699,
                    "startDateTime": "2023-12-21T07:45:00+01:00",
                    "endDateTime": "2023-12-21T11:45:00+01:00",
                    "course": {
                        "id": "11-257605",
                        "label": "TP Caméras thermiques 5ANRJ1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 151881,
                            "label": "-1B69/2",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 167656,
                            "displayname": "DUVAL René",
                            "email": "rene.duval@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162857,
                            "label": "5ANRJ1"
                        }
                    ]
                },
                {
                    "id": 193430,
                    "startDateTime": "2023-12-21T08:45:00+01:00",
                    "endDateTime": "2023-12-21T11:45:00+01:00",
                    "course": {
                        "id": "11-222812",
                        "label": "Concours d'éloquence",
                        "color": "#cccccc",
                        "type": "",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46008,
                            "label": "Technopole_AUDITORIUM B. BOLLE",
                            "type": "Amphithéâtre",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 2043,
                            "displayname": "LEROY Romain",
                            "email": "romain.leroy@gmail.com"
                        }
                    ],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 195459,
                    "startDateTime": "2023-12-21T08:45:00+01:00",
                    "endDateTime": "2023-12-21T11:45:00+01:00",
                    "course": {
                        "id": "11-189294",
                        "label": "TD Entreprenariat - Hygiène Sécurité Psychologie 5AINE",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 11712,
                            "displayname": "DUPAIN Marinette",
                            "email": "m.dupain@yahoo.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 209024,
                    "startDateTime": "2023-12-21T09:45:00+01:00",
                    "endDateTime": "2023-12-21T11:45:00+01:00",
                    "course": {
                        "id": "11-47779",
                        "label": "🎥 TD Communication - Management MAI IPI4.0",
                        "color": "#f8ff38",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 292695,
                            "label": "En direct à distance",
                            "type": "SYNCHRONE",
                            "building": ""
                        }
                    ],
                    "teachers": [
                        {
                            "id": 9757,
                            "displayname": "DUPUYS Danielle",
                            "email": "danielle.dupuys@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162883,
                            "label": "5AMAI"
                        },
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 188638,
                    "startDateTime": "2023-12-21T13:30:00+01:00",
                    "endDateTime": "2023-12-21T17:30:00+01:00",
                    "course": {
                        "id": "11-141039",
                        "label": "TP Critères de dimensionnement des structures 5ASPM1",
                        "color": "#00ffff",
                        "type": "TP",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45961,
                            "label": "Technopole_2A20",
                            "type": "Salle multimédia",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 398293,
                            "displayname": "PARISEAU Olivier",
                            "email": "olivier.pariseau@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162849,
                            "label": "5ASPM1"
                        }
                    ]
                },
                {
                    "id": 193139,
                    "startDateTime": "2023-12-22T07:45:00+01:00",
                    "endDateTime": "2023-12-22T09:45:00+01:00",
                    "course": {
                        "id": "11-294389",
                        "label": "CM Posture de l'acteur de la sécurité 3A39",
                        "color": "#66ff66",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 187169,
                    "startDateTime": "2023-12-22T07:45:00+01:00",
                    "endDateTime": "2023-12-22T11:45:00+01:00",
                    "course": {
                        "id": "11-189234",
                        "label": "CM Modélisation et optimisation moteur 5ASPM",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46001,
                            "label": "Technopole_1B95",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201500,
                            "displayname": "BEAULIEU Patricia",
                            "email": "pbeaulieu@aliceadsl.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162846,
                            "label": "5ASPM"
                        }
                    ]
                },
                {
                    "id": 185349,
                    "startDateTime": "2023-12-22T08:45:00+01:00",
                    "endDateTime": "2023-12-22T11:45:00+01:00",
                    "course": {
                        "id": "11-257523",
                        "label": "CM Les filières éolienne et solaire 5ANRJ",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 229654,
                            "displayname": "DUTRONC Blaise",
                            "email": "blaise.dutronc@tgb-societe.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                },
                {
                    "id": 193140,
                    "startDateTime": "2023-12-22T09:45:00+01:00",
                    "endDateTime": "2023-12-22T11:45:00+01:00",
                    "course": {
                        "id": "11-294389",
                        "label": "CM Posture de l'acteur de la sécurité 3A39",
                        "color": "#66ff66",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 232982,
                            "label": "5A MCS"
                        }
                    ]
                },
                {
                    "id": 279133,
                    "startDateTime": "2023-12-22T10:00:00+01:00",
                    "endDateTime": "2023-12-22T12:00:00+01:00",
                    "course": {
                        "id": "11-143398",
                        "label": "UE21 LOGISTIQUE",
                        "color": "#00ff00",
                        "type": "DIVERS",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 215891,
                            "label": "ENSAM-ME_A_AMPHI_1",
                            "type": "",
                            "building": ""
                        }
                    ],
                    "teachers": [],
                    "groups": [
                        {
                            "id": 162919,
                            "label": "5A IPI4.0"
                        }
                    ]
                },
                {
                    "id": 271675,
                    "startDateTime": "2023-12-22T13:15:00+01:00",
                    "endDateTime": "2023-12-22T16:15:00+01:00",
                    "course": {
                        "id": "11-189293",
                        "label": "CM Entreprenariat - Hygiène Sécurité Psychologie 5AINE",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 344231,
                            "label": "Technopole_0A55",
                            "type": "Salle de réunion, Salle de séminaire",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 204513,
                            "displayname": "RICHARD Daniel",
                            "email": "daniel.richard@laposte.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162875,
                            "label": "5AINE"
                        }
                    ]
                },
                {
                    "id": 186511,
                    "startDateTime": "2023-12-22T13:30:00+01:00",
                    "endDateTime": "2023-12-22T15:30:00+01:00",
                    "course": {
                        "id": "11-239287",
                        "label": "CM Mécanismes de déformation et microstructures FY",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 45999,
                            "label": "Technopole_1B68",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 7493,
                            "displayname": "NATUREL Anne-Marie",
                            "email": "anne-marie.naturel@univ-lorraine.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 275537,
                            "label": "5A MAPI"
                        }
                    ]
                },
                {
                    "id": 187478,
                    "startDateTime": "2023-12-22T13:30:00+01:00",
                    "endDateTime": "2023-12-22T16:30:00+01:00",
                    "course": {
                        "id": "11-189234",
                        "label": "CM Modélisation et optimisation moteur 5ASPM",
                        "color": "#00ff00",
                        "type": "CM",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46001,
                            "label": "Technopole_1B95",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 201500,
                            "displayname": "BEAULIEU Patricia",
                            "email": "pbeaulieu@aliceadsl.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162846,
                            "label": "5ASPM"
                        }
                    ]
                },
                {
                    "id": 185484,
                    "startDateTime": "2023-12-22T13:30:00+01:00",
                    "endDateTime": "2023-12-22T17:30:00+01:00",
                    "course": {
                        "id": "11-257632",
                        "label": "TD Performance énergétique des bâtiments 5ANRJ",
                        "color": "#ffff00",
                        "type": "TD",
                        "online": false,
                        "url": null
                    },
                    "rooms": [
                        {
                            "id": 46004,
                            "label": "Technopole_1B02",
                            "type": "Salle banalisée",
                            "building": "ENIM"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 235498,
                            "displayname": "LAMARRE Lucas",
                            "email": "lucas.lamarre@orange.fr"
                        }
                    ],
                    "groups": [
                        {
                            "id": 162855,
                            "label": "5ANRJ"
                        }
                    ]
                }
            ]
        }
    ]
};

const msInWeek = 1000 * 60 * 60 * 24 * 7;

let minDate = new Date(8_640_000_000_000_000);
let maxDate = new Date(-8_640_000_000_000_000);
schedule.plannings.forEach((planning) => {
    planning.events.forEach((event) => {
        const startDateTime = new Date(event.startDateTime);
        const endDateTime = new Date(event.endDateTime);
        if (startDateTime < minDate) {
            minDate = startDateTime;
        }
        if (endDateTime > maxDate) {
            maxDate = endDateTime;
        }
    });
});

const moyDate = new Date((minDate.getTime() + maxDate.getTime()) / 2);
const delta = Math.ceil(Math.abs(new Date().getTime() - moyDate.getTime()) / msInWeek) * msInWeek;

schedule.plannings.forEach((planning) => {
    planning.events.forEach((event) => {
        event.startDateTime = new Date(new Date(event.startDateTime).getTime() + delta).toISOString();
        event.endDateTime = new Date(new Date(event.endDateTime).getTime() + delta).toISOString();
    });
});

module.exports.scheduleData = schedule;
