import { useContext } from 'react'
import { UserContext } from '../UserContext'

export function CurrentProfileInfo() {
  const ctx = useContext(UserContext)
  return (
    <>
      {ctx.firstname} {ctx.lastname}
    </>
  )
}
