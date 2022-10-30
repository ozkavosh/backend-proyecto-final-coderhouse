import { createServer } from "http";
import { Server } from "socket.io";
import flash from "connect-flash";
import express from "express";
import logger from "./utils/logger";
import session from "express-session";
import passport from "./utils/passport";
import MongoStore from "connect-mongo";
import {
  validRouteLogger,
  invalidRouteLogger,
} from "./middlewares/routeLogger";
import productRouter from "./routers/productRouter";
import mvcRouter, { getConnection } from "./routers/mvcRouter";
import cartRouter from "./routers/cartRouter";
import messageRouter from "./routers/messageRouter";
import orderRouter from "./routers/orderRouter";
import userRouter from "./routers/userRouter";

const app = express();
const server = createServer(app);
const io = new Server(server);
const sessionConfig =
  process.env.STORE === "mongo"
    ? session({
        store: MongoStore.create({
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
    : session({
        secret: "qwerty",
        rolling: true,
        resave: true,
        saveUninitialized: false,
        cookie: {
          maxAge: parseInt(process.env.SESSION_EXPIRE_TIMER || "60000"),
        },
      });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("./public"));
app.set("views", "./views/layouts");
app.set("view engine", "ejs");
app.use(validRouteLogger);
app.use(mvcRouter);
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/api/messages", messageRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use(invalidRouteLogger, (req, res) => {
  return res.status(404).json({
    error: "404",
    message: `Request method ${req.method} on route ${req.path} not yet implemented`,
  });
});

app.on("error", (e) => {
  logger.error(e);
});

io.on("connection", getConnection(io));

export default server;
