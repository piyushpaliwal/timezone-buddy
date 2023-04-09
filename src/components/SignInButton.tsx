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
    <button
      className='mx-auto h-10 w-40 rounded-full bg-indigo-600 text-white hover:bg-indigo-800'
      onClick={() => {
        handleLogin('redirect')
      }}
    >
      Sign in
    </button>
  )
}
