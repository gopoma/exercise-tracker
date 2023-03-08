import { should } from "chai";
import request, { Response } from "supertest";
import app from "../../src/app";

should();

describe("GET /", () => {
    let response: Response;

    before(async () => {
        response = await request(app).get("/");
    });

    it("responds with 200", async () => {
        response.statusCode.should.be.equal(200);
    });

    it("responds with an object with project's details", async () => {
        response.body.should.be.deep.equal({
            name: "exercise-tracker",
            version: "1.0.0",
            author: "Gustavo Eduardo Ordoño Poma"
        });
    });
});
