import type { Request, Response } from "express";

export default class MVCUserController {
  getIndex(req: Request, res: Response) {
    return res.redirect("/productos");
  }

  getLoginSuccess(req: Request, res: Response) {
    res.redirect("/");
  }

  getSignupSuccess(req: Request, res: Response) {
    res.redirect("/login");
  }

  getLogout(req: Request, res: Response) {
    req.logout({ keepSessionInfo: false }, (err) => {
      if (err) console.log(err);
      res.redirect("/login");
    });
  }

  renderLogin(req: Request, res: Response) {
    res.render("login", { error: req.flash("error")[0] });
  }

  renderSignup(req: Request, res: Response) {
    res.render("signup", { error: req.flash("error")[0] });
  }
}
