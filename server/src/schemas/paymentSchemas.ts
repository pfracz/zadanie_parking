import { z } from "zod";
import Currency from "../models/currency";

export const getPaymentSchema = z.object({
    parkingAreaId: z.string().min(1),
    startTime: z.string().min(5, "Invalid time"),
    endTime: z.string().min(5, "Invalid time"),
    day: z.string().date(),
    currency: z.nativeEnum(Currency),
});
