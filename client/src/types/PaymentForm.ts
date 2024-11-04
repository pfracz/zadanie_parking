import { z } from "zod";
import Currency from "./Currency";

export const paymentFormSchema = z
    .object({
        parkingAreaId: z.coerce.string().min(1, "Invalid parking area"),
        startTime: z.coerce.string().min(5, "Invalid time"),
        endTime: z.coerce.string().min(5, "Invalid time"),
        day: z.coerce.string().date(),
        currency: z.nativeEnum(Currency),
    })
    .refine(
        (data) => {
            const startSplit = data.startTime.split(":");
            const endSplit = data.endTime.split(":");
            const startDate = new Date(0, 0, 0, Number(startSplit[0]), Number(startSplit[1]), 0);
            const endDate = new Date(0, 0, 0, Number(endSplit[0]), Number(endSplit[1]), 0);
            return endDate.getTime() > startDate.getTime();
        },
        { message: "End time must be after start time", path: ["endTime"] }
    )
    .refine(
        (data) => {
            const date = new Date(data.day);
            const today = new Date();
            return today.getTime() > date.getTime();
        },
        { message: "Can't pick a day in the future", path: ["day"] }
    );

export type PaymentFormFields = z.infer<typeof paymentFormSchema>;
