import { Type } from "@sinclair/typebox";

export const descriptionDTOSchema = Type.String({
    isNotEmpty: true,
    transform: ["trim"],
    errorMessage: {
        type: "username should be a string",
        isNotEmpty: "username should not be empty"
    }
});

export const durationDTOSchema = Type.Number({
    exclusiveMinimum: 0,
    errorMessage: {
        type: "duration should be a number",
        minimum: "duration should be greater than 0"
    }
});

export const dateDTOSchema = Type.String({
    isNotEmpty: true,
    format: "date",
    errorMessage: {
        type: "date should be a date",
        isNotEmpty: "date should not be empty",
        format: "date should be a valid date following the YYYY-MM-DD format"
    }
});
