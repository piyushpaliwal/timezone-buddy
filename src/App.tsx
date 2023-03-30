import "./App.css";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { SignInButton } from "./components/SignInButton";
import { CurrentProfileInfo } from "./components/CurrentProfileInfo";
import { Form } from "react-bootstrap";
import { MailboxSettingsForm } from "./components/MailboxSettingsForm";
import { useMsGraphMe } from "./hooks/useGraph";
import React, { useState } from "react";
import { UserAuthenticated } from "./components/UserAuthenticated";

function App() {
    const [login, setLogin] = useState<string>("");
    return (
        <React.Fragment>
            <UnauthenticatedTemplate>
                <Form.Control type="text" placeholder="Your email address" id="loginHint" onChange={(e) => setLogin(e.target.value)}></Form.Control>
                <SignInButton loginHint={login}></SignInButton>
            </UnauthenticatedTemplate>
            <AuthenticatedTemplate>
               <UserAuthenticated></UserAuthenticated>
            </AuthenticatedTemplate>
        </React.Fragment>
    );
}

export default App;
