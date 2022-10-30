"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDAOFactory = void 0;
const UserFileDAO_1 = __importDefault(require("../daos/UserFileDAO"));
const UserMemoryDAO_1 = __importDefault(require("../daos/UserMemoryDAO"));
const UserMongoDAO_1 = __importDefault(require("../daos/UserMongoDAO"));
const UserFirestoreDAO_1 = __importDefault(require("../daos/UserFirestoreDAO"));
const storageMapper = {
    file: () => new UserFileDAO_1.default(),
    memory: () => new UserMemoryDAO_1.default(),
    mongo: () => new UserMongoDAO_1.default(),
    firestore: () => new UserFirestoreDAO_1.default()
};
const userDAOFactory = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper["file"];
    const dao = storageDAOFn();
    return dao;
};
exports.userDAOFactory = userDAOFactory;
