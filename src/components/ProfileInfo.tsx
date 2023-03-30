import React, { type FC } from "react";
import { useMsGraphMe } from "../hooks/useGraph";

export const ProfileInfo: FC = () => {
  const profile = useMsGraphMe();
  return (
    <>
      {profile.firstname} {profile.lastname}
    </>
  );
};
