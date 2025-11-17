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

import { Injectable, SecurityContext } from '@angular/core';
import { Observable } from 'rxjs';
import { MapData, Marker } from './map.repository';
import { HttpClient } from '@angular/common/http';
import { MultiTenantService } from '@multi/shared';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import DOMPurify from 'dompurify';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private multiTenantService: MultiTenantService,
    private http: HttpClient,
    private domSanitizer: DomSanitizer,
  ) { }

  getData(): Observable<MapData> {
    return this.http.get<MapData>(`${this.multiTenantService.getApiEndpoint()}/map`).pipe(
      // Map data is not handled by Angular's built-in sanitization as it is directly displayed by Leaflet, so we manually sanitize it here
      map((data: MapData): MapData => {
        data.icons.forEach(icon => {
          icon.svg = this.sanitizeSvg(icon.svg);
        });
        for (const markersCollectionsKey in data.markersCollections) {
          data.markersCollections[markersCollectionsKey].forEach((marker: Marker) => {
            marker.translations.forEach(translation => {
              translation.name = this.sanitizeHtml(translation.name);
              translation.description = this.sanitizeHtml(translation.description);
            });
          });
        }

        return data;
      })
    )
  }

  private sanitizeSvg(svg: string): string {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true } });
  }

  private sanitizeHtml(html: string): string {
    let sanitized = this.domSanitizer.sanitize(SecurityContext.HTML, html) || '';

    // Open external links in a new tab
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitized || '';
    const anchorTags = tempDiv.getElementsByTagName('a');
    for (let i = 0; i < anchorTags.length; i++) {
      const href = anchorTags[i].getAttribute('href');
      if (href && href.startsWith('http') || href.startsWith('https')) {
        anchorTags[i].setAttribute('target', '_blank');
      }
    }
    sanitized = tempDiv.innerHTML;

    return sanitized;
  }
}
