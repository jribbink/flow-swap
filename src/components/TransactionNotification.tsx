import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { TXNotification } from 'models/tx-notification';
import { MouseEventHandler } from 'react';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { generateFlowscanURL } from 'util/util';

type TransactionNotificationProps = {
  notification: TXNotification;
  onCloseClick: MouseEventHandler;
};

export default ({
  notification,
  onCloseClick
}: TransactionNotificationProps) => {
  return (
    <div
      className="shadow rounded-4 bg-white d-flex flex-column overflow-hidden"
      style={{
        gap: '5px',
        width: '380px'
      }}
    >
      <div className="p-4 pb-3 d-flex flex-column">
        <div className="d-flex flex-row align-items-start">
          <span className="text-success" style={{ fontSize: '1.2em' }}>
            <FontAwesomeIcon className="pe-2" icon={faCheckCircle} />
            Transaction Sealed
          </span>
          <div
            className="btn p-0 ms-auto shadow-none"
            style={{ fontSize: '2em', lineHeight: '0.6em' }}
            onClick={onCloseClick}
          >
            <span aria-hidden="true">&times;</span>
          </div>
        </div>

        <div className="d-flex flex-row">
          <a
            className="btn btn-link p-0 text-decoration-none shadow-none"
            style={{ fontSize: '0.85em' }}
            href={generateFlowscanURL({
              transactionId: notification.transaction.id
            })}
            target="_blank"
          >
            {notification.transaction.description}
            <FontAwesomeIcon className="ps-2" icon={faArrowUpRightFromSquare} />
          </a>
        </div>
      </div>
      <div
        style={{
          height: '10px',
          backgroundColor: 'green',
          width: notification.progress * 100 + '%',
          margin: '0 !important'
        }}
      ></div>
    </div>
  );
};
