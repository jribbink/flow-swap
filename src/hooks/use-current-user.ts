// @ts-ignore
import * as fcl from '@onflow/fcl'
import { useEffect, useState } from "react"

export default () => {
    const [currentUser, setCurrentUser] = useState<any>(() => ({loggedIn: false}))
    
    useEffect(() => {
        fcl.currentUser.subscribe(setCurrentUser)
    }, [])

    return currentUser
}