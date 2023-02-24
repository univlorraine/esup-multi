export interface SsoServiceTokenQueryDto {
    service: string;
    authToken: string;
}

export interface SsoExternalLinkQueryDto {
    urlTemplate: string;
    service: string;
}
