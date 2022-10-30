"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageDAOFactory = void 0;
const MessageFileDAO_1 = __importDefault(require("../daos/MessageFileDAO"));
const MessageMemoryDAO_1 = __importDefault(require("../daos/MessageMemoryDAO"));
const MessageMongoDAO_1 = __importDefault(require("../daos/MessageMongoDAO"));
const MessageFirestoreDAO_1 = __importDefault(require("../daos/MessageFirestoreDAO"));
const storageMapper = {
    file: () => new MessageFileDAO_1.default(),
    memory: () => new MessageMemoryDAO_1.default(),
    mongo: () => new MessageMongoDAO_1.default(),
    firestore: () => new MessageFirestoreDAO_1.default()
};
const messageDAOFactory = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper["file"];
    const dao = storageDAOFn();
    return dao;
};
exports.messageDAOFactory = messageDAOFactory;
