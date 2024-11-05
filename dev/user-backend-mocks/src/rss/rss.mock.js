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
const rssOrigin = 'https://www.esup-portail.org/';
const urlImages = `${process.env.PUBLIC_URL}/rss`;

module.exports.rssData = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xml:base="${rssOrigin}" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
    <channel>
        <title>Flux Université Exemple</title>
        <description>Flux des actualités de l&#039;Université Exemple</description>
        <link>${rssOrigin}</link>
        <atom:link rel="self" href="${rssOrigin}" />
        <language>fr</language>
        <pubDate>${new Date(new Date().getTime() - msInDay / 8).toUTCString()}</pubDate>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <item>
            <title>[JACES ${new Date().getFullYear()}] La culture s&#039;invite dans les BU</title>
            <link>${rssOrigin}</link>
            <description>
                &lt;p&gt;Les bibliothèques universitaires accueillent de nombreux événements culturels à
                l&#039;occasion des JACES ${new Date().getFullYear()}.&lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/jaces.png" length="224383" type="image/png" />
            <guid isPermaLink="false">jaces</guid>
            <pubDate>${new Date(new Date().getTime() - msInDay / 8).toUTCString()}</pubDate>
            <source url="${rssOrigin}">Flux Université Exemple</source>
        </item>
        <item>
            <title>Pépites des BU : 3 épisodes hors série sur une correspondance inédite</title>
            <link>${rssOrigin}</link>
            <description>
                &lt;p&gt;Les bibliothèques universitaires conservent des trésors patrimoniaux. À l&#039;occasion
                des Nocturnes de l&#039;histoire ${new Date().getFullYear()}, découvrez trois épisodes hors
                série sur une correspondance inédite du XIXe siècle.&lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/pepites.png" length="360839" type="image/png" />
            <guid isPermaLink="false">pepite</guid>
            <pubDate>${new Date(new Date().getTime() - 2 * msInDay).toUTCString()}</pubDate>
            <source url="${rssOrigin}">Flux Université Exemple</source>
        </item>
        <item>
            <title>Découvrez les visages inspirants des lauréats ${new Date().getFullYear()} de l'Institut Universitaire de France</title>
            <link>${rssOrigin}</link>
            <description>
                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel tincidunt lacus,
                luctus pellentesque est. Donec sed nisl felis. Vivamus dignissim libero nec ante auctor fermentum.
                Donec a varius quam. Aliquam erat volutpat. Aliquam hendrerit purus massa, a venenatis nisi consequat a.
                Integer dictum enim sit amet ultricies tincidunt. Vestibulum. &lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/iuf.png" length="107565" type="image/png" />
            <guid isPermaLink="false">iuf</guid>
            <pubDate>${new Date(new Date().getTime() - 3 * msInDay).toUTCString()}</pubDate>
            <source url="${rssOrigin}">Flux Université Exemple</source>
        </item>
        <item>
            <title>Élections du 9 avril : qui est concerné·e ?</title>
            <link>${rssOrigin}</link>
            <description>
                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel tincidunt lacus,
                luctus pellentesque est. Donec sed nisl felis. Vivamus dignissim libero nec ante auctor fermentum.
                Donec a varius quam. Aliquam erat volutpat. Aliquam hendrerit purus massa, a venenatis nisi consequat a.
                Integer dictum enim sit amet ultricies tincidunt. Vestibulum. &lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/elections.png" length="34741" type="image/png" />
            <guid isPermaLink="false">elections</guid>
            <pubDate>${new Date(new Date().getTime() - 3.2 * msInDay).toUTCString()}</pubDate>
            <source url="${rssOrigin}">Flux Université Exemple</source>
        </item>
        <item>
            <title>Cap sur l’enseignement supérieur : une étape clé dans le processus d’orientation des lycéens !</title>
            <link>${rssOrigin}</link>
            <description>
                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel tincidunt lacus,
                luctus pellentesque est. Donec sed nisl felis. Vivamus dignissim libero nec ante auctor fermentum.
                Donec a varius quam. Aliquam erat volutpat. Aliquam hendrerit purus massa, a venenatis nisi consequat a.
                Integer dictum enim sit amet ultricies tincidunt. Vestibulum. &lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/orientation.png" length="40102" type="image/png" />
            <guid isPermaLink="false">orientation</guid>
            <pubDate>${new Date(new Date().getTime() - 4 * msInDay).toUTCString()}</pubDate>
            <source url="${rssOrigin}">Flux Université Exemple</source>
        </item>
        <item>
            <title>69% de publications en accès ouvert : la nouvelle édition du Baromètre de la Science Ouverte témoigne d’une nette progression</title>
            <link>${rssOrigin}</link>
            <description>
                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel tincidunt lacus,
                luctus pellentesque est. Donec sed nisl felis. Vivamus dignissim libero nec ante auctor fermentum.
                Donec a varius quam. Aliquam erat volutpat. Aliquam hendrerit purus massa, a venenatis nisi consequat a.
                Integer dictum enim sit amet ultricies tincidunt. Vestibulum. &lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/science-ouverte.png" length="33236" type="image/png" />
            <guid isPermaLink="false">science-ouverte</guid>
            <pubDate>${new Date(new Date().getTime() - 7 * msInDay).toUTCString()}</pubDate>
            <source url="${rssOrigin}">Flux Université Exemple</source>
        </item>
        <item>
            <title>La recette génétique des champignons décomposeurs pour s’adapter au changement climatique</title>
            <link>${rssOrigin}</link>
            <description>
                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel tincidunt lacus,
                luctus pellentesque est. Donec sed nisl felis. Vivamus dignissim libero nec ante auctor fermentum.
                Donec a varius quam. Aliquam erat volutpat. Aliquam hendrerit purus massa, a venenatis nisi consequat a.
                Integer dictum enim sit amet ultricies tincidunt. Vestibulum. &lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/champignons.png" length="373559" type="image/png" />
            <guid isPermaLink="false">champigons</guid>
            <pubDate>${new Date(new Date().getTime() - 8 * msInDay).toUTCString()}</pubDate>
            <source url="${rssOrigin}">Flux Université Exemple</source>
        </item>
        <item>
            <title>Spectacle au planétarium pour les étudiants de l’IUT</title>
            <link>${rssOrigin}</link>
            <description>
                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel tincidunt lacus,
                luctus pellentesque est. Donec sed nisl felis. Vivamus dignissim libero nec ante auctor fermentum.
                Donec a varius quam. Aliquam erat volutpat. Aliquam hendrerit purus massa, a venenatis nisi consequat a.
                Integer dictum enim sit amet ultricies tincidunt. Vestibulum. &lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/spectacle.png" length="59985" type="image/png" />
            <guid isPermaLink="false">spectacle</guid>
            <pubDate>${new Date(new Date().getTime() - 12 * msInDay).toUTCString()}</pubDate>
            <source url="${rssOrigin}">Flux Université Exemple</source>
        </item>
        <item>
            <title>Découverte scientifique sur la réparation de l'ADN de certaines bactéries du sol</title>
            <link>${rssOrigin}</link>
            <description>
                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel tincidunt lacus,
                luctus pellentesque est. Donec sed nisl felis. Vivamus dignissim libero nec ante auctor fermentum.
                Donec a varius quam. Aliquam erat volutpat. Aliquam hendrerit purus massa, a venenatis nisi consequat a.
                Integer dictum enim sit amet ultricies tincidunt. Vestibulum. &lt;/p&gt;
            </description>
            <enclosure url="${urlImages}/adn.png" length="65129" type="image/png" />
            <guid isPermaLink="false">adn</guid>
            <pubDate>${new Date(new Date().getTime() - 15 * msInDay).toUTCString()}</pubDate>
            <source url="${rssOrigin}">Flux Université Exemple</source>
        </item>
    </channel>
</rss>`;
