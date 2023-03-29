import { useMsGraphMe } from "../hooks/useGraph"

export function ProfileInfo(){
    const profile = useMsGraphMe()
    return <>
        {profile.firstname} {profile.lastname}
    </>
}