import { Static, Type } from "@sinclair/typebox";
import { usernameDTOSchema } from "./types";

export const CreateUserDTOSchema = Type.Object(
    {
        username: usernameDTOSchema
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "do not send more/additional properties than you just have to send",
            required: {
                username: "Provide username"
            }
        }
    }
);

export type CreateUserDTO = Static<typeof CreateUserDTOSchema>;
