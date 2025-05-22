import { Args, Query, Resolver } from '@nestjs/graphql';
import { WidgetsWordpressService } from './widgets.wordpress.service';
import { Widgets } from '@common/models/widgets.model';

@Resolver(() => Widgets)
export class WidgetsWordpressResolver {
  constructor(private readonly widgetsService: WidgetsWordpressService) {}

  // Définition de la requête GraphQL qui sera exécutée depuis le backend de Multi
  @Query(() => [Widgets], { name: 'widgets' })
  async getWidgets(): Promise<Widgets[]> {
    return this.widgetsService.getWidgets();
  }

  @Query(() => Widgets, { name: 'widget' })
  async getWidget(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Widgets> {
    return this.widgetsService.getWidget(Number(id));
  }
}
