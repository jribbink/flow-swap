import React from "react"
import Header from "./Header"

type LayoutProps = {
    children: React.ReactNode
}

const overflowStyle = {
    overflow: 'scroll',
    maxHeight: '100vh',
    height: '100vh'
}

export default ({children}: LayoutProps) => {
    return (
        <div className="bg-success bg-opacity-25" style={overflowStyle}>
            <Header />
            <main className="container py-4">{children}</main>
        </div>
    )
}