import { TransactionsProvider } from "contexts/transactions-context"
import React from "react"
import Footer from "./Footer"
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
        <TransactionsProvider>
            <div className="bg-success bg-opacity-25 d-flex flex-column" style={overflowStyle}>
                <Header />
                <div className="d-flex flex-row flex-grow-1">
                    <div className="col"></div>
                    <main className="container p-4">{children}</main>
                    <div className="col text-right">hey</div>
                </div>
                <Footer></Footer>
            </div>
        </TransactionsProvider>
    )
}