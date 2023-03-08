import { Type } from "@sinclair/typebox";

export const usernameDTOSchema = Type.String({
    isNotEmpty: true,
    maxLength: 255,
    transform: ["trim"],
    errorMessage: {
        type: "username have to be a string",
        isNotEmpty: "username does not have to be empty",
        maxLength: "username have to have at most 255 length"
    }
});
