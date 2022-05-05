import Image from "next/image";
import KittyImage from "assets/kitty-eth.svg"
import ConnectWalletButton from "./ConnectWalletButton";
import UserMenu from "./UserMenu";
import useCurrentUser from "hooks/use-current-user";
import NavigationMenu from "./NavigationMenu";

type HeaderProps = {}

const headerStyles = {
    height: '90px'
}

export default (props: HeaderProps) => {
    const user: any = useCurrentUser()

    return (
        <div className="d-flex justify-content-between p-3 w-100" style={headerStyles}>
            <div className="col">
                <Image  src={KittyImage} height="58" width="58"></Image>
            </div>
            <NavigationMenu></NavigationMenu>
            <div className="align-self-center col text-end">
                { user.loggedIn ? <UserMenu user={user} /> : <ConnectWalletButton /> }
            </div>
        </div>
    )
}