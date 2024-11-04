import { Router } from "express";
import parkingAreaRouter from "./parkingAreaRoutes";
import paymentRouter from "./paymentRoutes";

const router = Router();

router.use("/parking-area", parkingAreaRouter);
router.use("/payment", paymentRouter);

export default router;
