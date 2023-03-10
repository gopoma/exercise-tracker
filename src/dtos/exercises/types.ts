import { Type } from "@sinclair/typebox";

export const descriptionDTOSchema = Type.String({
    isNotEmpty: true,
    transform: ["trim"],
    errorMessage: {
        type: "username should be a string",
        isNotEmpty: "username should not be empty"
    }
});

export const durationDTOSchema = Type.String({
    isNotEmpty: true,
    format: "integer",
    transform: ["trim"],
    errorMessage: {
        isNotEmpty: "duration should not be empty",
        format: "duration should be a valid integer greater than or equal to 0 and less than or equal to 10^16 - 1"
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

export const fromDTOSchema = Type.String({
    isNotEmpty: true,
    format: "date",
    errorMessage: {
        isNotEmpty: "date should not be empty",
        format: "from should be a valid date following the YYYY-MM-DD format"
    }
});

export const toDTOSchema = Type.String({
    isNotEmpty: true,
    format: "date",
    errorMessage: {
        isNotEmpty: "date should not be empty",
        format: "to should be a valid date following the YYYY-MM-DD format"
    }
});

export const limitDTOSchema = Type.String({
    isNotEmpty: true,
    format: "integer",
    transform: ["trim"],
    errorMessage: {
        isNotEmpty: "limit should not be empty",
        format: "limit should be a valid integer greater than or equal to 0 and less than or equal to 10^16 - 1"
    }
});
