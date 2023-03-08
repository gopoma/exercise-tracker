import { should } from "chai";
import request, { Response } from "supertest";
import app from "../../src/app";

should();

describe("POST /api/users", () => {
    describe("Empty request", () => {
        let response: Response;

        beforeEach(async () => {
            response = await request(app).post("/api/users").send({});
        });

        it("responds with 400", () => {
            response.statusCode.should.be.equal(400);
        });

        it("responds with an object with error messages", () => {
            response.body.should.be.deep.equal({
                success: false,
                messages: ["Provide username"],
            });
        });
    });

    describe("Overpopulated request", () => {
        let response: Response;

        beforeEach(async () => {
            response = await request(app).post("/api/users").send({
                username: "gopoma",
                extra: true,
            });
        });

        it("responds with 400", () => {
            response.statusCode.should.be.equal(400);
        });

        it("responds with an object with error messages", () => {
            response.body.should.be.deep.equal({
                success: false,
                messages: ["do not send more/additional properties than you just have to send"],
            });
        });
    });

    describe("Valid request", () => {
        let response: Response;

        beforeEach(async () => {
            response = await request(app).post("/api/users").send({
                username: "gopoma",
            });
        });

        it("responds with 201", () => {
            response.statusCode.should.be.equal(201);
        });

        it("responds with Creating... message in body", () => {
            response.body.should.be.deep.equal({
                success: true,
                message: "Creating...",
            });
            // response.body.should.have.property("_id");
            // response.body._id.should.be.a("number");
            // response.body.should.have.property("username");
            // response.body.username.should.be.a("string");
            // response.body.username.should.be.equal("gopoma");
        });
    });
});
