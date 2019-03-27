import {InjectorService} from "@tsed/common";
import {inject} from "@tsed/testing";
import {expect} from "chai";
import {Sinon} from "../../../test/tools";
import {User} from "../../models/users/User";
import {UsersService} from "./UsersService";

describe("UsersService", () => {

    describe("without IOC", () => {
        before(() => {
            this.model = {
                find: Sinon.stub().returns({
                    exec: Sinon.stub().returns(Promise.resolve([{}]))
                })
            };
            this.usersService = new UsersService(this.model);
        });

        it("should do something", () => {
            expect(this.usersService).to.be.an.instanceof(UsersService);
        });

        it("should call model.find method", () => {
            this.model.find.should.have.been.calledWithExactly({});
        });
    });

    describe("via InjectorService to mock other service", () => {
        before(inject([InjectorService], (injectorService: InjectorService) => {
            this.model = {
                find: Sinon.stub().returns({
                    exec: Sinon.stub().returns(Promise.resolve([{}]))
                })
            };

            const locals = new Map<any, any>();
            locals.set(User, this.model);

            this.usersService = injectorService.invoke<UsersService>(UsersService, locals);
        }));

        it("should do something", () => {
            expect(this.usersService).to.be.an.instanceof(UsersService);
        });

        it("should call model.find method", () => {
            this.model.find.should.have.been.calledWithExactly({});
        });
    });

});