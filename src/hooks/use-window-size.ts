import { WindowSize } from "models/window-size"
import { useEffect, useState } from "react"

export default () => {
    const [windowSize, setWindowSize] = useState<WindowSize>({width: 0, height: 0})

    useEffect(() => {
        const updateWindowSize = () => {
            const {clientWidth: width, clientHeight: height} = document.documentElement
            setWindowSize({
                width,
                height
            })
        }

        window.addEventListener("resize", updateWindowSize)
        updateWindowSize()
    }, [])

    return windowSize
}