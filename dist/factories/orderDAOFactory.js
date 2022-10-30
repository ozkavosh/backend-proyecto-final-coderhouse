"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDAOFactory = void 0;
const OrderFileDAO_1 = __importDefault(require("../daos/OrderFileDAO"));
const OrderMemoryDAO_1 = __importDefault(require("../daos/OrderMemoryDAO"));
const OrderMongoDAO_1 = __importDefault(require("../daos/OrderMongoDAO"));
const OrderFirestoreDAO_1 = __importDefault(require("../daos/OrderFirestoreDAO"));
const storageMapper = {
    file: () => new OrderFileDAO_1.default(),
    memory: () => new OrderMemoryDAO_1.default(),
    mongo: () => new OrderMongoDAO_1.default(),
    firestore: () => new OrderFirestoreDAO_1.default()
};
const orderDAOFactory = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper["file"];
    const dao = storageDAOFn();
    return dao;
};
exports.orderDAOFactory = orderDAOFactory;
