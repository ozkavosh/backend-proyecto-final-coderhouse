"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    appenders: {
        miLoggerConsole: { type: "console" },
        miLoggerWarnFile: { type: "file", filename: "./logs/warn.log" },
        miLoggerErrorFile: { type: "file", filename: "./logs/error.log" },
        errorLogger: {
            type: "logLevelFilter",
            appender: "miLoggerErrorFile",
            level: "error",
            maxLevel: "error",
        },
        warnLogger: {
            type: "logLevelFilter",
            appender: "miLoggerWarnFile",
            level: "warn",
            maxLevel: "warn",
        },
    },
    categories: {
        default: {
            appenders: ["miLoggerConsole", "errorLogger", "warnLogger"],
            level: "all",
        },
    },
});
exports.default = log4js_1.default.getLogger();
