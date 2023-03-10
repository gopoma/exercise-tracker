import { Static, Type } from "@sinclair/typebox";
import {
    fromDTOSchema,
    toDTOSchema,
    limitDTOSchema
} from "../exercises/types";

export const GetLogsQueryDTOSchema = Type.Object(
    {
        from: Type.Optional(fromDTOSchema),
        to: Type.Optional(toDTOSchema),
        limit: Type.Optional(limitDTOSchema)
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "do not send more/additional properties than you just have to send"
        }
    }
);

export type GetLogsQueryDTO = Static<typeof GetLogsQueryDTOSchema>;
