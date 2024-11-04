import { Button, Col, Form, FormFeedback, FormGroup, Label, Row } from "reactstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "./FormInput";

import Currency from "../types/Currency";
import ParkingArea from "../types/ParkingArea";
import { paymentFormSchema, PaymentFormFields } from "../types/PaymentForm";

type Props = {
    parkingAreas: ParkingArea[];
    onSubmit: (data: PaymentFormFields) => void;
};

const PaymentForm = (props: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PaymentFormFields>({ resolver: zodResolver(paymentFormSchema) });

    const onSubmit: SubmitHandler<PaymentFormFields> = (data) => {
        props.onSubmit(data);
    };

    return (
        <>
            <main className="container-fluid d-flex justify-content-center align-items-center pt-5">
                <Form onSubmit={handleSubmit(onSubmit)} className="col-xl-4 col-sm-6 col-12">
                    <Row>
                        <FormGroup>
                            <Label for="parkingArea">Parking area</Label>
                            <FormInput invalid={errors.parkingAreaId} type="select" {...register("parkingAreaId")}>
                                <option key="no_select" value="">
                                    -- select parking area --
                                </option>

                                {props.parkingAreas.map((area: ParkingArea) => {
                                    return (
                                        <option key={area.id} value={area.id!}>
                                            {area.name}
                                        </option>
                                    );
                                })}
                            </FormInput>
                            {errors.parkingAreaId && (
                                <FormFeedback invalid>{errors.parkingAreaId.message}</FormFeedback>
                            )}
                        </FormGroup>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="startTime">Start time</Label>
                                <FormInput invalid={errors.startTime} type="time" {...register("startTime")} />
                                {errors.startTime && <FormFeedback invalid>{errors.startTime.message}</FormFeedback>}
                            </FormGroup>
                        </Col>

                        <Col md={6}>
                            <FormGroup>
                                <Label for="endTime">End time</Label>
                                <FormInput invalid={errors.endTime} type="time" {...register("endTime")} />
                                {errors.endTime && <FormFeedback invalid>{errors.endTime.message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <FormGroup>
                            <Label for="day">Day</Label>
                            <FormInput invalid={errors.day} type="date" {...register("day")} />
                            {errors.day && <FormFeedback invalid>{errors.day.message}</FormFeedback>}
                        </FormGroup>
                    </Row>

                    <Row>
                        <FormGroup>
                            <Label for="currency">Currency</Label>
                            <FormInput
                                defaultValue={"USD"}
                                invalid={errors.currency}
                                type="select"
                                {...register("currency")}
                            >
                                {(Object.keys(Currency) as Array<keyof typeof Currency>).map((currency: string) => {
                                    return (
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    );
                                })}
                            </FormInput>
                            {errors.currency && <FormFeedback invalid>{errors.currency.message}</FormFeedback>}
                        </FormGroup>
                    </Row>

                    <Row className="mt-4">
                        <div className="d-flex">
                            <Button type="submit" color="primary" className="w-100">
                                Calculate
                            </Button>
                        </div>
                    </Row>
                </Form>
            </main>
        </>
    );
};

export default PaymentForm;
