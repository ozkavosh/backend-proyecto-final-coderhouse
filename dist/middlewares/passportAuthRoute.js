"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passportAuthRoute = (req, res, next) => {
    if (req.isUnauthenticated()) {
        return res.redirect('/login');
    }
    return next();
};
exports.default = passportAuthRoute;
