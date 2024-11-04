import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export function validateRequestBody(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join(".")}: ${issue.message}`,
                }));
                res.status(400).json({ error: "Invalid data", details: errorMessages });
            } else res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

export function validateRequestQuery(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.query);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join(".")}: ${issue.message}`,
                }));
                res.status(400).json({ error: "Invalid data", details: errorMessages });
            } else res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

export function validateRequestParams(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.params);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join(".")}: ${issue.message}`,
                }));
                res.status(400).json({ error: "Invalid data", details: errorMessages });
            } else res.status(500).json({ error: "Internal Server Error" });
        }
    };
}
