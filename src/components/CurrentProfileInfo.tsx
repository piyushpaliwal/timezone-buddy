import { useContext } from 'react'
import { UserContext } from '../UserContext'

export const CurrentProfileInfo = (): JSX.Element => {
  const ctx = useContext(UserContext)
  return (
    <>
      {ctx.firstname} {ctx.lastname}
    </>
  )
}
