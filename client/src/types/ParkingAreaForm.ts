import { z } from "zod";

export const parkingAreaFormSchema = z.object({
    name: z.coerce.string().min(1),
    weekdayRate: z.coerce.number().positive(),
    weekendRate: z.coerce.number().positive(),
    discount: z.coerce.number(),
});

export type ParkingAreaFormFields = z.infer<typeof parkingAreaFormSchema>;
