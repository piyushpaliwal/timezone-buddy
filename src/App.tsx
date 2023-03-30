import React, { useState } from "react";
import {
  MsalProvider,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { type IPublicClientApplication } from "@azure/msal-browser";
import "./App.css";

import { SignInButton } from "./components/SignInButton";
import { ProfileInfo } from "./components/ProfileInfo";

interface AppProps {
  pca: IPublicClientApplication;
}

function App({ pca }: AppProps): JSX.Element {
  const [count, setCount] = useState(0);
  return (
    <MsalProvider instance={pca}>
      <div className="App">
        <UnauthenticatedTemplate>
          <SignInButton></SignInButton>
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
          <p>
            You are signed in! <ProfileInfo></ProfileInfo>
          </p>
        </AuthenticatedTemplate>
      </div>
    </MsalProvider>
  );
}

export default App;
