import { should } from "chai";
import { UsersService } from "../../src/services";
import { after } from "mocha";

should();

describe("UsersService", () => {
    let usersServ: UsersService;

    before(() => {
        usersServ = new UsersService();
    });

    it("Should create a user", async () => {
        const user = await usersServ.create({
            username: "gopoma"
        });

        user.should.be.a("object");
        Object.keys(user).should.have.members(["_id", "username"]);
        user.should.have.property("_id");
        user._id.should.be.a("number");
        user.should.have.property("username");
        user.username.should.be.a("string");
        user.username.should.be.equal("gopoma");
    });

    it("Should get all users", async () => {
        const users = await usersServ.getAll();

        users.should.be.an("array");
        users.length.should.not.equal(0);

        const firstUser = users[0];
        Object.keys(firstUser).should.have.members(["_id", "username"]);
        firstUser._id.should.be.a("number");
        firstUser.username.should.be.a("string");
    });

    after(async () => {
        await usersServ.deleteAll();
    });
});
