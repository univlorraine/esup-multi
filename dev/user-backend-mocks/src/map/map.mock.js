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

module.exports.categories = [{
  id: "library",
  sort: 1,
  label: [
    { langcode: "fr", value: "Bibliothèques" },
    { langcode: "en", value: "Libraries" },
  ]
},
{
  id: "restaurants",
  sort: 2,
  label: [
    { langcode: "fr", value: "Restaurants" },
    { langcode: "en", value: "Restaurants" }
  ]
}]

module.exports.campuses = [{
  id: 1,
  sort: 1,
  name: "Campus du Saulcy",
  initial: { lat: 49.1199607, lng: 6.1620494 },
  southwest: { lat: 49.1184275, lng: 6.150897 },
  northeast: { lat: 49.1216008, lng: 6.1641432 },
  photo: "https://picsum.photos/500/500"
},
{
  id: 2,
  sort: 2,
  name: "Campus de Bridoux",
  initial: { lat: 49.1173805, lng: 6.2097276 },
  southwest: { lat: 49.1138715, lng: 6.2097391 },
  northeast: { lat: 49.1157185, lng: 6.2123033 },
  photo: "https://picsum.photos/500/500"
}]

module.exports.pois = {
  library: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          nom: [
            { value: "Bibliothèque Universitaire Saulcy", langcode: "fr" },
            { value: "Saulcy University Library", langcode: "en" }
          ],
          description: [
            { value: "Du lundi au vendredi : 8h00-19h00\nLe samedi : 9h00-18h00", langcode: "fr" },
            { value: "From Monday to Friday: 8am-7pm\nOn Saturday: 9am-6pm", langcode: "en" }
          ],
          site: "Mont Houy",
          icon: {
            svg: `<svg width="100%" height="100%" viewBox="0 0 68 92" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M33.912,1c-18.214,0.045 -32.957,14.671 -32.912,32.662c0.075,33.267 33.118,57.244 33.118,57.244c0,0 32.932,-24.142 32.861,-57.409c-0.046,-17.99 -14.842,-32.545 -33.067,-32.497Z" style="fill:#1a171b;fill-rule:nonzero;stroke:#fff;stroke-width:2px;"/><circle cx="33.99" cy="34.453" r="24" style="fill:#fff;"/><path d="M50.989,45.995l-33.999,0l0,-21.52l1.17,-0.943l0,-0.611c0,-0.202 0.08,-0.396 0.223,-0.539c2.159,-2.163 11.23,-1.981 15.606,0.806c4.376,-2.787 13.449,-2.967 15.608,-0.806c0.143,0.144 0.223,0.337 0.223,0.539l0,0.611l1.17,0.943l0,21.521l-0.001,-0.001Zm-16.236,-2.432c6.16,-1.916 10.618,-2.06 13.54,-0.429l0,-19.849c-0.856,-0.55 -3.048,-0.976 -5.987,-0.804c-3.086,0.181 -5.868,0.933 -7.553,2.029l0,19.053Zm-15.067,-0.429c1.343,-0.75 3.011,-1.125 5.02,-1.125c2.362,0 5.191,0.517 8.521,1.553l0,-19.052c-1.685,-1.097 -4.468,-1.848 -7.553,-2.029c-2.939,-0.172 -5.133,0.254 -5.988,0.804l0,19.85l0,-0.001Zm22.732,-14.523l3.055,0c0.421,0 0.763,-0.341 0.763,-0.763c0,-0.421 -0.342,-0.763 -0.763,-0.763l-3.055,0c-0.421,0 -0.763,0.342 -0.763,0.763c0,0.422 0.342,0.763 0.763,0.763Zm-4.844,3.103l7.898,0c0.422,0 0.763,-0.341 0.763,-0.763c0,-0.421 -0.341,-0.762 -0.763,-0.762l-7.898,0c-0.422,0 -0.763,0.341 -0.763,0.762c0,0.422 0.342,0.763 0.763,0.763Zm-15.067,0l7.898,0c0.422,0 0.763,-0.341 0.763,-0.763c0,-0.421 -0.341,-0.762 -0.763,-0.762l-7.898,0c-0.422,0 -0.763,0.341 -0.763,0.762c0,0.422 0.341,0.763 0.763,0.763Zm0,3.104l7.898,0c0.422,0 0.763,-0.342 0.763,-0.763c0,-0.422 -0.341,-0.763 -0.763,-0.763l-7.898,0c-0.422,0 -0.763,0.341 -0.763,0.763c0,0.421 0.341,0.763 0.763,0.763Zm8.662,2.339c0,-0.421 -0.342,-0.763 -0.763,-0.763l-7.898,0c-0.422,0 -0.763,0.342 -0.763,0.763c0,0.422 0.341,0.763 0.763,0.763l7.898,0c0.421,0 0.763,-0.341 0.763,-0.763Zm-8.662,-8.546l3.054,0c0.422,0 0.763,-0.341 0.763,-0.763c0,-0.421 -0.341,-0.763 -0.763,-0.763l-3.054,0c-0.422,0 -0.763,0.342 -0.763,0.763c0,0.422 0.341,0.763 0.763,0.763Zm15.067,6.206l7.898,0c0.422,0 0.763,-0.341 0.763,-0.763c0,-0.421 -0.341,-0.763 -0.763,-0.763l-7.898,0c-0.422,0 -0.763,0.342 -0.763,0.763c0,0.422 0.342,0.763 0.763,0.763Zm8.662,2.34c0,-0.422 -0.342,-0.763 -0.763,-0.763l-7.899,0c-0.421,0 -0.763,0.341 -0.763,0.763c0,0.421 0.342,0.763 0.763,0.763l7.899,0c0.421,0 0.763,-0.342 0.763,-0.763Z" style="fill-rule:nonzero;"/></svg>`,
            width: 38,
            height: 48,
            x: 19,
            y: 48
          }
        },
        geometry: {
          type: "Point",
          coordinates: [
            6.164976,
            49.119824
          ]
        }
      }
    ]
  },
  restaurants: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          nom: [
            { value: "Restaurant Universitaire Bridoux", langcode: "fr "},
            { value: "Bridoux University Restaurant", langcode: "en" }
          ],
          description: [
            { value: "88 rue Claude Bernard 57070 Metz", langcode: "fr" },
            { value: "88 rue Claude Bernard 57070 Metz", langcode: "en" }
          ],
          site: "Mont Houy",
          icon: {
            svg: `<svg width="100%" height="100%" viewBox="0 0 68 92" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M33.912,1c-18.214,0.045 -32.957,14.671 -32.912,32.662c0.075,33.267 33.118,57.244 33.118,57.244c0,0 32.932,-24.142 32.861,-57.409c-0.046,-17.99 -14.842,-32.545 -33.067,-32.497Z" style="fill:#1a171b;fill-rule:nonzero;stroke:#fff;stroke-width:2px;"/><circle cx="33.99" cy="34.453" r="24" style="fill:#fff;"/><g><path d="M47.561,35.025c-0.179,-0.822 -0.893,-1.429 -1.75,-1.429c-0.358,0 -0.679,0.107 -0.965,0.286c-0.321,-0.5 -0.857,-0.822 -1.5,-0.822c-0.535,0 -1.035,0.25 -1.357,0.643c-0.286,-0.178 -0.607,-0.286 -0.964,-0.286c-0.929,0 -1.679,0.715 -1.75,1.608c-0.714,0.107 -1.286,0.642 -1.464,1.357l11.071,0c-0.179,-0.679 -0.679,-1.179 -1.321,-1.357Z" style="fill-rule:nonzero;"/><path d="M39.132,30.739l0.25,0.571c0.107,0.286 0.393,0.429 0.643,0.429c0.107,0 0.178,0 0.286,-0.072c0.357,-0.142 0.535,-0.571 0.392,-0.928l-0.25,-0.572c-0.107,-0.285 -0.071,-0.642 0.143,-0.892c0.536,-0.643 0.679,-1.536 0.357,-2.322l-0.25,-0.571c-0.142,-0.357 -0.571,-0.536 -0.928,-0.393c-0.357,0.143 -0.536,0.571 -0.393,0.928l0.25,0.572c0.107,0.286 0.071,0.643 -0.143,0.893c-0.571,0.678 -0.678,1.571 -0.357,2.357Z" style="fill-rule:nonzero;"/><path d="M42.453,30.739l0.25,0.571c0.108,0.286 0.393,0.429 0.643,0.429c0.107,0 0.179,0 0.286,-0.072c0.357,-0.142 0.536,-0.571 0.393,-0.928l-0.25,-0.572c-0.107,-0.285 -0.072,-0.642 0.143,-0.892c0.535,-0.643 0.678,-1.536 0.357,-2.322l-0.25,-0.571c-0.143,-0.357 -0.572,-0.536 -0.929,-0.393c-0.357,0.143 -0.535,0.571 -0.393,0.928l0.25,0.572c0.108,0.286 0.072,0.643 -0.142,0.893c-0.572,0.678 -0.679,1.571 -0.358,2.357Z" style="fill-rule:nonzero;"/><path d="M45.775,30.739l0.25,0.571c0.107,0.286 0.393,0.429 0.643,0.429c0.107,0 0.178,0 0.285,-0.072c0.358,-0.142 0.536,-0.571 0.393,-0.928l-0.285,-0.536c-0.108,-0.286 -0.072,-0.643 0.142,-0.893c0.536,-0.643 0.679,-1.535 0.358,-2.321l-0.25,-0.572c-0.143,-0.357 -0.572,-0.535 -0.929,-0.392c-0.357,0.142 -0.536,0.571 -0.393,0.928l0.25,0.572c0.107,0.285 0.072,0.642 -0.143,0.892c-0.535,0.643 -0.678,1.536 -0.321,2.322Z" style="fill-rule:nonzero;"/><path d="M49.775,37.667l-12.893,0c-0.429,0 -0.75,0.322 -0.75,0.75c0,0.429 0.321,0.75 0.75,0.75l0.393,0l0.357,1.322l2.429,0c0.928,0 1.857,0.393 2.5,1.071c0.214,0.215 0.392,0.5 0.535,0.786l4.25,0c0.679,0 1.25,-0.429 1.429,-1.071l0.571,-2.072l0.393,0c0.429,0 0.75,-0.321 0.75,-0.75c0.036,-0.428 -0.286,-0.786 -0.714,-0.786Z" style="fill-rule:nonzero;"/><path d="M40.096,41.846l-4.107,0c0,0 -3.893,-3.143 -4.25,-3.393c-0.357,-0.286 -0.964,-0.536 -1.643,-0.536l-3.928,0c-1.429,0 -2.572,1.143 -2.572,2.572l0,9.928c0,0.572 0.465,1.036 1.036,1.036l7.036,0c0.571,0 1.035,-0.464 1.035,-1.036l-0.035,-6l1.321,1.072c0.357,0.286 0.822,0.464 1.286,0.464l4.75,0c1.107,0 2.036,-0.821 2.107,-1.928c0.071,-1.179 -0.893,-2.179 -2.036,-2.179Z" style="fill-rule:nonzero;"/><path d="M23.668,32.167c0,2.5 2,4.5 4.5,4.5c2.5,0 4.5,-2.035 4.5,-4.5c0,-0.464 -0.072,-0.892 -0.179,-1.321l-8.607,0c-0.143,0.393 -0.214,0.857 -0.214,1.321Z" style="fill-rule:nonzero;"/><path d="M24.061,29.453l8.25,0l0,-4.536c1.5,-0.25 2.642,-1.571 2.607,-3.178c-0.036,-1.5 -1.25,-2.822 -2.75,-2.964c-0.465,-0.036 -0.929,0 -1.322,0.142c-0.535,-0.892 -1.535,-1.464 -2.643,-1.464c-1.107,0 -2.071,0.607 -2.642,1.464c-0.429,-0.142 -0.858,-0.214 -1.322,-0.142c-1.5,0.178 -2.714,1.464 -2.75,2.964c-0.036,1.571 1.107,2.928 2.607,3.143l0,4.571l-0.035,0Z" style="fill-rule:nonzero;"/></g></svg>`,
            width: 38,
            height: 48,
            x: 19,
            y: 48
          }
        },
        geometry: {
          type: "Point",
          coordinates: [
            6.211062,
            49.116229
          ]
        }
      },
    ]
  }
};
