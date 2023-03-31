import React from "react";
import { MailboxSettings } from "./models/MailboxSettings";

type UserContext = {
    firstname:string;
    lastname:string;
    email:string;
    id:string;
    mailboxSettings:MailboxSettings
}

export const UserContext = React.createContext<UserContext>({} as UserContext)