// @ts-ignore
import * as fcl from '@onflow/fcl'
import useCurrentUser from 'hooks/use-current-user'
import { BaseModalProps } from 'models/base-modal-props'
import { Modal } from 'react-bootstrap'
import AccountWalletInfo from './AccountWalletInfo'
import TransactionsList from './TransactionsList'

interface AccountInfoModalProps extends BaseModalProps {}

export default ({ show, onShowChange }: AccountInfoModalProps) => {
    const currentUser: any = useCurrentUser()
    if(!currentUser) return null

    return (
        <Modal
            show={show}
            contentClassName={'rounded-4'}
            centered
            onHide={() => onShowChange(false)}
        >
            <Modal.Header bsPrefix="modal-header border-0 pb-0" closeButton>
                <Modal.Title>Account</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className='mb-4'>
                    <AccountWalletInfo></AccountWalletInfo>
                </div>
                <div style={{margin: '0 -1rem -1rem -1rem'}}>
                    <TransactionsList></TransactionsList>
                </div>
            </Modal.Body>
        </Modal>
    )
}