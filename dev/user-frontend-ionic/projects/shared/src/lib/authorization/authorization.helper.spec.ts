import { TestBed } from '@angular/core/testing';

import { AuthorizationHelper, WithAuthorization } from './authorization.helper';

interface Stuff extends WithAuthorization {
    name: string;
}

describe('AuthorizationHelper', () => {

  it('should keep only allowed items', () => {
    const helper: AuthorizationHelper = new AuthorizationHelper(['r1','r2']);
    const unfiltered: Stuff[] = [
        {
            name: 'a',
        },
        {
            name: 'b',
            authorization: {
                roles: ['r1'],
                type: 'ALLOW'
            }
        },
        {
            name: 'c',
            authorization: {
                roles: ['r2'],
                type: 'ALLOW'
            },

        },
        {
            name: 'd',
            authorization: {
                roles: ['r3'],
                type: 'ALLOW'
            },

        }
    ];

    const filtered = helper.filter(unfiltered).map(i => i.name);
    expect(filtered).toEqual(['a', 'b', 'c']);
  });

  it('should exclude disallowed items', () => {
    const helper: AuthorizationHelper = new AuthorizationHelper(['r1','r2']);
    const unfiltered: Stuff[] = [
        {
            name: 'a',
        },
        {
            name: 'b',
            authorization: {
                roles: ['r1'],
                type: 'DISALLOW'
            }
        },
        {
            name: 'c',
            authorization: {
                roles: ['r2'],
                type: 'DISALLOW'
            },

        },
        {
            name: 'd',
            authorization: {
                roles: ['r3'],
                type: 'DISALLOW'
            },

        }
    ];

    const filtered = helper.filter(unfiltered).map(i => i.name);
    expect(filtered).toEqual(['a', 'd']);
  });
});
