import {Middleware, PathParams, Required} from "@tsed/common";
import {NotFound} from "ts-httpexceptions";
import {UsersService} from "../../services/users/UsersService";

@Middleware()
export class CheckUserIdMiddleware {
    constructor(private userService: UsersService) {

    }

    async use(@Required() @PathParams("userId") userId: string) {

        try {
            await this.userService.find(userId);
        } catch (er) {
            throw new NotFound("UserDTO not found");
        }

    }
}