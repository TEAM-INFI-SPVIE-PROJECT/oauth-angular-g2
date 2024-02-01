import { AuthConfig } from 'angular-oauth2-oidc';

const oAuthConfing: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: 'Add your client ID',
  scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',
};

export const environment = {
  production: false,
  apiKey: 'an-important-api-key',
  apiUrl: 'https://gmail.googleapis.com',
  oAuthConfing,
};
