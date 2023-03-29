import { useState, useEffect } from "react";
import { graphConfig } from "../authConfig";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { Profile } from "../models/Profile";

export function useMsBearerToken() {
    const { instance, accounts, inProgress } = useMsal();
    const [accessToken, setAccessToken] = useState("");
    const request = {
        ...loginRequest,
        account: accounts[0],
    };
    instance
        .acquireTokenSilent(request)
        .then((response) => {
            setAccessToken(response.accessToken);
        })
        .catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                setAccessToken(response.accessToken);
            });
        });
    return accessToken;
}

export function useMsGraphMe() {
    const [profile, setProfile] = useState<Profile>({ firstname: "", lastname: "", email: "",id:"" });

    const bearerToken = useMsBearerToken();

    useEffect(() => {
        if (bearerToken) {
            const headers = new Headers();

            const bearer = `Bearer ${bearerToken}`;

            headers.append("Authorization", bearer);

            const options = {
                method: "GET",
                headers: headers,
            };

            fetch(graphConfig.graphMeEndpoint, options)
                .then((response) => response.json())
                .then((data) => {
                    setProfile({
                        firstname: <string>data.givenName,
                        lastname: <string>data.surname,
                        email: <string>data.userPrincipalName,
                        id: <string>data.id,
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [bearerToken]);

    return profile;
}
