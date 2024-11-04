import { z } from "zod";

export const createParkingAreaSchema = z.object({
    name: z.string().min(1),
    weekdayRate: z.number().positive(),
    weekendRate: z.number().positive(),
    discount: z.number().optional(),
});

export const updateParkingAreaSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    weekdayRate: z.number().positive(),
    weekendRate: z.number().positive(),
    discount: z.number().optional(),
});

export const deleteParkingAreaSchema = z.object({
    id: z.string().min(1),
});
