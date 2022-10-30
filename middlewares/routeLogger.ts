import type { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export const validRouteLogger = (req: Request, res: Response, next: NextFunction) => {
    logger.debug(`Request method: ${req.method} on route ${req.path}`);
    return next();
}

export const invalidRouteLogger = (req: Request, res: Response, next: NextFunction) => {
    logger.debug(`Request method ${req.method} on route ${req.path} not yet implemented`);
    return next();
}