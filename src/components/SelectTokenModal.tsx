import { BaseModalProps } from "models/base-modal-props"
import { Modal } from "react-bootstrap"

interface SelectTokenModalProps extends BaseModalProps {}

export default ({show, onShowChange}: SelectTokenModalProps) => {
    return (
        <Modal show={show} onHide={() => onShowChange(false)} dialogClassName="modal-sm">
            <Modal.Header closeButton className="">
                Select a Chain
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <li>Hello</li>
                </ul>
            </Modal.Body>
        </Modal>
    )
}