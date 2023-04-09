import { useIsAuthenticated } from '@azure/msal-react'
import { UserContext } from '../UserContext'
import { useMsGraphMe } from '../hooks/useGraph'
import { CurrentProfileInfo } from './CurrentProfileInfo'
import { MailboxSettingsForm } from './MailboxSettingsForm'

export const UserAuthenticated = (): JSX.Element => {
  const isAuthenticated = useIsAuthenticated()
  const { profile, mailboxSettings } = useMsGraphMe()
  return (
    <>
      {isAuthenticated && (
        <UserContext.Provider
          value={{
            ...profile.payload,
            mailboxSettings: mailboxSettings.payload,
          }}
        >
          <p>
            You are signed in! <CurrentProfileInfo></CurrentProfileInfo>
          </p>
          {mailboxSettings && !mailboxSettings.isLoading && (
            <MailboxSettingsForm
              model={mailboxSettings.payload}
            ></MailboxSettingsForm>
          )}
        </UserContext.Provider>
      )}
    </>
  )
}
