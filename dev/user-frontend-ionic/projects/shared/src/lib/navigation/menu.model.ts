export type MenuItemType = 'static' | 'dynamic';

export enum MenuItemLinkType {
  router,
  external,
  sso
};

interface MenuItemLinkCommon {
  type: MenuItemLinkType;
}

export interface MenuItemRouterLink extends MenuItemLinkCommon {
  type: MenuItemLinkType.router;
  routerLink: string;
}

export interface MenuItemExternalLink extends MenuItemLinkCommon {
  type: MenuItemLinkType.external;
  url: string;
}

export interface MenuItemSsoLink extends MenuItemLinkCommon {
  type: MenuItemLinkType.sso;
  urlTemplate: string;
  service: string;
}

export type MenuItemLink = MenuItemRouterLink | MenuItemExternalLink | MenuItemSsoLink;

export interface MenuItem {
    icon: string;
    title: string;
    link: MenuItemLink;
    type: MenuItemType;
}
