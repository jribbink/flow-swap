// @ts-ignore
import * as fcl from '@onflow/fcl'
import { fclConfig } from 'config/fcl-config'
import { useEffect } from 'react'

export default function useConfig() {
    useEffect(() => {
        fcl.config({
            ...fclConfig.baseConfig,
            ...(process.env.network ? (fclConfig.networks as any)[process.env.network] : {})
        })
    }, [])
}