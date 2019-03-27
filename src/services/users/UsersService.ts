import {Inject, Service} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {$log} from "ts-log-debug";
import {User} from "../../models/users/User";


@Service()
export class UsersService {

    constructor(@Inject(User) private userModel: MongooseModel<User>) {
        this.reload();
    }

    async reload() {
        return this.userModel
            .find({})
            .exec()
            .then((users) => {
                if (users.length === 0) {
                    this.userModel.create(...require("../../../resources/users.json"));
                }
            })
            .catch(err => console.error(err));
    }

    /**
     * Find a user by his ID.
     * @param id
     * @returns {undefined|User}
     */
    async find(id: string): Promise<User> {
        $log.debug("Search a user from ID", id);
        const user = await this.userModel.findById(id).exec();

        $log.debug("Found", user);
        return user;
    }

    /**
     *
     * @param user
     * @returns {Promise<TResult|TResult2|User>}
     */
    async save(user: User): Promise<User> {
        $log.debug({message: "Validate user", user});

        // const m = new CModel(user);
        // console.log(m);
        // await m.update(user, {upsert: true});

        const model = new this.userModel(user);
        $log.debug({message: "Save user", user});
        await model.save();

        $log.debug({message: "User saved", model});

        return model;
    }

    /**
     *
     * @returns {User[]}
     */
    async query(options = {}): Promise<User[]> {
        return this.userModel.find(options).exec();
    }

    /**
     *
     * @param id
     * @returns {Promise<User>}
     */
    async remove(id: string): Promise<User> {
        return await this.userModel.findById(id).remove().exec();
    }
}