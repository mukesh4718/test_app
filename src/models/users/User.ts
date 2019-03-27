import {IgnoreProperty, Property, Required} from "@tsed/common";
import {Model} from "@tsed/mongoose";

@Model()
export class User {
    @Property()
    _id: string;

    @Property()
    @Required()
    first_name: string;

    @Property()
    last_name: string;

    @IgnoreProperty()
    password: string;

    @Property()
    @Required()
    email: string;

    @IgnoreProperty()
    phone: string;

    @IgnoreProperty()
    address: string;
}