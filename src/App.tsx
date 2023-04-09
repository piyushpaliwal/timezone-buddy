import './App.css'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react'
import React from 'react'
import { UserAuthenticated } from './components/UserAuthenticated'
import WelcomePage from './components/WelcomePage'

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <UnauthenticatedTemplate>
        <WelcomePage />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <UserAuthenticated></UserAuthenticated>
      </AuthenticatedTemplate>
    </React.Fragment>
  )
}

export default App
