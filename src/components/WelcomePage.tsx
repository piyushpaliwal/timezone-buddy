import { SignInButton } from './SignInButton'

const WelcomePage = (): JSX.Element => {
  return (
    <>
      <div className='grid h-screen grid-cols-3 items-center px-40'>
        <div className='col-span-2'>
          <h1 className='text-4xl'>Welcome to Timezone Buddy</h1>
        </div>
        <div className='max-w-md'>
          <div className='grid gap-6'>
            <h2 className='text-xl'>
              Login using your Microsoft/Office Account
            </h2>
            <label className='block'>
              <span className='text-gray-700'>Email address</span>
              <input
                type='email'
                className='mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                placeholder='john@example.com'
              />
            </label>
            <SignInButton loginHint='' />
          </div>
        </div>
      </div>
    </>
  )
}
export default WelcomePage
