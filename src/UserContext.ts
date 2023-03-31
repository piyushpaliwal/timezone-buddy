import React from 'react'
import { type MailboxSettings } from './models/MailboxSettings'

interface UserContext {
  firstname: string
  lastname: string
  email: string
  id: string
  mailboxSettings: MailboxSettings
}

export const UserContext = React.createContext<UserContext>({} as UserContext)
