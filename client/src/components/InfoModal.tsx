import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

type Props = {
    isOpen: boolean;
    title: string;
    description: string;
    onClose: () => void;
};

const InfoModal = (props: Props) => {
    if (!props.isOpen) return <></>;
    return (
        <>
            <Modal isOpen={props.isOpen}>
                <ModalHeader>{props.title}</ModalHeader>

                <ModalBody>
                    <p dangerouslySetInnerHTML={{ __html: props.description }}></p>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={props.onClose}>
                        Ok
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default InfoModal;
