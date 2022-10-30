"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const UserService_1 = __importDefault(require("../services/UserService"));
const logger_1 = __importDefault(require("./logger"));
const passport_local_1 = require("passport-local");
const password_1 = require("./password");
const mailer_1 = __importDefault(require("./mailer"));
const userRepository = UserRepository_1.default.getInstance();
const userService = UserService_1.default.getInstance(userRepository);
passport_1.default.use("login", new passport_local_1.Strategy((email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getByEmail(email);
    if ("errors" in user) {
        logger_1.default.info(`No se encontró el usuario ${email}`);
        return done(null, false, {
            message: `No se encontró el usuario ${email}`,
        });
    }
    if (!(0, password_1.isValidPassword)(user, password)) {
        logger_1.default.info(`Intento de ingreso usuario ${email}, contraseña incorrecta`);
        return done(null, false, { message: "Contraseña incorrecta" });
    }
    return done(null, user);
})));
passport_1.default.use("signup", new passport_local_1.Strategy({
    passReqToCallback: true,
}, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getByEmail(email);
    if (!("errors" in user)) {
        logger_1.default.info(`Se intentó crear un usuario ya existente`);
        return done(null, false, { message: "El usuario ya existe!" });
    }
    const newUser = {
        password: password,
        name: req.body.name,
        email,
        cellphone: parseInt(req.body.cellphone),
    };
    const newUserRequest = yield userService.save(newUser);
    if ("errors" in newUserRequest) {
        logger_1.default.info(`Error guardando el usuario ${newUser.email}`);
        return done("Error saving user");
    }
    mailer_1.default.mailOptions.html = `
          <div style="color:white; text-align:center; text-transform: uppercase; padding-top: 12px; padding-bottom: 12px; background-color: black;">Backend Shop</div>
          <b>Se registró un nuevo usuario: </b>
          <br>
          <div>
            <p>Correo: ${newUser.email}</p>
          </div>
          <div style="display:flex;flex-flow:row wrap;gap:1rem;">
            <p>Nombre: ${newUser.name}</p>
          </div>
          <div style="display:flex;flex-flow:row wrap;gap:1rem;">
            <p>Teléfono: ${newUser.cellphone}</p>
          </div>
          `;
    mailer_1.default.transporter.sendMail(mailer_1.default.mailOptions, function (error, info) {
        if (error) {
            return logger_1.default.error(error);
        }
        logger_1.default.info(`Se envió un correo: ${info.response}`);
    });
    logger_1.default.info(`Se registró un nuevo usuario`);
    return done(null, newUserRequest);
})));
passport_1.default.serializeUser((user, done) => __awaiter(void 0, void 0, void 0, function* () {
    done(null, user.id);
}));
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getById(id);
    done(null, user);
}));
exports.default = passport_1.default;
