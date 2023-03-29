import { useState } from "react";
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import "./App.css";



import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { SignInButton } from "./components/SignInButton";
import { ProfileInfo } from "./components/ProfileInfo";

type AppProps = {
    pca: IPublicClientApplication;
};


function App({ pca }: AppProps) {
    const [count, setCount] = useState(0);
    return (
        <MsalProvider instance={pca}>
             
            <div className="App">

              
                <UnauthenticatedTemplate><SignInButton></SignInButton></UnauthenticatedTemplate>
                <AuthenticatedTemplate>
                <p>You are signed in! <ProfileInfo></ProfileInfo></p>
            </AuthenticatedTemplate>
            </div>
        </MsalProvider>
    );
}

export default App;
