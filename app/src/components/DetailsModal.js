import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const DetailsModal = ({open, modalHandler}) => {
    return (
        <Modal isOpen={open} toggle={modalHandler}>
        <ModalHeader toggle={modalHandler}>Modal title</ModalHeader>
        <ModalBody>
        </ModalBody>
      </Modal>
    )
}

export default DetailsModal