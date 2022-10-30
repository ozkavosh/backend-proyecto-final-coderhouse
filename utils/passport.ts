import passport from "passport";
import UserRepository from "../repositories/UserRepository";
import UserService from "../services/UserService";
import logger from "./logger";
import { Strategy as LocalStrategy } from "passport-local";
import { isValidPassword } from "./password";
import mailer from "./mailer";

const userRepository = UserRepository.getInstance();
const userService = UserService.getInstance(userRepository);

passport.use(
  "login",
  new LocalStrategy(async (email, password, done) => {
    const user = await userService.getByEmail(email);

    if ("errors" in user) {
      logger.info(`No se encontró el usuario ${email}`);
      return done(null, false, {
        message: `No se encontró el usuario ${email}`,
      });
    }

    if (!isValidPassword(user, password)) {
      logger.info(`Intento de ingreso usuario ${email}, contraseña incorrecta`);
      return done(null, false, { message: "Contraseña incorrecta" });
    }

    return done(null, user);
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await userService.getByEmail(email);

      if (!("errors" in user)) {
        logger.info(`Se intentó crear un usuario ya existente`);
        return done(null, false, { message: "El usuario ya existe!" });
      }

      const newUser = {
        password: password,
        name: req.body.name,
        email,
        cellphone: parseInt(req.body.cellphone),
      };

      const newUserRequest = await userService.save(newUser);

      if ("errors" in newUserRequest) {
        logger.info(`Error guardando el usuario ${newUser.email}`);
        return done("Error saving user");
      }

      mailer.mailOptions.html = `
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

      mailer.transporter.sendMail(mailer.mailOptions, function (error, info) {
        if (error) {
          return logger.error(error);
        }

        logger.info(`Se envió un correo: ${info.response}`);
      });

      logger.info(`Se registró un nuevo usuario`);
      return done(null, newUserRequest);
    }
  )
);

passport.serializeUser(async (user, done) => {  
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userService.getById(id);
  done(null, user);
});

export default passport;
