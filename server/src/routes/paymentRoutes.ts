import { Request, Response, Router } from "express";
import { calculateAmountToPay } from "../controllers/paymentController";
import { validateRequestQuery } from "../middleware/validationMiddleware";
import { getPaymentSchema } from "../schemas/paymentSchemas";
import Currency from "../models/currency";

const paymentGET = async (req: Request, res: Response): Promise<any> => {
    try {
        // We know data is correct since we already checked it in middleware
        let amountToPay: number = await calculateAmountToPay(
            req.query.parkingAreaId?.toString()!,
            req.query.startTime?.toString()!,
            req.query.endTime?.toString()!,
            req.query.day?.toString()!,
            req.query.currency?.toString()! as Currency
        );
        return res.status(200).send({ amountToPay });
    } catch (e: any) {
        console.error(`[server] GET /pay-amount error: ${e}`);
        return res.status(500).send();
    }
};

const paymentRouter = Router();

paymentRouter.get("/", validateRequestQuery(getPaymentSchema), paymentGET);

export default paymentRouter;
