import { Type } from "@sinclair/typebox";

export const usernameDTOSchema = Type.String({
    isNotEmpty: true,
    maxLength: 255,
    transform: ["trim"],
    errorMessage: {
        type: "username should be a string",
        isNotEmpty: "username should not be empty",
        maxLength: "username should be at most 255 length"
    }
});

export const _idDTOSchema = Type.String({
    isNotEmpty: true,
    format: "MongoId",
    errorMessage: {
        type: "_id should be a string",
        isNotEmpty: "_id should not be empty",
        format: "_id should be a valid MongoId"
    }
});
