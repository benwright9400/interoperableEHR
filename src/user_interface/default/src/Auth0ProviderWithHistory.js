import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = 'dev-qtgsl0ktp0b74mjt.us.auth0.com';
  const clientId = 'yCKxo0dO5ODtFJgE6IkFKNSTG5SYXAm5';
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      useRefreshTokens={true}
      cacheLocation={'localstorage'}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://interoperable-ehr',
      }}
    >
      {children}
    </Auth0Provider>
  );
};
export default Auth0ProviderWithHistory;