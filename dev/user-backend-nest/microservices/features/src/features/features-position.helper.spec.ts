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

import { FeaturesPositionHelper } from './features-position.helper';
import { Feature, FeatureType } from './features.dto';

describe('FeaturesPositionHelper', () => {
  it('should not match any role and returns default position which is null', () => {
    const helper: FeaturesPositionHelper = new FeaturesPositionHelper([
      'r1',
      'r2',
    ]);
    const feature: Feature = {
      authorization: undefined,
      routerLink: '',
      type: FeatureType.Internal,
      id: '',
      icon: '',
      menu: null,
      widget: null,
      position: null,
      translations: [],
      settings_by_role: [
        {
          role: 'r3',
          position: 30,
        },
        {
          role: 'r4',
          position: 40,
        },
      ],
    };

    const position = helper.getFeaturePosition(feature);
    expect(position).toBeNull();
  });

  it('should not match any role and returns default position which is 5', () => {
    const helper: FeaturesPositionHelper = new FeaturesPositionHelper([
      'r1',
      'r2',
    ]);
    const feature: Feature = {
      routerLink: '',
      type: FeatureType.Internal,
      id: '',
      icon: '',
      menu: null,
      widget: null,
      authorization: null,
      position: 5,
      translations: [],
      settings_by_role: [
        {
          role: 'r3',
          position: 30,
        },
        {
          role: 'r4',
          position: 40,
        },
      ],
    };

    const position = helper.getFeaturePosition(feature);
    expect(position).toBe(5);
  });

  it('should match role r2 and returns its position which is 20', () => {
    const helper: FeaturesPositionHelper = new FeaturesPositionHelper([
      'r1',
      'r2',
    ]);
    const feature: Feature = {
      routerLink: '',
      type: FeatureType.Internal,
      id: '',
      icon: '',
      menu: null,
      widget: null,
      authorization: null,
      position: 5,
      translations: [],
      settings_by_role: [
        {
          role: 'r3',
          position: 30,
        },
        {
          role: 'r4',
          position: 40,
        },
        {
          role: 'r2',
          position: 20,
        },
      ],
    };

    const position = helper.getFeaturePosition(feature);
    expect(position).toBe(20);
  });

  it('should match roles r2 and r1 and returns first role r2 position which is 20', () => {
    const helper: FeaturesPositionHelper = new FeaturesPositionHelper([
      'r0',
      'r1',
      'r2',
    ]);
    const feature: Feature = {
      routerLink: '',
      type: FeatureType.Internal,
      id: '',
      icon: '',
      menu: null,
      widget: null,
      authorization: null,
      position: 5,
      translations: [],
      settings_by_role: [
        {
          role: 'r2',
          position: 20,
        },
        {
          role: 'r1',
          position: 10,
        },
      ],
    };

    const position = helper.getFeaturePosition(feature);
    expect(position).toBe(20);
  });

  it('should match roles r2 and r1 and returns first role r1 position which is 10', () => {
    const helper: FeaturesPositionHelper = new FeaturesPositionHelper([
      'r0',
      'r1',
      'r2',
    ]);
    const feature: Feature = {
      routerLink: '',
      type: FeatureType.Internal,
      id: '',
      icon: '',
      menu: null,
      widget: null,
      authorization: null,
      position: 5,
      translations: [],
      settings_by_role: [
        {
          role: 'r1',
          position: 10,
        },
        {
          role: 'r2',
          position: 20,
        },
      ],
    };

    const position = helper.getFeaturePosition(feature);
    expect(position).toBe(10);
  });
});
