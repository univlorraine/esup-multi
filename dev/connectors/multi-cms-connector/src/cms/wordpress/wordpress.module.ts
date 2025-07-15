/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 * (dn-mobile-dev@univ-lorraine.fr)
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

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WordpressService } from '@wordpress/wordpress.service';
import { ChannelsWordpressModule } from '@wordpress/collections/channels/channels.wordpress.module';
import { ContactUsWordpressModule } from '@wordpress/collections/contact-us/contact-us.wordpress.module';
import { ImportantNewsWordpressModule } from '@wordpress/collections/important-news/important-news.wordpress.module';
import { SocialNetworksWordpressModule } from '@wordpress/collections/social-networks/social-networks.wordpress.module';
import { FeaturesWordpressModule } from '@wordpress/collections/features/features.wordpress.module';
import { LanguagesWordpressModule } from '@wordpress/collections/languages/languages.wordpress.module';
import { LoginWordpressModule } from '@wordpress/collections/login/login.wordpress.module';
import { StaticPagesWordpressModule } from '@wordpress/collections/static-pages/static-pages.wordpress.module';
import { WidgetsWordpressModule } from '@wordpress/collections/widgets/widgets.wordpress.module';

@Module({
  providers: [WordpressService],
  imports: [
    HttpModule,
    ChannelsWordpressModule,
    ContactUsWordpressModule,
    FeaturesWordpressModule,
    ImportantNewsWordpressModule,
    LanguagesWordpressModule,
    LoginWordpressModule,
    StaticPagesWordpressModule,
    SocialNetworksWordpressModule,
    WidgetsWordpressModule,
  ],
  exports: [
    ChannelsWordpressModule,
    ContactUsWordpressModule,
    WordpressService,
    FeaturesWordpressModule,
    ImportantNewsWordpressModule,
    LanguagesWordpressModule,
    LoginWordpressModule,
    StaticPagesWordpressModule,
    SocialNetworksWordpressModule,
    WidgetsWordpressModule,
  ],
})
export class WordpressModule {}
