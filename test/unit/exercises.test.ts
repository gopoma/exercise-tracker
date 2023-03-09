import { should } from "chai";
import {
    UsersService,
    ExercisesService
} from "../../src/services";

should();

describe("ExercisesService", function() {
    this.timeout(6000);

    let usersServ: UsersService;
    let user: any;
    let exercisesServ: ExercisesService;

    before(async () => {
        usersServ = new UsersService();
        user = await usersServ.create({ username: "gopoma" });

        exercisesServ = new ExercisesService();
    });

    it("All necesary properties sent, should create an exercise", async () => {
        const exercise = await exercisesServ.create(user._id, {
            description: "test",
            duration: 60,
            date: "2004-05-13"
        });

        exercise.should.be.an("object");
        exercise.should.be.deep.equal({
            _id: user._id,
            username: "gopoma",
            date: "Thu May 13 2004",
            duration: 60,
            description: "test"
        });
    });

    it("date not sent, should create an exercise", async () => {
        const exercise = await exercisesServ.create(user._id, {
            description: "test",
            duration: 60
        });

        exercise.should.be.an("object");
        exercise.should.be.deep.equal({
            _id: user._id,
            username: "gopoma",
            date: new Date().toDateString(),
            duration: 60,
            description: "test"
        });
    });

    after(async () => {
        await exercisesServ.deleteAll();
        await usersServ.deleteAll();
    });
});
