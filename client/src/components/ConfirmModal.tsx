import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

type Props = {
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onClose: () => void;
};

const ConfirmModal = (props: Props) => {
    if (!props.isOpen) return <></>;
    return (
        <>
            <Modal isOpen={props.isOpen}>
                <ModalHeader>{props.title}</ModalHeader>

                <ModalBody>
                    <p dangerouslySetInnerHTML={{ __html: props.description }}></p>
                </ModalBody>

                <ModalFooter>
                    <Button color="danger" onClick={props.onConfirm}>
                        Delete
                    </Button>

                    <Button color="secondary" onClick={props.onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ConfirmModal;
