// @ts-ignore
import * as fcl from '@onflow/fcl'
import { useEffect, useState, createContext, ReactNode } from "react"

export const UserContext = createContext<any>({ loggedIn: false })

export const UserContextProvider = ({children}: {children: ReactNode}) => {
    const [currentUser, setCurrentUser] = useState<any>(() => ({loggedIn: false}))
    
    useEffect(() => {
        fcl.currentUser.subscribe(setCurrentUser)
    }, [])

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    )
}