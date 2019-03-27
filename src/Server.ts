import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import "@tsed/mongoose";
import "@tsed/swagger";

@ServerSettings({
    rootDir: __dirname,
    acceptMimes: ["application/json"],
    passport: {},
    mongoose: {
        url: "mongodb://tech33:PM47K1WAz8z28@localhost:27017/payment_solutions"
    },
    swagger: {
        path: "/api-docs"
    },
    debug: false
})
export class Server extends ServerLoader {

    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    $onMountingMiddlewares(): void | Promise<any> {

        const cookieParser = require("cookie-parser"),
            bodyParser = require("body-parser"),
            compress = require("compression"),
            methodOverride = require("method-override"),
            session = require("express-session");


        this
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }))
            .use(session({
                secret: "mysecretkey",
                resave: true,
                saveUninitialized: true,
                maxAge: 36000,
                cookie: {
                    path: "/",
                    httpOnly: true,
                    secure: false,
                    maxAge: null
                }
            }));

        return null;
    }
}