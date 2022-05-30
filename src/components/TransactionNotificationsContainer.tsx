import { TransactionsContext } from 'contexts/transactions-context';
import { TXNotificationsContext } from 'contexts/tx-notifications-context';
import { Transaction } from 'models/transaction';
import { TXNotification } from 'models/tx-notification';
import { useContext, useEffect, useRef, useState } from 'react';
import TransactionNotification from './TransactionNotification';

export default () => {
  const [notifications, closeNotification] = useContext(TXNotificationsContext);

  return (
    <div className="p-4 d-flex flex-column" style={{ gap: '20px' }}>
      {notifications.map((notificaiton) => (
        <TransactionNotification
          key={notificaiton.transaction.id}
          notification={notificaiton}
          onCloseClick={() => closeNotification(notificaiton)}
        />
      ))}
    </div>
  );
};
