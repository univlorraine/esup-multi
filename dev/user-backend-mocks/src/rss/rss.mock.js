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

const msInDay = 86_400_000;
const urlMock = `http://localhost:${process.env.PORT}/mocking/rss`;
const urlImages = `http://localhost:${process.env.PORT}/rss`;

module.exports.rssData = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xml:base="${urlMock}" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
    <channel>
        <title>Flux Université Exemple</title>
        <description>Flux des actualités de l&#039;Université Exemple</description>
        <link>${urlMock}</link>
        <atom:link rel="self" href="${urlMock}" />
        <language>fr</language>
        <pubDate>${new Date(new Date().getTime() - msInDay / 8).toUTCString()}</pubDate>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <item>
            <title>[JACES ${new Date().getFullYear()}] La culture s&#039;invite dans les BU</title>
            <link>${urlMock}/jaces</link>
            <description>
                &lt;p&gt;Les bibliothèques universitaires accueillent de nombreux événements culturels à
                l&#039;occasion des JACES ${new Date().getFullYear()}.&lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/jaces.png" length="224383" type="image/png" />
            <guid isPermaLink="false">jaces</guid>
            <pubDate>${new Date(new Date().getTime() - msInDay / 8).toUTCString()}</pubDate>
            <source url="${urlMock}">Flux Université Exemple</source>
        </item>
        <item>
            <title>Pépites des BU : 3 épisodes hors série sur une correspondance inédite</title>
            <link>${urlMock}/pepite</link>
            <description>
                &lt;p&gt;Les bibliothèques universitaires conservent des trésors patrimoniaux. À l&#039;occasion
                des Nocturnes de l&#039;histoire ${new Date().getFullYear()}, découvrez trois épisodes hors
                série sur une correspondance inédite du XIXe siècle.&lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/pepites.png" length="360839" type="image/png" />
            <guid isPermaLink="false">pepite</guid>
            <pubDate>${new Date(new Date().getTime() - 2 * msInDay).toUTCString()}</pubDate>
            <source url="${urlMock}">Flux Université Exemple</source>
        </item>
        <item>
            <title>ANIMATIONS AUTOUR DE L'EGALITE FEMMES/HOMMES</title>
            <link>${urlMock}/egalite</link>
            <description>
                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel tincidunt lacus,
                luctus pellentesque est. Donec sed nisl felis. Vivamus dignissim libero nec ante auctor fermentum.
                Donec a varius quam. Aliquam erat volutpat. Aliquam hendrerit purus massa, a venenatis nisi consequat a.
                Integer dictum enim sit amet ultricies tincidunt. Vestibulum. &lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/egalite.png" length="107565" type="image/png" />
            <guid isPermaLink="false">egalite</guid>
            <pubDate>${new Date(new Date().getTime() - 3 * msInDay).toUTCString()}</pubDate>
            <source url="${urlMock}">Flux Université Exemple</source>
        </item>
        <item>
            <title>Élections du 9 avril : qui est concerné·e ?</title>
            <link>${urlMock}/elections</link>
            <description>
                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel tincidunt lacus,
                luctus pellentesque est. Donec sed nisl felis. Vivamus dignissim libero nec ante auctor fermentum.
                Donec a varius quam. Aliquam erat volutpat. Aliquam hendrerit purus massa, a venenatis nisi consequat a.
                Integer dictum enim sit amet ultricies tincidunt. Vestibulum. &lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/elections.png" length="34741" type="image/png" />
            <guid isPermaLink="false">elections</guid>
            <pubDate>${new Date(new Date().getTime() - 3.2 * msInDay).toUTCString()}</pubDate>
            <source url="${urlMock}">Flux Université Exemple</source>
        </item>
        <item>
            <title>Cap sur l’enseignement supérieur : une étape clé dans le processus d’orientation des lycéens !</title>
            <link>${urlMock}/orientation</link>
            <description>
                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel tincidunt lacus,
                luctus pellentesque est. Donec sed nisl felis. Vivamus dignissim libero nec ante auctor fermentum.
                Donec a varius quam. Aliquam erat volutpat. Aliquam hendrerit purus massa, a venenatis nisi consequat a.
                Integer dictum enim sit amet ultricies tincidunt. Vestibulum. &lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/orientation.png" length="40102" type="image/png" />
            <guid isPermaLink="false">orientation</guid>
            <pubDate>${new Date(new Date().getTime() - 4 * msInDay).toUTCString()}</pubDate>
            <source url="${urlMock}">Flux Université Exemple</source>
        </item>
        <item>
            <title>69% de publications en accès ouvert : la nouvelle édition du Baromètre de la Science Ouverte témoigne d’une nette progression</title>
            <link>${urlMock}/science-ouverte</link>
            <description>
                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel tincidunt lacus,
                luctus pellentesque est. Donec sed nisl felis. Vivamus dignissim libero nec ante auctor fermentum.
                Donec a varius quam. Aliquam erat volutpat. Aliquam hendrerit purus massa, a venenatis nisi consequat a.
                Integer dictum enim sit amet ultricies tincidunt. Vestibulum. &lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/science-ouverte.png" length="33236" type="image/png" />
            <guid isPermaLink="false">science-ouverte</guid>
            <pubDate>${new Date(new Date().getTime() - 7 * msInDay).toUTCString()}</pubDate>
            <source url="${urlMock}">Flux Université Exemple</source>
        </item>
        <item>
            <title>[Save the date] - 8° séminaire de pédagogie universitaire - Comment intéger la RSE dans nos enseignements ?</title>
            <link>${urlMock}/rse</link>
            <description>
                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel tincidunt lacus,
                luctus pellentesque est. Donec sed nisl felis. Vivamus dignissim libero nec ante auctor fermentum.
                Donec a varius quam. Aliquam erat volutpat. Aliquam hendrerit purus massa, a venenatis nisi consequat a.
                Integer dictum enim sit amet ultricies tincidunt. Vestibulum. &lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/rse.png" length="373559" type="image/png" />
            <guid isPermaLink="false">rse</guid>
            <pubDate>${new Date(new Date().getTime() - 8 * msInDay).toUTCString()}</pubDate>
            <source url="${urlMock}">Flux Université Exemple</source>
        </item>
        <item>
            <title>Spectacle au planétarium pour les étudiants de l’IUT</title>
            <link>${urlMock}/spectacle</link>
            <description>
                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel tincidunt lacus,
                luctus pellentesque est. Donec sed nisl felis. Vivamus dignissim libero nec ante auctor fermentum.
                Donec a varius quam. Aliquam erat volutpat. Aliquam hendrerit purus massa, a venenatis nisi consequat a.
                Integer dictum enim sit amet ultricies tincidunt. Vestibulum. &lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/spectacle.png" length="59985" type="image/png" />
            <guid isPermaLink="false">spectacle</guid>
            <pubDate>${new Date(new Date().getTime() - 12 * msInDay).toUTCString()}</pubDate>
            <source url="${urlMock}">Flux Université Exemple</source>
        </item>
        <item>
            <title>Découverte scientifique sur la réparation de l'ADN de certaines bactéries du sol</title>
            <link>${urlMock}/adn</link>
            <description>
                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel tincidunt lacus,
                luctus pellentesque est. Donec sed nisl felis. Vivamus dignissim libero nec ante auctor fermentum.
                Donec a varius quam. Aliquam erat volutpat. Aliquam hendrerit purus massa, a venenatis nisi consequat a.
                Integer dictum enim sit amet ultricies tincidunt. Vestibulum. &lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/adn.png" length="65129" type="image/png" />
            <guid isPermaLink="false">adn</guid>
            <pubDate>${new Date(new Date().getTime() - 15 * msInDay).toUTCString()}</pubDate>
            <source url="${urlMock}">Flux Université Exemple</source>
        </item>
    </channel>
</rss>`;

module.exports.articleData = `<!DOCTYPE html>
<html lang="fr">
    <head>
        <title>Article : {GUID}</title>
    </head>
    <body>
        <h1>Article : {GUID}</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae lacus et tellus vulputate porttitor.
            Praesent eu malesuada magna, sed imperdiet leo. Ut facilisis mi ac urna congue, ut feugiat mi tincidunt.
            Mauris a felis dolor. Proin gravida luctus augue at auctor. Aliquam non urna sed mauris convallis feugiat
            non sed felis. Vivamus egestas ut magna vel dapibus. Duis accumsan consectetur sodales. Ut dapibus urna quis
            accumsan suscipit. In finibus sed purus vitae suscipit. Donec facilisis ultrices consectetur. Ut sodales,
            diam et egestas congue, sem neque mattis nulla, sed condimentum libero arcu at felis. In tristique est
            nunc. Aenean porta urna nulla. Integer odio diam, faucibus vitae erat vel, pretium fringilla nunc. Proin
            consectetur, ipsum at dapibus placerat, leo erat sodales mi, commodo blandit risus turpis non libero.
        </p>
        <img src="${urlImages}/{guid}.png" alt="Illustration" />
        <p>
            Donec non leo molestie, ornare odio id, vulputate odio. Aliquam interdum eu nisi in elementum. Suspendisse
            ut magna eget metus aliquet luctus non sit amet est. Pellentesque finibus a purus laoreet sodales. Morbi sit
            amet tortor quam. Pellentesque sem felis, eleifend vel ipsum ut, faucibus mollis metus. In hac habitasse
            platea dictumst. Aliquam dignissim eget sem nec egestas. Proin eget tortor eros. Nulla consectetur, elit eu 
            accumsan rhoncus, lorem risus volutpat augue, at consequat felis nunc ut massa. Donec in diam in erat 
            ultrices dignissim ut non quam. Sed tristique felis nisl, sed sollicitudin mauris imperdiet in. Vestibulum 
            ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam gravida ipsum at mi 
            convallis vestibulum. Curabitur accumsan ultricies sem.
        </p>
        <p>
            Aenean quis ante purus. Nulla non lacinia diam, vitae vestibulum nunc. Aliquam lacus augue, dictum a 
            lacus ac, commodo lacinia ante. Quisque congue venenatis efficitur. In ultricies varius elit, non gravida 
            dolor pulvinar id. Nulla at maximus mauris. In feugiat sodales mi et hendrerit. Aenean ut velit est. Sed ut 
            lectus ipsum. Vestibulum venenatis risus neque, ut congue arcu blandit at. Duis dictum lectus velit, nec 
            lobortis libero iaculis tempus. Proin et facilisis ante, eget scelerisque lacus. Vestibulum consequat lorem 
            a lectus imperdiet tempus. Proin interdum tortor eu urna sodales, non euismod diam ullamcorper.
        </p> 
    </body>
</html>`;
