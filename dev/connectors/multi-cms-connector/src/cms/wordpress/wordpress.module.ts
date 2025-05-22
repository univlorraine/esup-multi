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
