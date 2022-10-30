"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const connect_flash_1 = __importDefault(require("connect-flash"));
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./utils/logger"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./utils/passport"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const routeLogger_1 = require("./middlewares/routeLogger");
const productRouter_1 = __importDefault(require("./routers/productRouter"));
const mvcRouter_1 = __importStar(require("./routers/mvcRouter"));
const cartRouter_1 = __importDefault(require("./routers/cartRouter"));
const messageRouter_1 = __importDefault(require("./routers/messageRouter"));
const orderRouter_1 = __importDefault(require("./routers/orderRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
const sessionConfig = process.env.STORE === "mongo"
    ? (0, express_session_1.default)({
        store: connect_mongo_1.default.create({
            mongoUrl: process.env.MONGO_PATH,
        }),
        secret: "qwerty",
        rolling: true,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: parseInt(process.env.SESSION_EXPIRE_TIMER || "60000"),
        },
    })
    : (0, express_session_1.default)({
        secret: "qwerty",
        rolling: true,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: parseInt(process.env.SESSION_EXPIRE_TIMER || "60000"),
        },
    });
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, connect_flash_1.default)());
app.use(sessionConfig);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.static("./public"));
app.set("views", "./views/layouts");
app.set("view engine", "ejs");
app.use(routeLogger_1.validRouteLogger);
app.use(mvcRouter_1.default);
app.use("/api/carts", cartRouter_1.default);
app.use("/api/products", productRouter_1.default);
app.use("/api/messages", messageRouter_1.default);
app.use("/api/orders", orderRouter_1.default);
app.use("/api/users", userRouter_1.default);
app.use(routeLogger_1.invalidRouteLogger, (req, res) => {
    return res.status(404).json({
        error: "404",
        message: `Request method ${req.method} on route ${req.path} not yet implemented`,
    });
});
app.on("error", (e) => {
    logger_1.default.error(e);
});
io.on("connection", (0, mvcRouter_1.getConnection)(io));
exports.default = server;
