import { Args, Query, Resolver } from '@nestjs/graphql';
import { ChannelsDirectusService } from './channels.directus.service';
import { Channels } from '@common/models/channels.model';

@Resolver(() => Channels)
export class ChannelsDirectusResolver {
  constructor(private readonly channelsService: ChannelsDirectusService) {}

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
