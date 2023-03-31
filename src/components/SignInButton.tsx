import { Button } from 'react-bootstrap'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../authConfig'

export const SignInButton = (props: { loginHint: string }): JSX.Element => {
  const { instance } = useMsal()

  const handleLogin = (loginType: any): void => {
    if (loginType === 'redirect') {
      instance
        .loginRedirect({ ...loginRequest, loginHint: props.loginHint })
        .catch((e) => {
          console.log(e)
        })
    }
  }
  return (
    <Button
      variant='secondary'
      className='ml-auto'
      onClick={() => {
        handleLogin('redirect')
      }}
    >
      Sign in
    </Button>
  )
}
