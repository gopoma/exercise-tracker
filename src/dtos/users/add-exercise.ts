import { Static, Type } from "@sinclair/typebox";
import { _idDTOSchema } from "./types";
import {
    descriptionDTOSchema,
    durationDTOSchema,
    dateDTOSchema
} from "../exercises/types";

export const AddExerciseParamsDTOSchema = Type.Object(
    {
        _id: _idDTOSchema
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "do not send more/additional properties than you just have to send",
            required: {
                _id: "Provide _id"
            }
        }
    }
);

export const AddExerciseDTOSchema = Type.Object(
    {
        description: descriptionDTOSchema,
        duration: durationDTOSchema,
        date: Type.Optional(dateDTOSchema)
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "do not send more/additional properties than you just have to send",
            required: {
                description: "Provide description",
                duration: "Provide duration"
            }
        }
    }
);

export type AddExerciseDTO = Static<typeof AddExerciseDTOSchema>;
