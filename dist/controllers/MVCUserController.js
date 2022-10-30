"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MVCUserController {
    getIndex(req, res) {
        return res.redirect("/productos");
    }
    getLoginSuccess(req, res) {
        res.redirect("/");
    }
    getSignupSuccess(req, res) {
        res.redirect("/login");
    }
    getLogout(req, res) {
        req.logout({ keepSessionInfo: false }, (err) => {
            if (err)
                console.log(err);
            res.redirect("/login");
        });
    }
    renderLogin(req, res) {
        res.render("login", { error: req.flash("error")[0] });
    }
    renderSignup(req, res) {
        res.render("signup", { error: req.flash("error")[0] });
    }
}
exports.default = MVCUserController;
