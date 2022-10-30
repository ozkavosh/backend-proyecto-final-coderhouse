import bCrypt from "bcrypt";

export const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

export const encryptPassword = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};