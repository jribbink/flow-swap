// @ts-ignore
import * as fcl from "@onflow/fcl"
import Image from "next/image";
import { Component, useEffect, useState } from "react";
import KittyImage from "assets/kitty-eth.svg"
import ConnectWalletButton from "./ConnectWalletButton";
import UserMenu from "./UserMenu";
import useCurrentUser from "hooks/use-current-user";

type HeaderProps = {}

const headerStyles = {
    height: '90px'
}

export default (props: HeaderProps) => {
    const user: any = useCurrentUser()

    return (
        <div className="d-flex flex-row p-3" style={headerStyles}>
            <Image className="shadow" src={KittyImage} height="58" width="58"></Image>
            <div className="ms-auto align-self-center">
                { user.loggedIn ? <UserMenu user={user} /> : <ConnectWalletButton /> }
            </div>
        </div>
    )
}