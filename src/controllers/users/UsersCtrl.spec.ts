import {ControllerService} from "@tsed/common";
import {inject} from "@tsed/testing";
import {expect, Sinon} from "../../../test/tools";
import {UsersService} from "../../services/users/UsersService";
import {UsersCtrl} from "./UsersCtrl";

describe("UsersCtrl", () => {

    describe("without IOC", () => {
        before(() => {
            this.userServiceStub = {};
            this.usersCtrl = new UsersCtrl(this.userServiceStub);
        });

        it("should do something", () => {
            expect(this.usersCtrl).to.be.an.instanceof(UsersCtrl);
        });
    });

    describe("via InjectorService to mock other service", () => {
        before(inject([ControllerService], (controllerService: ControllerService) => {

            this.usersService = {
                find: Sinon.stub().returns(Promise.resolve({id: "1"}))
            };

            const locals = new Map<any, any>();
            locals.set(UsersService, this.usersService);

            this.UsersCtrl = controllerService.invoke<UsersCtrl>(UsersCtrl, locals);
            this.result = this.UsersCtrl.get("1");
            return this.result;
        }));

        it("should get the service from InjectorService", () => {
            expect(this.UsersCtrl).to.be.an.instanceof(UsersCtrl);
        });

        it("should have a fake memoryStorage", () => {
            expect(this.UsersCtrl.usersService).to.equal(this.usersService);
        });

        it("should have been called the UserService.find() method", () => {
            this.usersService.find.should.be.calledWithExactly("1");
        });

        it("should return the user", () => {
            return this.result.should.eventually.deep.equal({id: "1"});
        });
    });

});