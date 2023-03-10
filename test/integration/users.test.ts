import { should } from "chai";
import request, { Response } from "supertest";
import app from "../../src/app";
import { UsersService, ExercisesService } from "../../src/services";

should();

describe("Users' Endpoints", function() {
    // eslint-disable-next-line
    let user: any;

    describe("POST /api/users", function() {
        describe("Empty request", function() {
            this.timeout(6000);

            let response: Response;

            before(async () => {
                response = await request(app).post("/api/users").send({});
            });

            it("responds with 400", () => {
                response.statusCode.should.be.equal(400);
            });

            it("responds with an object with error messages", () => {
                response.body.should.be.deep.equal({
                    success: false,
                    messages: ["Provide username"]
                });
            });
        });

        describe("Overpopulated request", function() {
            this.timeout(6000);

            let response: Response;

            before(async () => {
                response = await request(app).post("/api/users").send({
                    username: "gopoma",
                    extra: true
                });
            });

            it("responds with 400", () => {
                response.statusCode.should.be.equal(400);
            });

            it("responds with an object with error messages", () => {
                response.body.should.be.deep.equal({
                    success: false,
                    messages: ["do not send more/additional properties than you just have to send"]
                });
            });
        });

        describe("Valid request", function() {
            this.timeout(6000);

            let response: Response;

            before(async () => {
                response = await request(app).post("/api/users").send({
                    username: "gopoma"
                });
            });

            it("responds with 201", () => {
                response.statusCode.should.be.equal(201);
            });

            it("responds with _id and username in body", () => {
                response.body.should.have.property("_id");
                response.body._id.should.be.a("string");
                response.body.should.have.property("username");
                response.body.username.should.be.a("string");
                response.body.username.should.be.equal("gopoma");

                user = response.body;
            });
        });
    });

    describe("GET /api/users", function() {
        this.timeout(6000);

        let response: Response;

        before(async () => {
            response = await request(app).get("/api/users");
        });

        it("responds with 200", () => {
            response.statusCode.should.be.equal(200);
        });

        it("responds with an array of users", () => {
            response.body.should.be.an("array");
            response.body.length.should.not.be.equal(0);
        });
    });

    describe("POST /api/users/:_id/exercises", function() {

        describe("Request with invalid MongoId", function() {
            this.timeout(6000);

            let response: Response;

            before(async () => {
                response = await request(app).post("/api/users/gopoma/exercises").send({
                    description: "test",
                    duration: "60",
                    date: "2004-005-13"
                });
            });

            it("responds with 400", () => {
                response.statusCode.should.be.equal(400);
            });

            it("responds with error messages in body", () => {
                response.body.should.be.deep.equal({
                    success: false,
                    messages: ["_id should be a valid MongoId"]
                });
            });
        });

        describe("Valid request with date", function() {
            this.timeout(6000);

            let response: Response;

            before(async () => {
                response = await request(app).post(`/api/users/${user._id}/exercises`).send({
                    description: "test",
                    duration: "60",
                    date: "2004-05-13"
                });
            });

            it("responds with 202", () => {
                response.statusCode.should.be.equal(202);
            });

            it("responds with an exercise's intance populated with related user data", () => {
                response.body.should.be.deep.equal({
                    _id: user._id,
                    username: "gopoma",
                    date: "Thu May 13 2004",
                    duration: 60,
                    description: "test"
                });
            });
        });

        describe("Valid request without date", function() {
            this.timeout(6000);

            let response: Response;

            before(async () => {
                response = await request(app).post(`/api/users/${user._id}/exercises`).send({
                    description: "test",
                    duration: "60"
                });
            });

            it("responds with 202", () => {
                response.statusCode.should.be.equal(202);
            });

            it("responds with an exercise's intance populated with related user data", () => {
                response.body.should.be.deep.equal({
                    _id: user._id,
                    username: "gopoma",
                    date: new Date().toDateString(),
                    duration: 60,
                    description: "test"
                });
            });
        });

        describe("Valid request with date with YYYY-MM-DD format", function() {
            this.timeout(6000);

            let response: Response;

            before(async () => {
                response = await request(app).post(`/api/users/${user._id}/exercises`).send({
                    description: "test",
                    duration: "60",
                    date: "2023-03-10"
                });
            });

            it("responds with 202", () => {
                response.statusCode.should.be.equal(202);
            });

            it("responds with an exercise's intance populated with related user data", () => {
                response.body.should.be.deep.equal({
                    _id: user._id,
                    username: "gopoma",
                    date: "Fri Mar 10 2023",
                    duration: 60,
                    description: "test"
                });
            });
        });

        describe("Valid request with date with YYYY-MM-0D format", function() {
            this.timeout(6000);

            let response: Response;

            before(async () => {
                response = await request(app).post(`/api/users/${user._id}/exercises`).send({
                    description: "test",
                    duration: "60",
                    date: "2023-03-09"
                });
            });

            it("responds with 202", () => {
                response.statusCode.should.be.equal(202);
            });

            it("responds with an exercise's intance populated with related user data", () => {
                response.body.should.be.deep.equal({
                    _id: user._id,
                    username: "gopoma",
                    date: "Thu Mar 09 2023",
                    duration: 60,
                    description: "test"
                });
            });
        });
    });

    describe("GET /api/users/:_id/logs", function() {
        describe("Request with invalid formats", function() {
            this.timeout(6000);

            let response: Response;

            before(async () => {
                response = await request(app).get(`/api/users/${user._id}/logs`).query({
                    from: "13 de mayo de 2004",
                    to: "13 de mayo de 2020",
                    limit: "Some number"
                });
            });

            it("responds with 400", () => {
                response.statusCode.should.be.equal(400);
            });

            it("responds with an error response in body", () => {
                response.body.should.be.deep.equal({
                    success: false,
                    messages: [
                        "from should be a valid date following the YYYY-MM-DD format",
                        "to should be a valid date following the YYYY-MM-DD format",
                        "limit should be a valid integer greater than or equal to 0 and less than or equal to 10^16 - 1"
                    ]
                });
            });
        });

        describe("Request without query params", function() {
            this.timeout(6000);

            let response: Response;

            before(async () => {
                response = await request(app).get(`/api/users/${user._id}/logs`);
            });

            it("responds with 200", () => {
                response.statusCode.should.be.equal(200);
            });

            it("responds with template success message", () => {
                response.body.should.be.an("object");
                Object.keys(response.body).should.have.members(["_id", "count", "log", "username"]);
                response.body._id.should.be.a("string");
                response.body._id.should.match(/^[0-9a-fA-F]{24}$/);
                response.body.count.should.be.a("number");
                response.body.log.should.be.an("array");
                response.body.username.should.be.equal("gopoma");
            });
        });
    });

    after(async () => {
        const exercisesServ = new ExercisesService();
        const usersServ = new UsersService();

        await exercisesServ.deleteAll();
        await usersServ.deleteAll();
    });
});
