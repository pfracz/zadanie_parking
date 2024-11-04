import axios from "axios";
import { PaymentFormFields } from "../types/PaymentForm";

export const getAmountToPay = (data: PaymentFormFields) => {
    return axios.get<{ amountToPay: number }>(
        `http://localhost:3000/payment?parkingAreaId=${data.parkingAreaId}&startTime=${data.startTime}&endTime=${data.endTime}&day=${data.day}&currency=${data.currency}`
    );
};
