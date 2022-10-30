"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidRouteLogger = exports.validRouteLogger = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const validRouteLogger = (req, res, next) => {
    logger_1.default.debug(`Request method: ${req.method} on route ${req.path}`);
    return next();
};
exports.validRouteLogger = validRouteLogger;
const invalidRouteLogger = (req, res, next) => {
    logger_1.default.debug(`Request method ${req.method} on route ${req.path} not yet implemented`);
    return next();
};
exports.invalidRouteLogger = invalidRouteLogger;
