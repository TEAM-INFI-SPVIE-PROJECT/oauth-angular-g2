import { AuthConfig } from 'angular-oauth2-oidc';

const oAuthConfing: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId:
    '16317450381-7aeki2toahkuh8pgv2tmg93t84ds4pbn.apps.googleusercontent.com',
  scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',
};

export const environment = {
  production: false,
  apiKey: 'an-important-api-key',
  apiUrl: 'https://gmail.googleapis.com',
  oAuthConfing,
};
