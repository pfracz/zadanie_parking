import { useEffect, useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "./FormInput";

import ParkingArea from "../types/ParkingArea";
import ModalActions from "../types/ModalActions";
import { ParkingAreaFormFields, parkingAreaFormSchema } from "../types/ParkingAreaForm";

type Props = {
    isOpen: boolean;
    action: ModalActions;
    parkingArea: ParkingArea | null;
    onSubmit: (data: ParkingArea) => void;
    onClose: () => void;
};

const ParkingAreaFormModal = (props: Props) => {
    const [title, setTitle] = useState<string>("");

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ParkingAreaFormFields>({ resolver: zodResolver(parkingAreaFormSchema) });

    const onSubmit: SubmitHandler<ParkingAreaFormFields> = (data) => {
        props.onSubmit({ ...data, id: props.parkingArea?.id || null });
    };

    useEffect(() => {
        reset();

        if (props.action === ModalActions.EDIT && props.parkingArea) {
            setTitle(`Editing parking area (${props.parkingArea.name})`);

            setValue("name", props.parkingArea.name);
            setValue("weekdayRate", props.parkingArea.weekdayRate);
            setValue("weekendRate", props.parkingArea.weekendRate);
            setValue("discount", props.parkingArea.discount);
        } else {
            setTitle("Adding new parking area");
        }
    }, [props.action, props.parkingArea, setValue, props.isOpen, reset]);

    if (!props.isOpen) return <></>;
    return (
        <>
            <Modal isOpen={props.isOpen}>
                <ModalHeader>{title}</ModalHeader>

                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <FormInput
                                invalid={errors.name}
                                type="text"
                                placeholder="Enter parking area name"
                                {...register("name")}
                            />
                            {errors.name && <FormFeedback invalid>{errors.name.message}</FormFeedback>}
                        </FormGroup>

                        <FormGroup>
                            <Label for="weekdayRate">Weekday rate</Label>
                            <FormInput
                                invalid={errors.weekdayRate}
                                type="number"
                                min="0"
                                defaultValue={0}
                                {...register("weekdayRate")}
                            />
                            {errors.weekdayRate && <FormFeedback invalid>{errors.weekdayRate.message}</FormFeedback>}
                        </FormGroup>

                        <FormGroup>
                            <Label for="weekendRate">Weekend rate</Label>
                            <FormInput
                                invalid={errors.weekendRate}
                                type="number"
                                min="0"
                                defaultValue={0}
                                {...register("weekendRate")}
                            />
                            {errors.weekendRate && <FormFeedback invalid>{errors.weekendRate.message}</FormFeedback>}
                        </FormGroup>

                        <FormGroup>
                            <Label for="discount">Discount</Label>
                            <FormInput
                                invalid={errors.discount}
                                type="number"
                                min="0"
                                defaultValue={0}
                                {...register("discount")}
                            />
                            {errors.discount && <FormFeedback invalid>{errors.discount.message}</FormFeedback>}
                        </FormGroup>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit(onSubmit)}>
                        Save
                    </Button>

                    <Button color="secondary" onClick={props.onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ParkingAreaFormModal;
