import { BaseModalProps } from "models/base-modal-props"
import { Token } from "models/token"
import Image from "next/image"
import { Modal } from "react-bootstrap"

const noop = (...args: any[]) => {}

interface SelectTokenModalProps extends BaseModalProps {
    onTokenChange?: (token: Token) => void
    tokens: Token[]
    currentToken?: Token
    availableTokens: Token[]
}

export default ({
    onShowChange,
    onTokenChange,
    show,
    tokens,
    availableTokens
}: SelectTokenModalProps) => {
    const handleTokenClick = (token: Token) => {
        (onTokenChange ?? noop)(token)
        onShowChange(false)
    }

    return (
        <Modal show={show} onHide={() => onShowChange(false)} dialogClassName="modal-sm modal-h-90 rounded-1">
            <Modal.Header closeButton>
                <span style={{fontSize: '1.2em'}}>
                    Select a Token
                </span>
            </Modal.Header>
            <Modal.Body className="p-0">
                <div className="list-group m-0">
                {
                    tokens.map(token => (
                        <button
                            key={token.ticker}
                            className="list-group-item list-group-item-action hover-dark border-0 px-4 py-3 d-flex align-items-center listgroup-disabled-50 "
                            style={
                                !availableTokens.find(t => t.ticker == token.ticker) ? {opacity: '50%'}: {}
                            }
                            onClick={() => handleTokenClick(token)}
                        >
                            { token.image ?
                                <Image height={40} width={40} src={token.image} objectFit="contain" />
                            : null }
                            <span className="ps-2">
                                {token.ticker}
                            </span>
                        </button>
                    ))
                }
                </div>
            </Modal.Body>
        </Modal>
    )
}