/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from 'react'
import { graphConfig, loginRequest, msalConfig } from '../authConfig'
import { useMsal } from '@azure/msal-react'
import { type Profile } from '../models/Profile'
import { type MailboxSettings } from '../models/MailboxSettings'

import { PublicClientApplication } from '@azure/msal-browser'
export interface IResponse<T> {
  isLoading: boolean
  isError: boolean
  error: string
  payload: T
}

// This should be the same instance you pass to MsalProvider
const msalInstance = new PublicClientApplication(msalConfig)

export const acquireAccessToken = async () => {
  const activeAccount = msalInstance.getActiveAccount() // This will only return a non-null value if you have logic somewhere else that calls the setActiveAccount API
  const accounts = msalInstance.getAllAccounts()

  if (activeAccount == null && accounts.length === 0) {
    /*
     * User is not signed in. Throw error or wait for user to login.
     * Do not attempt to log a user in outside of the context of MsalProvider
     */
  }
  const request = {
    ...loginRequest,
    account: accounts[0],
  }

  const authResult = await msalInstance.acquireTokenSilent(request)

  return authResult.accessToken
}

export const useMsGraphMe = () => {
  const { instance, accounts, inProgress } = useMsal()

  const [profile, setProfile] = useState<IResponse<Profile>>({
    isLoading: true,
    isError: false,
    payload: {} as Profile,
  } as IResponse<Profile>)

  const username = accounts.length > 0 ? accounts[0].username : ''

  const { mailboxSettings } = useGraphMailboxSettings(username)

  useEffect(() => {
    if (accounts.length > 0) {
      const fetchData = async () => {
        const bearerToken = await acquireAccessToken()

        const headers = new Headers()

        const bearer = `Bearer ${bearerToken}`

        headers.append('Authorization', bearer)

        const options = {
          method: 'GET',
          headers,
        }

        const data = await fetch(graphConfig.graphMeEndpoint, options)
        const json = await data.json()
        setProfile({
          ...profile,
          isLoading: false,
          payload: {
            firstname: json.givenName as string,
            lastname: json.surname as string,
            email: json.userPrincipalName as string,
            id: json.id as string,
          },
        })
      }

      fetchData().catch((error) => {
        console.log(error)
        setProfile({
          ...profile,
          isError: true,
          isLoading: false,
          error,
        })
      })
    }
  }, [username])

  return { profile, mailboxSettings }
}

export const useGraphMailboxSettings = (idOrUpn: string) => {
  const [mailboxSettings, setMailboxSettings] = useState<
    IResponse<MailboxSettings>
  >({
    isLoading: true,
    isError: false,
    payload: {} as MailboxSettings,
  } as IResponse<MailboxSettings>)

  useEffect(() => {
    if (idOrUpn) {
      const fetchData = async () => {
        const headers = new Headers()

        const bearerToken = await acquireAccessToken()

        const bearer = `Bearer ${bearerToken}`

        headers.append('Authorization', bearer)

        const options = {
          method: 'GET',
          headers,
        }

        const data = await fetch(
          graphConfig.graphMailboxEndpoint(idOrUpn),
          options
        )
        const json = await data.json()

        setMailboxSettings({
          ...mailboxSettings,
          isLoading: false,
          payload: {
            timezone: json.timeZone as string,
            timeformat: json.timeFormat as string,
            dateformat: json.dateFormat as string,
            locale: {
              displayName: json.language.displayName as string,
              locale: json.language.locale as string,
            },
          },
        })

        return json
      }

      const result = fetchData().catch((error) => {
        console.log(error)
        setMailboxSettings({ ...mailboxSettings, isError: true, error })
      })
    }
  }, [idOrUpn])

  return { mailboxSettings }
}
