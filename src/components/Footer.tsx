import Breakpoint from "./Breakpoint"
import NavigationMenu from "./NavigationMenu"

export default () => {
    return (
        <div className="d-flex flex-row justify-content-center p-4">
            <Breakpoint hide="md">
                <NavigationMenu></NavigationMenu>
            </Breakpoint>
        </div>
    )
}