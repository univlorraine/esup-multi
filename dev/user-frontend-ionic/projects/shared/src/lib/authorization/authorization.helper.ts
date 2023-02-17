type AuthorizationType = 'ALLOW'|'DISALLOW';

export interface Authorization {
    roles: string[];
    type: AuthorizationType;
}

export interface WithAuthorization {
    authorization?: Authorization;
};

export class AuthorizationHelper {

    constructor(private userRoles: string[]) {}

    public filter<T extends WithAuthorization>(toFilter: T[]): T[] {
        return toFilter.filter(({authorization}) => {
            if (!authorization) {
                return true;
            }

            const intersection = authorization.roles
                .filter(authorizationRole => this.userRoles.includes(authorizationRole));

            switch(authorization.type) {
                case 'ALLOW':
                    return intersection.length > 0;
                case 'DISALLOW':
                    return intersection.length === 0;
            }
        });
    }
}
