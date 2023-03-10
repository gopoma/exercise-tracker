import { ErrorObject, Schema } from "ajv";
import { Request, Response, NextFunction } from "express";
import ajv from "../libs/validation";
import status from "http-status";


type TargetOptions = "body" | "params" | "query";

function validateSchema(schema: Schema, target: TargetOptions = "body") {
    return (req: Request, res: Response, next: NextFunction) => {
        const validate = ajv.compile(schema);

        let requestTarget;
        switch(target) {
            case "body":
                requestTarget = req.body;
                break;
            case "params":
                requestTarget = req.params;
                break;
            case "query":
                requestTarget = req.query;
                break;
            default:
                throw new Error("introduced target is not valid!");
        }

        const isSchemaValid = validate(requestTarget);
        if(!isSchemaValid) {
            return res.status(status.BAD_REQUEST).json({
                success: false,
                messages: gatherErrorMessages(validate.errors)
            });
        }


        return next();
    };
}

// eslint-disable-next-line
function gatherErrorMessages(errors: ErrorObject<string, Record<string, any>, unknown>[] | null | undefined): string[] {
    return errors?.map(error => error?.message || "Error no documentado") || [];
}


export default validateSchema;
