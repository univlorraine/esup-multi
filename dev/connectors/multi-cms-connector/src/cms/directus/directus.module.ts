import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChannelsDirectusModule } from '@directus/collections/channels/channels.directus.module';
import { LanguagesDirectusModule } from '@directus/collections/languages/languages.directus.module';
import { SocialNetworksDirectusModule } from '@directus/collections/social-networks/social-networks.directus.module';
import { PagesDirectusModule } from '@directus/collections/pages/pages.directus.module';
import { ImportantNewsDirectusModule } from '@directus/collections/important-news/important-news.directus.module';
import { ContactUsDirectusModule } from '@directus/collections/contact-us/contact-us.directus.module';
import { LoginDirectusModule } from '@directus/collections/login/login.directus.module';
import { FeaturesDirectusModule } from '@directus/collections/features/features.directus.module';
import { WidgetsDirectusModule } from '@directus/collections/widgets/widgets.directus.module';
import { DirectusService } from '@directus/directus.service';

@Module({
  providers: [DirectusService],
  imports: [
    HttpModule,
    ChannelsDirectusModule,
    ContactUsDirectusModule,
    FeaturesDirectusModule,
    ImportantNewsDirectusModule,
    LanguagesDirectusModule,
    LoginDirectusModule,
    PagesDirectusModule,
    SocialNetworksDirectusModule,
    WidgetsDirectusModule,
  ],
  exports: [
    ChannelsDirectusModule,
    ContactUsDirectusModule,
    DirectusService,
    FeaturesDirectusModule,
    ImportantNewsDirectusModule,
    LanguagesDirectusModule,
    LoginDirectusModule,
    PagesDirectusModule,
    SocialNetworksDirectusModule,
    WidgetsDirectusModule,
  ],
})
export class DirectusModule {}
