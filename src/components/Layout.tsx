import React from "react"
import Breakpoint from "./Breakpoint"
import Footer from "./Footer"
import Header from "./Header"
import TransactionNotificationsContainer from "./TransactionNotificationsContainer"

type LayoutProps = {
    children: React.ReactNode
}

export default ({children}: LayoutProps) => {
    return (
        <div className="bg-success bg-opacity-25 d-flex flex-column vh-100 vw-100 overflow-auto">
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
    )
}