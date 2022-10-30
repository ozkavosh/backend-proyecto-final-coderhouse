"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartDAOFactory = void 0;
const CartFileDAO_1 = __importDefault(require("../daos/CartFileDAO"));
const CartMemoryDAO_1 = __importDefault(require("../daos/CartMemoryDAO"));
const CartMongoDAO_1 = __importDefault(require("../daos/CartMongoDAO"));
const CartFirestoreDAO_1 = __importDefault(require("../daos/CartFirestoreDAO"));
const storageMapper = {
    file: () => new CartFileDAO_1.default(),
    memory: () => new CartMemoryDAO_1.default(),
    mongo: () => new CartMongoDAO_1.default(),
    firestore: () => new CartFirestoreDAO_1.default()
};
const cartDAOFactory = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper["file"];
    const dao = storageDAOFn();
    return dao;
};
exports.cartDAOFactory = cartDAOFactory;
