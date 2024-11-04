import { useEffect, useState } from "react";

import InfoModal from "../components/InfoModal";
import PaymentForm from "../components/PaymentForm";

import { getParkingAreas } from "../services/parkingAreaService";

import ParkingArea from "../types/ParkingArea";
import { PaymentFormFields } from "../types/PaymentForm";
import { getAmountToPay } from "../services/paymentService";

const PaymentPage = () => {
    const [parkingAreas, setParkingAreas] = useState<ParkingArea[]>([]);

    const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
    const [infoModalTitle, setInfoModalTitle] = useState<string>("");
    const [infoModalDescription, setInfoModalDescription] = useState<string>("");

    const refreshParkingAreas = async () => {
        getParkingAreas().then((response) => {
            setParkingAreas(response.data);
        });
    };

    useEffect(() => {
        refreshParkingAreas();
    }, []);

    const calculateAmount = (data: PaymentFormFields) => {
        getAmountToPay(data).then((response) => {
            setInfoModalTitle("Payment details");
            setInfoModalDescription(`Amount to pay: <b>${response.data.amountToPay.toFixed(2)}</b> ${data.currency}`);
            setIsInfoModalOpen(true);
        });
    };

    return (
        <>
            <PaymentForm parkingAreas={parkingAreas} onSubmit={calculateAmount}></PaymentForm>
            <InfoModal
                title={infoModalTitle}
                description={infoModalDescription}
                isOpen={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
            />
        </>
    );
};

export default PaymentPage;
