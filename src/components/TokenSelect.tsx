import { Token } from 'models/token';
import { MouseEventHandler, useEffect, useState } from 'react';
import FlowImage from 'assets/coins/FLOW.png';
import styles from 'styles/header.module.css';
import useCurrentUser from 'hooks/use-current-user';
import { useBalance } from 'hooks/use-balance';
import Image from 'next/image';
import TokenSelectModal from './TokenSelectModal';

const noop = (...args: any[]) => {};

type TokenSelectProps = {
  onChange?: (token: Token) => void;
  onClick?: MouseEventHandler;
  value?: Token;
  showBalance?: boolean;
  tokens: Token[];
  availableTokens?: Token[];
};

export default ({
  onChange,
  onClick,
  value: token,
  showBalance = false,
  tokens,
  availableTokens = tokens
}: TokenSelectProps) => {
  const [buttonClasses, setButtonClasses] = useState<string>();
  const [showModal, setShowModal] = useState(false);

  const user = useCurrentUser();
  const balance = useBalance('FLOW', user.addr);

  const getButtonClass = () => {
    let classes =
      'btn p-2 rounded-pill shadow d-flex flex-row align-items-center ';
    classes += styles['user-menu-balance'];

    if (token) {
      classes += ' bg-white ';
    } else {
      classes += ' bg-success text-white text-uppercase text-nowrap ';
    }

    return classes;
  };

  useEffect(() => setButtonClasses(getButtonClass()), [token]);

  const buttonClickHandler: MouseEventHandler = (e) => {
    setShowModal(true);
    (onClick ?? noop)(e);
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center">
        <button onClick={buttonClickHandler} className={buttonClasses}>
          {token ? (
            <>
              <Image src={FlowImage} width="45" height="45"></Image>
              <span className="ms-2">
                {showBalance ? balance : token?.ticker}
              </span>
            </>
          ) : (
            'Select Token'
          )}
        </button>
      </div>
      <TokenSelectModal
        show={showModal}
        onShowChange={setShowModal}
        onTokenChange={onChange}
        tokens={tokens}
        availableTokens={availableTokens}
      />
    </>
  );
};
