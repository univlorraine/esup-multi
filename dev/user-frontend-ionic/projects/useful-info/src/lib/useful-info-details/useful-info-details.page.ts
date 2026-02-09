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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { currentLanguage$ } from '@multi/shared';
import { Observable, combineLatest, map, take } from 'rxjs';
import { TranslatedUsefulInfo, UsefulInfo, getUsefulInfoById } from '../useful-info.repository';
import { UsefulInfoService } from '../useful-info.service';

@Component({
  selector: 'app-useful-info-details',
  templateUrl: './useful-info-details.page.html',
  styleUrls: ['../../../../../src/theme/app-theme/styles/useful-info/useful-info-details.page.scss'],
})
export class UsefulInfoDetailsPage  implements OnInit {

  public usefulInfoDetails$: Observable<TranslatedUsefulInfo>;
  private usefulInfoId: number;
  private usefulInfo$: Observable<UsefulInfo>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usefulInfoService: UsefulInfoService,
  ) {}

  ngOnInit() {
    this.usefulInfoId = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    this.usefulInfo$ = getUsefulInfoById(this.usefulInfoId).pipe(take(1));
    this.usefulInfoDetails$ = combineLatest([this.usefulInfo$, currentLanguage$])
      .pipe(
        map(([usefulInfo, currentLanguage]) => {
          return this.usefulInfoService.translate([usefulInfo], currentLanguage)[0];
        })
      )
  }

}
