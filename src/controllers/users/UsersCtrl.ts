import {
    Authenticated,
    BodyParams,
    Controller,
    Delete,
    Get,
    PathParams,
    Post,
    Put,
    Required,
    Status
} from "@tsed/common";
import {Description, Summary} from "@tsed/swagger";
import {NotFound} from "ts-httpexceptions";
import {User} from "../../models/users/User";
import {UsersService} from "../../services/users/UsersService";

/**
 * Add @Controller annotation to declare your class as Router controller.
 * The first param is the global path for your controller.
 * The others params is the controller dependencies.
 */
@Controller("/users")
export class UsersCtrl {

    constructor(private usersService: UsersService) {

    }

    /**
     *
     * @param {string} id
     * @returns {Promise<IUser>}
     */
    @Get("/:id")
    @Summary("Return a user from his ID")
    @Status(200, {description: "Success", type: User})
    async get(@Required() @PathParams("id") id: string): Promise<User> {

        const user = await this.usersService.find(id);

        if (user) {
            return user;
        }

        throw new NotFound("User not found");
    }

    /**
     *
     * @param {User} user
     * @returns {Promise<User>}
     */
    @Put("/")
    @Summary("Create a new User")
    @Status(201, {description: "Created", type: User})
    save(@Description("User model")
         @BodyParams() user: User) {
        return this.usersService.save(user);
    }

    /**
     *
     * @param id
     * @param user
     * @returns {Promise<User>}
     */
    @Post("/:id")
    @Summary("Update user information")
    @Status(200, {description: "Success", type: User})
    async update(@PathParams("id") @Required() id: string,
                 @BodyParams() user: User): Promise<User> {

        user._id = id;

        return this.usersService.save
        (user);
    }

    /**
     *
     * @param id
     * @returns {{id: string, name: string}}
     */
    @Delete("/")
    @Authenticated()
    @Summary("Remove a user. You need to login to remove a user.")
    @Status(204, {description: "No content"})
    async remove(@BodyParams("id") @Required() id: string): Promise<User> {
        return this.usersService.remove(id);
    }

    /**
     *
     * @returns {Promise<IUser[]>}
     */
    @Get("/")
    // @Authenticated()
    @Summary("Return all users")
    @Status(200, {description: "Success", type: User, collectionType: Array})
    async getAllUsers(): Promise<User[]> {
        return this.usersService.query();
    }
}