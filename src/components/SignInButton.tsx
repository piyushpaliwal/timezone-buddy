import { Button } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import React, { type FC } from "react";

export const SignInButton: FC = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType: any): void => {
    if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <Button
      variant="secondary"
      className="ml-auto"
      onClick={() => {
        handleLogin("redirect");
      }}
    >
      Sign in
    </Button>
  );
};
