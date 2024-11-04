import { Request, Response, Router } from "express";
import { validateRequestBody, validateRequestParams } from "../middleware/validationMiddleware";
import ParkingArea from "../models/parkingAreaModel";
import {
    getParkingAreas,
    createParkingArea,
    updateParkingArea,
    deleteParkingArea,
} from "../controllers/parkingAreaController";
import {
    createParkingAreaSchema,
    updateParkingAreaSchema,
    deleteParkingAreaSchema,
} from "../schemas/parkingAreaSchemas";

const parkingAreaGET = async (req: Request, res: Response): Promise<any> => {
    try {
        let parkingAreas: ParkingArea[] = await getParkingAreas();
        return res.status(200).send(parkingAreas);
    } catch (e: any) {
        console.error(`[server] GET /parking-area error: ${e}`);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

const parkingAreaPOST = async (req: Request<{}, {}, ParkingArea>, res: Response): Promise<any> => {
    try {
        let newParkingAreaId: string = await createParkingArea(
            new ParkingArea(null, req.body.name, req.body.weekdayRate, req.body.weekendRate, req.body.discount)
        );
        return res.status(200).send({ id: newParkingAreaId });
    } catch (e: any) {
        console.error(`[server] POST /parking-area error: ${e}`);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

const parkingAreaPATCH = async (req: Request<{}, {}, ParkingArea>, res: Response): Promise<any> => {
    try {
        await updateParkingArea(
            new ParkingArea(req.body.id, req.body.name, req.body.weekdayRate, req.body.weekendRate, req.body.discount)
        );
        return res.status(200).send();
    } catch (e: any) {
        console.error(`[server] PUT /parking-area error: ${e}`);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

const parkingAreaDELETE = async (req: Request, res: Response): Promise<any> => {
    try {
        await deleteParkingArea(req.params.id);
        return res.status(200).send();
    } catch (e: any) {
        console.error(`[server] DELETE /parking-area error: ${e}`);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

const parkingAreaRouter = Router();

parkingAreaRouter.get("/", parkingAreaGET);
parkingAreaRouter.post("/", validateRequestBody(createParkingAreaSchema), parkingAreaPOST);
parkingAreaRouter.patch("/", validateRequestBody(updateParkingAreaSchema), parkingAreaPATCH);
parkingAreaRouter.delete("/:id(*)", validateRequestParams(deleteParkingAreaSchema), parkingAreaDELETE);

export default parkingAreaRouter;
