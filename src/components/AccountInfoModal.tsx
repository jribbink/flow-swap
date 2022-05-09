// @ts-ignore
import * as fcl from '@onflow/fcl'
import useCurrentUser from 'hooks/use-current-user'
import { BaseModalProps } from 'models/base-modal-props'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import TransactionsList from './TransactionsList'

interface AccountInfoModalProps extends BaseModalProps {}

export default ({ show, onShowChange }: AccountInfoModalProps) => {
    const currentUser: any = useCurrentUser()
    if(!currentUser) return null

    return (
        <Modal show={show} onHide={() => onShowChange(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Account</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Address: {currentUser.addr}</p>
                <TransactionsList></TransactionsList>
            </Modal.Body>
        </Modal>
    )
}