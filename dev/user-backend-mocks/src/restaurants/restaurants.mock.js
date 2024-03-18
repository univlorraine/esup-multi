const now = new Date().getTime();
const msInDay = 1000 * 60 * 60 * 24;

function getDate(day) {
    return (new Date(now + day * msInDay)).toISOString().split('T')[0];
}

module.exports.menusData = [
    {
        "id": 1372995,
        "date": getDate(0),
        "meal": [
            {
                "name": "midi",
                "foodcategory": [
                    {
                        "name": "Chaine traditionnelle",
                        "dishes": [
                            "Paupiette de veau Marengo ( 7 Points)",
                            "Jambon grillé sauce madère ( 6 Points)",
                            "VG couscous falafels ( 6 Points)",
                            "Pâtes gorgonzola ( 5 Points)",
                            "Semoule de couscous",
                            "Haricots beurre"
                        ]
                    },
                    {
                        "name": "Brasserie",
                        "dishes": [
                            "Paupiette de veau Marengo ( 7 Points)",
                            "Cœur de Rumsteak ( 7 Points)",
                            "Pâtes gorgonzola ( 5 Points)",
                            "Steak haché de bœuf frais ( 6 Points)",
                            "Boudin noir aux pommes ( 5 Points)",
                            "Jambon grillé sauce madère ( 6 Points)",
                            "Poulet fermier ( 7 Points)",
                            "VG couscous falafels ( 6 Points)",
                            "Ratatouille niçoise",
                            "Haricots beurre",
                            "Semoule de couscous",
                            "Frites"
                        ]
                    }
                ]
            },
            {
                "name": "soir",
                "foodcategory": [
                    {
                        "name": "Chaine traditionnelle",
                        "dishes": [
                            "Chipolatas ( 5 Points)",
                            "Poisson à la bordelaise ( 6 Points)",
                            "Ratatouille niçoise",
                            "Ebly aux petits légumes"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 1373000,
        "date": getDate(1),
        "meal": [
            {
                "name": "midi",
                "foodcategory": [
                    {
                        "name": "Chaine traditionnelle",
                        "dishes": [
                            "Nugget's de poulet ( 5 Points)",
                            "Poisson blanc aux amandes ( 6 Points)",
                            "Pâtes sauce champignons ( 6 Points)",
                            "Rôti de porc sauce forestière ( 7 Points)",
                            "Gratin dauphinois",
                            "Brunoise provençale"
                        ]
                    },
                    {
                        "name": "Brasserie",
                        "dishes": [
                            "FERME"
                        ]
                    }
                ]
            },
            {
                "name": "soir",
                "foodcategory": [
                    {
                        "name": "Chaine traditionnelle",
                        "dishes": [
                            "FERME"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 1373001,
        "date": getDate(2),
        "meal": [
            {
                "name": "midi",
                "foodcategory": [
                    {
                        "name": "Chaine traditionnelle",
                        "dishes": [
                            "Poulet wings tex mex ( 6 Points)",
                            "Pâtes sauce poivrons ( 5 Points)",
                            "VG chili au soja ( 6 Points)",
                            "Saucisse rougail ( 5 Points)",
                            "Riz pilaf",
                            "Poêlée orientale"
                        ]
                    },
                    {
                        "name": "Brasserie",
                        "dishes": [
                            "Steak haché de bœuf frais ( 6 Points)",
                            "Faux filet de bœuf ( 7 Points)",
                            "Jarret de porc braisé ( 7 Points+)",
                            "Poulet fermier ( 7 Points)",
                            "Poulet wings tex mex ( 6 Points)",
                            "Pâtes sauce poivrons ( 5 Points)",
                            "VG chili au soja ( 6 Points)",
                            "Saucisse rougail ( 5 Points)",
                            "Duo de carottes",
                            "Poêlée orientale",
                            "Riz pilaf",
                            "Frites"
                        ]
                    }
                ]
            },
            {
                "name": "soir",
                "foodcategory": [
                    {
                        "name": "Chaine traditionnelle",
                        "dishes": [
                            "Lasagne de bœuf ( 6 Points)",
                            "Fish and chips ( 5 Points)",
                            "Riz aux petits légumes",
                            "Brunoise provençale"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 1373002,
        "date": getDate(3),
        "meal": [
            {
                "name": "midi",
                "foodcategory": [
                    {
                        "name": "Chaine traditionnelle",
                        "dishes": [
                            "Bœuf bourguignon ( 7 Points)",
                            "Quenelle de volaille sauce champignons ( 5 Points)",
                            "Omelette basquaise ( 5 points)",
                            "VG lasagne chèvre et épinards ( 7 Points)",
                            "Chou fleur à la polonaise",
                            "Pâtes"
                        ]
                    },
                    {
                        "name": "Brasserie",
                        "dishes": [
                            "Hamburger maison ( 7 Points+)",
                            "Steak haché de bœuf frais ( 6 Points)",
                            "Poulet fermier ( 7 Points)",
                            "Quenelle de volaille sauce champignons ( 5 Points)",
                            "Omelette basquaise ( 5 Points)",
                            "VG lasagne chèvre et épinards ( 7 Points)",
                            "Bœuf bourguignon ( 7 Points)",
                            "Chou fleur à la polonaise",
                            "Bâtonnière de légume",
                            "Pâtes",
                            "Frites"
                        ]
                    }
                ]
            },
            {
                "name": "soir",
                "foodcategory": [
                    {
                        "name": "Chaine traditionnelle",
                        "dishes": [
                            "Tomates farcies ( 6 Points)",
                            "Tarte thon et tomates ( 5 Points)",
                            "Purée de pomme de terre",
                            "Bâtonnière de légumes"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 1373463,
        "date": getDate(4),
        "meal": [
            {
                "name": "midi",
                "foodcategory": [
                    {
                        "name": "Chaine traditionnelle",
                        "dishes": [
                            "Demi coquelet à l'estragon ( 7 Points)",
                            "Calamars à la romaine ( 5 Points)",
                            "VG Pâtes bolognaise (6 Points)",
                            "Colombo de porc ( 6 Points)",
                            "Purée de pomme de terre",
                            "Courgettes sautées"
                        ]
                    },
                    {
                        "name": "Brasserie",
                        "dishes": [
                            "Steak haché de bœuf frais ( 6 Points)",
                            "Bavette de bœuf à l'échalote ( 7 Points)",
                            "Demi coquelet à l'estragon ( 7 Points)",
                            "Poulet fermier ( 7 Points)",
                            "Calamars à la romaine ( 5 Points)",
                            "Poisson frais du jour ( 7 Points+)",
                            "Colombo de porc ( 6 Points)",
                            "Purée de pomme de terre",
                            "VG pâtes bolognaise",
                            "Aubergine tomate et mozzarella",
                            "Courgettes sautées",
                            "Frites"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 1374047,
        "date": getDate(5),
        "meal": [
            {
                "name": "midi",
                "foodcategory": [
                    {
                        "name": "Chaine traditionnelle",
                        "dishes": [
                            "VG moussaka aux légumes",
                            "Raviolis de bœuf à la sauce tomate",
                            "Riz à la provençale",
                            "Pâtes sauce grand-mère",
                            "Haricots plats ",
                            "Riz pilaf"
                        ]
                    },
                    {
                        "name": "Brasserie",
                        "dishes": [
                            "Riz à la provençale",
                            "Cœur de rumsteak",
                            "Steak haché de bœuf frais",
                            "Poulet fermier",
                            "Raviolis de bœuf à la sauce tomate",
                            "VG moussaka aux légumes",
                            "Pâtes sauce grand-mère",
                            "Haricots plats",
                            "Purée de pomme de terre",
                            "Riz pilaf",
                            "Frites"
                        ]
                    }
                ]
            },
            {
                "name": "soir",
                "foodcategory": [
                    {
                        "name": "Chaine traditionnelle",
                        "dishes": [
                            "Merguez",
                            "Fish and chips",
                            "Carottes sautées",
                            "Pomme de terre en robe des champs"
                        ]
                    }
                ]
            }
        ]
    }
];

module.exports.restaurantsData = [
    {
        "id": 681,
        "title": "(S)pace Brabois",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/space-brabois_thumb.jpg",
        "short_desc": "Au sein du campus Brabois Santé.",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>Au sein du campus Brabois Santé.</p> <h2>Horaires</h2><p>Lundi - vendredi<br/>11h30 - 13h30</p> <h2>Moyen d'accès</h2><p>Ligne A : Terminus Vandœuvre CHU Brabois <br/>Lignes 10 et Résago 2 : Arrêt Campus Brabois Santé<br/>Brabois Express : Arrêt Vandœuvre Brabois Santé </p> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/wifi.gif'/> WIFI disponible<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>(S)pace Brabois</h2><p>9 avenue de la Forêt de Haye, 54500 Vandœuvre-lès-Nancy<br/><b>T&#233;l&#233;phone</b> : 03 83 44 61 00</p>",
        "lat": 48.648525,
        "lon": 6.140494,
        "zone": "Vandœuvre-lès-Nancy"
    },
    {
        "id": 682,
        "title": "Resto U' Cours Léopold",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/restaurant-universitaire-cours-leopold-nancy1_thumb.jpg",
        "short_desc": "À proximité du campus droit",
        "opening": {
            "1": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "6": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>À proximité du campus droit</p> <h2>Horaires</h2><p>11h30 – 13h30 & 18h30 – 20h00 (lundi – vendredi)<br/>11h30 – 13h30 (samedi)</p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Resto U' Cours Léopold</h2><p>16, Cours Léopold 54000 NANCY<br/><b>T&#233;l&#233;phone</b> : 03 83 32 70 60</p>",
        "lat": 48.695038,
        "lon": 6.1772227,
        "zone": "Nancy"
    },
    {
        "id": 683,
        "title": "Resto U' Médreville",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/restaurant-universitaire-medreville-nancy1_thumb.jpg",
        "short_desc": "À proximité de l'IUT Charlemagne, du lycée Frédéric Chopin et du lycée Emmanuel Héré.",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>À proximité de l'IUT Charlemagne, du lycée Frédéric Chopin et du lycée Emmanuel Héré.</p> <h2>Horaires</h2><p>11h30 – 13h30 (lundi – vendredi)</p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Resto U' Médreville</h2><p>73, rue de Laxou 54000 NANCY<br/><b>T&#233;l&#233;phone</b> : 03 83 91 88 99</p>",
        "lat": 48.68451,
        "lon": 6.159049,
        "zone": "Nancy"
    },
    {
        "id": 685,
        "title": "Resto U' Saurupt",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/restaurant-universitaire-saurupt-nancy1_thumb.jpg",
        "short_desc": "À proximité du campus pharmacie / dentaire",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>À proximité du campus pharmacie / dentaire</p> <h2>Horaires</h2><p>11h30 – 13h30 (lundi – vendredi)</p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Resto U' Saurupt</h2><p>22 rue de Saurupt 54000 Nancy<br/><b>T&#233;l&#233;phone</b> : 03 83 53 28 62</p>",
        "lat": 48.680283,
        "lon": 6.1844316,
        "zone": "Nancy"
    },
    {
        "id": 686,
        "title": "Resto U' Stanislas-Meurthe",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/restaurant-universitaire-stanislas-meurthe-nancy1_thumb.jpg",
        "short_desc": "À proximité de l'ENSGSI, de l'EEIGM et de l'école d'architecture",
        "opening": {
            "1": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>À proximité de l'ENSGSI, de l'EEIGM et de l'école d'architecture</p> <h2>Horaires</h2><p>11h30 – 13h30 & 18h30 – 20h00 (lundi – jeudi)<br/>11h30 – 13h30 (vendredi)</p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Resto U' Stanislas-Meurthe</h2><p>17, boulevard d'Austrasie 54000 NANCY<br/><b>T&#233;l&#233;phone</b> :  03 83 19 21 43</p>",
        "lat": 48.69505,
        "lon": 6.1968327,
        "zone": "Nancy"
    },
    {
        "id": 687,
        "title": "Resto U' Vélodrome",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/restaurant-universitaire-vandoeuvre-vandoeuvre1_thumb.jpg",
        "short_desc": "À proximité du campus sciences, Staps, École des Mines, IUT du Montet",
        "opening": {
            "1": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>À proximité du campus sciences, Staps, École des Mines, IUT du Montet</p> <h2>Horaires</h2><p>11h30 – 13h30 & 18h30 – 20h00 (lundi – jeudi)<br/>11h30 – 13h30 (vendredi)</p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Resto U' Vélodrome</h2><p>Boulevard des Aiguilettes 54500 VANDOEUVRE-LÈS-NANCY<br/><b>T&#233;l&#233;phone</b> : 03 83 53 33 50</p>",
        "lat": 48.66678,
        "lon": 6.1654987,
        "zone": "Vandœuvre-lès-Nancy"
    },
    {
        "id": 688,
        "title": "Resto U' Bridoux",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/restaurant-universitaire-bridoux-metz1_thumb.jpg",
        "short_desc": "À proximité des campus médecine et sciences",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>À proximité des campus médecine et sciences</p> <h2>Horaires</h2><p>11h30 – 13h30 (lundi – vendredi) </p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Resto U' Bridoux</h2><p>88, rue Claude Bernard 57070 METZ <br/><b>T&#233;l&#233;phone</b> :  03 87 37 50 00<br/><b>E-mail</b> : restauration@crous-lorraine.fr / assistance-izly@crous-lorraine.fr</p>",
        "lat": 49.115795,
        "lon": 6.208115,
        "zone": "Metz"
    },
    {
        "id": 689,
        "title": "Market' Rimbaud",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/20181005-163851_thumb.jpg",
        "short_desc": "Sur l'île du Saulcy",
        "opening": {
            "1": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "2": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "3": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "4": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "5": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>Sur l'île du Saulcy</p> <h2>Horaires</h2><p>9h30 – 15h30 (lundi – vendredi)</p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Market' Rimbaud</h2><p>Île du Saulcy CS 60587 57010 METZ cedex 01<br/><b>T&#233;l&#233;phone</b> : 03 87 31 62 84</p>",
        "lat": 49.119263,
        "lon": 6.1595473,
        "zone": "Metz"
    },
    {
        "id": 690,
        "title": "Resto U' Technopôle",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/restaurant-universitaire-technopole-metz1_thumb.jpg",
        "short_desc": "À proximité du lycée de la communication",
        "opening": {
            "1": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi et le soir",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>À proximité du lycée de la communication</p> <h2>Horaires</h2><p>11h30 – 13h30 & 18h30 – 20h15 (lundi – jeudi)<br/>11h30 – 13h30 (vendredi)</p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Resto U' Technopôle</h2><p>4, boulevard Arago 57070 METZ Cedex<br/><b>T&#233;l&#233;phone</b> : 03 87 20 47 08</p>",
        "lat": 49.100643,
        "lon": 6.221494,
        "zone": "Metz"
    },
    {
        "id": 691,
        "title": "Resto U' Verlaine",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/restaurant-universitaire-verlaine-metz1_thumb.jpg",
        "short_desc": "Sur l'île du Saulcy",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>Sur l'île du Saulcy</p> <h2>Horaires</h2><p>11h30 – 13h30 (lundi – vendredi)</p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Resto U' Verlaine</h2><p>Île du Saulcy CS 60587 57010 METZ cedex 01<br/><b>T&#233;l&#233;phone</b> : 03 87 31 62 84</p>",
        "lat": 49.119965,
        "lon": 6.164875,
        "zone": "Metz"
    },
    {
        "id": 692,
        "title": "Resto U' Campus Bois",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/restaurant-universitaire-campus-fibres-epinal1_thumb.jpg",
        "short_desc": "À proximité de l'ENSTIB",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>À proximité de l'ENSTIB</p> <h2>Horaires</h2><p>11h30 – 13h30 (lundi – vendredi) </p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Resto U' Campus Bois</h2><p>27 bis, rue Philippe Séguin 88000 ÉPINAL<br/><b>T&#233;l&#233;phone</b> : 03 29 29 74 42</p>",
        "lat": 48.194542,
        "lon": 6.4654274,
        "zone": "Épinal"
    },
    {
        "id": 693,
        "title": "Resto U' La Louvière",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/restaurant-universitaire-louviere-epinal1_thumb.jpg",
        "short_desc": "À proximité de l'IUT d'Épinal, du campus droit, du lycée Louis Lapicque et de l'AGSU",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>À proximité de l'IUT d'Épinal, du campus droit, du lycée Louis Lapicque et de l'AGSU</p> <h2>Horaires</h2><p>11h30 – 13h30 (lundi – vendredi)</p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Resto U' La Louvière</h2><p>9, rue de la Louvière 88000 EPINAL<br/><b>T&#233;l&#233;phone</b> : 03 29 32 47 12</p>",
        "lat": 48.172173,
        "lon": 6.45343,
        "zone": "Épinal"
    },
    {
        "id": 694,
        "title": "Resto U' Jean Monnet",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/restaurant-jean-monnet_thumb.jpg",
        "short_desc": "À proximité du lycée Alfred Mézières et de l'IUT de Longwy",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>À proximité du lycée Alfred Mézières et de l'IUT de Longwy</p> <h2>Horaires</h2><p>11h30 – 13h30 (lundi – vendredi)</p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Resto U' Jean Monnet</h2><p>8, avenue du Bivaque 54405 LONGWY<br/><b>T&#233;l&#233;phone</b> :  03 82 44 82 00</p>",
        "lat": 49.524067,
        "lon": 5.756375,
        "zone": "Longwy"
    },
    {
        "id": 695,
        "title": "Resto U' Cormontaigne",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/restaurant-universitaire-cormontaigne-yutz1_thumb.jpg",
        "short_desc": "À proximité de l'IUT de Thionville-Yutz, du CFAI, et de l'Institut de Soudure",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>À proximité de l'IUT de Thionville-Yutz, du CFAI, et de l'Institut de Soudure</p> <h2>Horaires</h2><p>11h30 – 13h30 (lundi – vendredi) </p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Resto U' Cormontaigne</h2><p>Impasse Louis de Broglie 57970 YUTZ<br/><b>T&#233;l&#233;phone</b> : 03 82 83 26 85</p>",
        "lat": 49.350384,
        "lon": 6.170606,
        "zone": "Yutz"
    },
    {
        "id": 697,
        "title": "Resto U' Metz'In",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/restaurant-metzin_thumb.jpg",
        "short_desc": "Sur le campus Technopôle, à proximité des écoles d'ingénieurs",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "4": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>Sur le campus Technopôle, à proximité des écoles d'ingénieurs</p> <h2>Horaires</h2><p>11h30 – 13h30 (lundi – vendredi)</p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Resto U' Metz'In</h2><p>6 rue Augustin Fresnel 57070 Metz<br/><b>T&#233;l&#233;phone</b> : 03 87 20 47 11</p>",
        "lat": 49.09416,
        "lon": 6.227297,
        "zone": "Metz"
    },
    {
        "id": 1546,
        "title": "(S)pace Artem",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/Space-Artem-iresto_thumb.jpg",
        "short_desc": "À proximité : - Ensad, Mines - ICN  - ISAM-IAE - Institut Jean Lamour",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>À proximité :<br/>- Ensad, Mines<br/>- ICN <br/>- ISAM-IAE<br/>- Institut Jean Lamour</p> <h2>Horaires</h2><p>11h30 – 13h30 (lundi – vendredi)</p> <h2>Moyen d'accès</h2><p>Ligne 11 : Arrêt Artem<br/>Ligne B : Arrêt Nancy Artem</p> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/wifi.gif'/> WIFI disponible<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>(S)pace Artem</h2><p>Rue Michel Dinet, 54000 NANCY<br/><b>T&#233;l&#233;phone</b> : 03 83 53 33 50</p>",
        "lat": 48.672478,
        "lon": 6.168726,
        "zone": "Nancy"
    },
    {
        "id": 1582,
        "title": "Resto U' CentraleSupélec",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/supelec_thumb.jpg",
        "short_desc": "À proximité :  Lycée de la Communication, ESITC, IEsm-Iae, IUT mesures physiques GTL, ICN, CEA ",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Localisation</h2><p>À proximité : <br/>Lycée de la Communication,<br/>ESITC, IEsm-Iae,<br/>IUT mesures physiques<br/>GTL, ICN, CEA </p> <h2>Horaires</h2><p>11h30 – 13h30 (lundi – vendredi) </p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Resto U' CentraleSupélec</h2><p>2 rue Edouard Belin 57070 Metz Technopôle<br/><b>T&#233;l&#233;phone</b> : 03 87 76 47 47 </p>",
        "lat": 49.10452,
        "lon": 6.2204823,
        "zone": "Metz"
    },
    {
        "id": 1611,
        "title": "Cafet' Charle'Miam",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/20181016-105704_thumb.jpg",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Cafet' Charle'Miam</h2><p>2 ter Boulevard Charlemagne 54000 Nancy<br/><b>T&#233;l&#233;phone</b> : 0383918899</p>",
        "lat": 48.68349,
        "lon": 6.161492,
        "zone": "Nancy"
    },
    {
        "id": 2238,
        "title": "Market' Boudonville",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/market-boudonville_thumb.jpg",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "2": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "3": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "4": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "5": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "6": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Horaires</h2><p>9h00 – 20h00 (lundi - vendredi)<br/>11h00 – 14h00 (samedi)</p> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Market' Boudonville</h2><p>61 rue de Boudonville, 54000 Nancy</p>",
        "lat": 48.69764,
        "lon": 6.165334,
        "zone": "Nancy"
    },
    {
        "id": 2276,
        "title": "Cafet' Droit",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media/",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "  <img src=\"\" class=\"image-batiment\"> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Cafet' Droit</h2><p>13 Place Carnot 54000 Nancy</p>",
        "lat": 48.693264,
        "lon": 6.1768208,
        "zone": "Nancy"
    },
    {
        "id": 2277,
        "title": "Cafet' Lettres",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/cafet-lettres_thumb.jpg",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Horaires</h2><p>7h30 – 17h (lundi – jeudi)<br/>7h30 – 14h (vendredi)</p> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Cafet' Lettres</h2><p>23 Boulevard Albert 1er 54000 Nancy</p>",
        "lat": 48.694454,
        "lon": 6.16687,
        "zone": "Nancy"
    },
    {
        "id": 2278,
        "title": "Cafet' Montet",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/Crous-lorraine-cafeteria-Montet-villers-les-nancy_thumb.jpg",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Horaires</h2><p>7h30 – 16h (lundi – vendredi)</p> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Cafet' Montet</h2><p>Rue du Doyen Urion 54600 Villers-lès-Nancy</p>",
        "lat": 48.65966,
        "lon": 6.152183,
        "zone": "Villers-lès-Nancy"
    },
    {
        "id": 2279,
        "title": "Cafet' OTU",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media/",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "  <img src=\"\" class=\"image-batiment\"> <h2>Horaires</h2><p>11h30 – 13h30 (lundi – vendredi)</p> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Cafet' OTU</h2><p>Boulevard des Aiguillettes 54500 Vandœuvre-lès-Nancy</p>",
        "lat": 48.666664,
        "lon": 6.164808,
        "zone": "Vandœuvre-lès-Nancy"
    },
    {
        "id": 2280,
        "title": "Cafet' ENSEM",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/cafet-ensem_thumb.jpg",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Horaires</h2><p>9h – 16h (lundi – vendredi)</p> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Cafet' ENSEM</h2><p>2 Avenue de la Forêt de Haye 54500 Vandœuvre-lès-Nancy</p>",
        "lat": 48.65275,
        "lon": 6.1487436,
        "zone": "Vandœuvre-lès-Nancy"
    },
    {
        "id": 2282,
        "title": "Cafet' Technopôle",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media/",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "  <img src=\"\" class=\"image-batiment\"> <h2>Horaires</h2><p>7h – 16h30 (lundi, mardi, jeudi et vendredi)<br/>7h – 13h30 (mercredi)</p> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Cafet' Technopôle</h2><p>4 Boulevard Dominique François Arago 57070 Metz</p>",
        "lat": 49.10014,
        "lon": 6.223928,
        "zone": "Metz"
    },
    {
        "id": 2283,
        "title": "Cafet' Pôle Herbert Simon",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media/",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "  <img src=\"\" class=\"image-batiment\"> <h2>Horaires</h2><p>7h30 – 14h30 (lundi – vendredi)</p> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Cafet' Pôle Herbert Simon</h2><p>13 Rue Michel Ney  54000 Nancy</p>",
        "lat": 48.69765,
        "lon": 6.172455,
        "zone": "Nancy"
    },
    {
        "id": 2284,
        "title": "Cafet' MIM",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media/",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "  <img src=\"\" class=\"image-batiment\"> <h2>Horaires</h2><p>8h30 – 16h30 (lundi – vendredi)</p> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Cafet' MIM</h2><p>3 Rue Augustin Fresnel, 57070 Metz</p>",
        "lat": 49.094913,
        "lon": 6.2303257,
        "zone": "Metz"
    },
    {
        "id": 2285,
        "title": "Cafet' Simone Veil",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media/",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "  <img src=\"\" class=\"image-batiment\"> <h2>Horaires</h2><p>7h45 – 13h30 (lundi – vendredi)</p> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Cafet' Simone Veil</h2><p>1 Cité Universitaire 57000 Metz</p>",
        "lat": 49.12017,
        "lon": 6.1632695,
        "zone": "Metz"
    },
    {
        "id": 2286,
        "title": "Le Kiosque",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/le-kiosque_thumb.jpg",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Horaires</h2><p>9h30 – 15h (lundi – vendredi)</p> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Le Kiosque</h2><p>Île du Saulcy 57000 Metz</p>",
        "lat": 49.120647,
        "lon": 6.162861,
        "zone": "Metz"
    },
    {
        "id": 2287,
        "title": "Cafet' Bridoux",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media/",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "  <img src=\"\" class=\"image-batiment\"> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Cafet' Bridoux</h2><p>88 Rue Claude Bernard 57070 Metz</p>",
        "lat": 49.11966,
        "lon": 6.21206,
        "zone": "Metz"
    },
    {
        "id": 2288,
        "title": "(S)pace Saulcy",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/space-saulcy_thumb.jpg",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "2": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "3": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "4": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "5": {
                "label": "Ouvert en continu",
                "is_open": true
            },
            "6": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Horaires</h2><p>7h30 – 20h (lundi – vendredi)<br/>9h30 – 15h30 (samedi)</p> <h2>Moyen d'accès</h2><p>METTIS B : Station Cité U </p> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/wifi.gif'/> WIFI disponible<br/> À proximité du Campus Saulcy et du guichet unique étudiant<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>(S)pace Saulcy</h2><p>Île du Saulcy, 57000 Metz<br/><b>T&#233;l&#233;phone</b> : 03 87 31 62 84</p>",
        "lat": 49.11959,
        "lon": 6.1595416,
        "zone": "Metz"
    },
    {
        "id": 2289,
        "title": "Truck' Caravelle",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media//crous-images/truck-caravelle_thumb.jpg",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "<h2>Horaires</h2><p>11h –14h30 (lundi – vendredi)</p> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Truck' Caravelle</h2><p>23 Boulevard Albert 1er 54000 Nancy</p>",
        "lat": 48.695362,
        "lon": 6.1658974,
        "zone": "Nancy"
    },
    {
        "id": 2290,
        "title": "Green Truck ",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media/",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Fermé",
                "is_open": false
            },
            "2": {
                "label": "Fermé",
                "is_open": false
            },
            "3": {
                "label": "Fermé",
                "is_open": false
            },
            "4": {
                "label": "Fermé",
                "is_open": false
            },
            "5": {
                "label": "Fermé",
                "is_open": false
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "  <img src=\"\" class=\"image-batiment\"> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Green Truck </h2><p>Campus Lettres et Sciences Humaines 54000 Nancy</p>",
        "lat": 48.694046,
        "lon": 6.1662197,
        "zone": "Nancy"
    },
    {
        "id": 2291,
        "title": "Cafet' Atrium",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media/",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "  <img src=\"\" class=\"image-batiment\"> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Cafet' Atrium</h2><p>Campus, Boulevard des Aiguillettes 54506 Vandœuvre-lès-Nancy</p>",
        "lat": 48.66518,
        "lon": 6.161397,
        "zone": "Vandœuvre-lès-Nancy"
    },
    {
        "id": 2292,
        "title": "Cafet' Cormontaigne",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media/",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "  <img src=\"\" class=\"image-batiment\"> <h2>Horaires</h2><p>11h30 – 13h30 (lundi – vendredi)</p> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Cafet' Cormontaigne</h2><p>Impasse Louis de Broglie 57970 Yutz</p>",
        "lat": 49.350544,
        "lon": 6.170678,
        "zone": "Yutz"
    },
    {
        "id": 2293,
        "title": "Facteria libre-service",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media/",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le matin et le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "  <img src=\"\" class=\"image-batiment\"> <h2>Horaires</h2><p>8h30 - 18h (lundi - jeudi)<br/>8h30 - 14h30 (vendredi)</p> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Facteria libre-service</h2><p>23 Boulevard Albert 1er 54000 Nancy</p>",
        "lat": 48.69557,
        "lon": 6.1656523,
        "zone": "Nancy"
    },
    {
        "id": 2294,
        "title": "Cafet' Vélodrome",
        "thumbnail_url": "https://admin-v2.crous-mobile.fr/media/",
        "short_desc": "",
        "opening": {
            "1": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "2": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "3": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "4": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "5": {
                "label": "Ouvert le midi",
                "is_open": true
            },
            "6": {
                "label": "Fermé",
                "is_open": false
            },
            "7": {
                "label": "Fermé",
                "is_open": false
            }
        },
        "infos": "  <img src=\"\" class=\"image-batiment\"> <h2>Pratique</h2><p><img valign=middle height=32 width=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/handicap.gif'/> Accessible aux personnes à mobilité réduite<br/> <h2>Paiements possibles</h2><p><img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/carte-bleue.gif'/> Carte bancaire<br/> <img valign=middle width=32 height=32 src='https://www.crous-amiens.fr/wp-content/uploads/sites/9/2020/05/izly.png'/> IZLY<br/> </p>",
        "contact": "<h2>Cafet' Vélodrome</h2><p>1 Boulevard des Aiguillettes 54500 Vandœuvre-lès-Nancy</p>",
        "lat": 48.66707,
        "lon": 6.1640306,
        "zone": "Vandœuvre-lès-Nancy"
    }
];