import Ajv, { KeywordCxt, _ } from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import addKeywords from "ajv-keywords";


function validateNotEmpty(cxt: KeywordCxt) {
    const { data, schema } = cxt;
    if (schema) {
        cxt.fail(_`${data}.trim() === ''`);
    }
}

const ajv = new Ajv({ allErrors: true })
    .addKeyword("kind")
    .addKeyword("modifier")
    .addKeyword({
        keyword: "isNotEmpty",
        schemaType: "boolean",
        type: "string",
        code: validateNotEmpty,
        error: { message: "string field must be non-empty" }
    });


addFormats(ajv, ["date", "email", "uri"])
    .addFormat("identificacion", /^[0-9]{8}$/)
    .addFormat("telefono", /^[0-9]{9}$/)
    .addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    .addFormat("integer", /^[0-9]{1,15}$/)
    .addFormat("MongoId", /^[0-9a-fA-F]{24}$/);


addErrors(ajv);
addKeywords(ajv, ["transform"]);


export default ajv;
