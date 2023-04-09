import { type Configuration, type RedirectRequest } from '@azure/msal-browser'

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID as string,
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: '/app',
    postLogoutRedirectUri: '/app',
  },
}

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: RedirectRequest = {
  scopes: ['User.Read', 'MailboxSettings.Read'],
}

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  graphMailboxEndpoint: (idOrUpn: string) =>
    `https://graph.microsoft.com/v1.0/users/${idOrUpn}/mailboxSettings`,
}
