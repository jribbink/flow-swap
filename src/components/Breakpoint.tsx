import useWindowSize from "hooks/use-window-size"
import { ReactNode } from "react"

enum BootstrapBreakpoint {
    xs = 0,
    sm = 576,
    md = 768,
    lg = 992,
    xl = 1200,
    xxl = 1400
}

type BreakpointProps = {
    children: ReactNode,
    show?: "xs" | "sm" | "md" | "lg" | "xl" | "xl" | "xxl"
    hide?: "xs" | "sm" | "md" | "lg" | "xl" | "xl" | "xxl"
}

export default ({children, show, hide}: BreakpointProps) => {
    const windowSize = useWindowSize()

    if (!show || windowSize.width > BootstrapBreakpoint[show]) {
        if (!hide || windowSize.width < BootstrapBreakpoint[hide]) {
            return <>{children}</>
        }
    }
    return null
}