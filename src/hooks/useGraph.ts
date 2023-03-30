import { useState, useEffect } from "react";
import { graphConfig, loginRequest } from "../authConfig";
import { useMsal } from "@azure/msal-react";
import { type Profile } from "../models/Profile";

export const useMsBearerToken = (): string => {
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
      void instance.acquireTokenPopup(request).then((response) => {
        setAccessToken(response.accessToken);
      });
    });
  return accessToken;
};

export const useMsGraphMe = (): Profile => {
  const [profile, setProfile] = useState<Profile>({
    firstname: "",
    lastname: "",
    email: "",
    id: "",
  });

  const bearerToken = useMsBearerToken();

  useEffect(() => {
    if (bearerToken) {
      const headers = new Headers();

      const bearer = `Bearer ${bearerToken}`;

      headers.append("Authorization", bearer);

      const options = {
        method: "GET",
        headers,
      };

      fetch(graphConfig.graphMeEndpoint, options)
        .then(async (response) => await response.json())
        .then((data) => {
          setProfile({
            firstname: data.givenName as string,
            lastname: data.surname as string,
            email: data.userPrincipalName as string,
            id: data.id as string,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [bearerToken]);

  return profile;
};
