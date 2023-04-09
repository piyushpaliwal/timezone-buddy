import React from 'react'
import { type MailboxSettings } from './models/MailboxSettings'

interface iUserContext {
  firstname: string
  lastname: string
  email: string
  id: string
  mailboxSettings: MailboxSettings
}

export const UserContext = React.createContext<iUserContext>({
  firstname: '',
  lastname: '',
  email: '',
  id: '',
  mailboxSettings: {
    timezone: '',
    timeformat: '',
    dateformat: '',
    locale: { displayName: '', locale: '' },
  },
})
