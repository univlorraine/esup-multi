import { Args, Query, Resolver } from '@nestjs/graphql';
import { Channels } from '@common/models/channels.model';
import { ChannelsWordpressService } from '@wordpress/collections/channels/channels.wordpress.service';

@Resolver(() => Channels)
export class ChannelsWordpressResolver {
  constructor(private readonly channelsService: ChannelsWordpressService) {}

  // Définition de la requête GraphQL qui sera exécutée depuis le backend de Multi
  @Query(() => [Channels], { name: 'channels' })
  async getChannels(): Promise<Channels[]> {
    return this.channelsService.getChannels();
  }

  @Query(() => Channels, { name: 'channel' })
  async getChannel(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Channels> {
    return this.channelsService.getChannel(Number(id));
  }
}
