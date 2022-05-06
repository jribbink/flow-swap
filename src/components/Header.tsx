import Image from "next/image";
import KittyImage from "assets/kitty-eth.svg"
import ConnectWalletButton from "./ConnectWalletButton";
import UserMenu from "./UserMenu";
import useCurrentUser from "hooks/use-current-user";
import NavigationMenu from "./NavigationMenu";
import useWindowSize from "hooks/use-window-size";
import Breakpoint from "./Breakpoint";

type HeaderProps = {}

const headerStyles = {
    height: '90px'
}

export default (props: HeaderProps) => {
    const user = useCurrentUser()
    const windowSize = useWindowSize()

    return (
        <div className="d-flex justify-content-between p-3 w-100" style={headerStyles}>
            <div className="col">
                <div className="d-flex justify-content-start">
                    <Image src={KittyImage} height="58" width="58"></Image>
                </div>
            </div>
            <Breakpoint show="md">
                <NavigationMenu></NavigationMenu>
            </Breakpoint>
            <div className="align-self-center col">
                <div className="d-flex justify-content-end">
                { user.loggedIn ? <UserMenu user={user} /> : <ConnectWalletButton /> }
                </div>
            </div>
        </div>
    )
}