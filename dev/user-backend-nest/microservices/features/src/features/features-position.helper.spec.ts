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
