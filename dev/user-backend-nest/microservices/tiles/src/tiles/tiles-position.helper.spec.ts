import { TilesPositionHelper } from './tiles-position.helper';
import { Tile, TileType } from './tiles.dto';

describe('TilesPositionHelper', () => {
  it('should not match any role and returns default position which is null', () => {
    const helper: TilesPositionHelper = new TilesPositionHelper(['r1', 'r2']);
    const tile: Tile = {
      routerLink: '',
      type: TileType.App,
      id: '',
      widget: null,
      position: null,
      translations: [],
      settingsByRole: [
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

    const position = helper.getTilePosition(tile);
    expect(position).toBeNull();
  });

  it('should not match any role and returns default position which is 5', () => {
    const helper: TilesPositionHelper = new TilesPositionHelper(['r1', 'r2']);
    const tile: Tile = {
      routerLink: '',
      type: TileType.App,
      id: '',
      widget: null,
      position: 5,
      translations: [],
      settingsByRole: [
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

    const position = helper.getTilePosition(tile);
    expect(position).toBe(5);
  });

  it('should match role r2 and returns its position which is 20', () => {
    const helper: TilesPositionHelper = new TilesPositionHelper(['r1', 'r2']);
    const tile: Tile = {
      routerLink: '',
      type: TileType.App,
      id: '',
      widget: null,
      position: 5,
      translations: [],
      settingsByRole: [
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

    const position = helper.getTilePosition(tile);
    expect(position).toBe(20);
  });

  it('should match roles r2 and r1 and returns first role r2 position which is 20', () => {
    const helper: TilesPositionHelper = new TilesPositionHelper([
      'r0',
      'r1',
      'r2',
    ]);
    const tile: Tile = {
      routerLink: '',
      type: TileType.App,
      id: '',
      widget: null,
      position: 5,
      translations: [],
      settingsByRole: [
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

    const position = helper.getTilePosition(tile);
    expect(position).toBe(20);
  });

  it('should match roles r2 and r1 and returns first role r1 position which is 10', () => {
    const helper: TilesPositionHelper = new TilesPositionHelper([
      'r0',
      'r1',
      'r2',
    ]);
    const tile: Tile = {
      routerLink: '',
      type: TileType.App,
      id: '',
      widget: null,
      position: 5,
      translations: [],
      settingsByRole: [
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

    const position = helper.getTilePosition(tile);
    expect(position).toBe(10);
  });
});
