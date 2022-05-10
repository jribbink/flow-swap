import { combineComponents } from "util/combine-components";
import { TransactionsProvider } from "./transactions-context";
import { TXNotificationsProvider } from "./tx-notifications-context";


const providers = [
    TransactionsProvider,
    TXNotificationsProvider
]

export const AppContextProvider = combineComponents(...providers)