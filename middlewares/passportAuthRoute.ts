import type { Request, Response, NextFunction } from "express";

const passportAuthRoute = (req: Request, res: Response, next: NextFunction) => {
    if(req.isUnauthenticated()){
        return res.redirect('/login');
    }
    return next();
}

export default passportAuthRoute;