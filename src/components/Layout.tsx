import { TransactionsProvider } from "contexts/transactions-context"
import { TXNotificationsProvider } from "contexts/tx-notifications-context"
import React from "react"
import Breakpoint from "./Breakpoint"
import Footer from "./Footer"
import Header from "./Header"
import TransactionNotificationsContainer from "./TransactionNotificationsContainer"

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
            <TXNotificationsProvider>
                <div className="bg-success bg-opacity-25 d-flex flex-column" style={overflowStyle}>
                    <Header />
                    <main className="p-4 flex-grow-1 d-flex flex-column align-items-center">
                        <Breakpoint hide="lg">
                            <TransactionNotificationsContainer />
                        </Breakpoint>
                        {children}
                    </main>
                    <div 
                        className="position-absolute vh-100 vw-100 d-flex flex-row justify-content-center pe-none"
                        style={{
                            paddingTop: "90px"
                        }}
                    >
                        <Breakpoint show="lg">
                            <div className="col"></div>
                        </Breakpoint>
                        <Breakpoint show="lg">
                            <div className="col d-flex flex-column align-items-end">
                                <div className="pe-auto">
                                    <TransactionNotificationsContainer />
                                </div>
                            </div>
                        </Breakpoint>
                    </div>
                    <Footer></Footer>
                </div>
            </TXNotificationsProvider>
        </TransactionsProvider>
    )
}