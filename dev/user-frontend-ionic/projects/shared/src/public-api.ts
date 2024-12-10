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

/*
 * Public API Surface of shared
 */

export * from './lib/alerts/alerts.service';
export * from './lib/auth/auth.guard';
export * from './lib/auth/auth.interceptor';
export * from './lib/auth/auth.repository';
export * from './lib/auth/authenticated-user.repository';
export * from './lib/auth/authenticated-username.repository';
export * from './lib/auth/keep-auth.repository';
export * from './lib/auth/keep-auth.service';
export * from './lib/authorization/authorization.helper';
export * from './lib/components/back-button/back-button.component';
export * from './lib/components/custom-icon/custom-icon.component';
export * from './lib/components/header/header.component';
export * from './lib/components/shared-components.module';
export * from './lib/components/widgets/widget-lifecycle.service';
export * from './lib/components/widgets/widget.component';
export * from './lib/errors';
export * from './lib/features/features.repository';
export * from './lib/features/features.service';
export * from './lib/guided-tour/guided-tour.repository';
export * from './lib/guided-tour/guided-tour.service';
export * from './lib/i18n/i18n.repository';
export * from './lib/navigation/menu-opener.service';
export * from './lib/navigation/menu.model';
export * from './lib/navigation/menu.service';
export * from './lib/navigation/navigation.service';
export * from './lib/navigation/page-layout.service';
export * from './lib/network/network.service';
export * from './lib/notifications/notifications.repository';
export * from './lib/notifications/notifications.service';
export * from './lib/pipe/complete-local-date-pipe';
export * from './lib/pipe/local-hour.pipe';
export * from './lib/pipe/relative-time-pipe';
export * from './lib/pipe/shared-pipe.module';
export * from './lib/pipe/truncate-pipe';
export * from './lib/project-module/project-module.service';
export * from './lib/project-module/static-menu.service';
export * from './lib/project-module/translations/translations-loader.factory';
export * from './lib/shared.actions';
export * from './lib/sso/sso.service';
export * from './lib/statistics/statistics.service';
export * from './lib/store/local-forage';
export * from './lib/store/user-store-helper';
export * from './lib/theme/theme.repository';
export * from './lib/theme/theme.service';
export * from './lib/version/version.service';
