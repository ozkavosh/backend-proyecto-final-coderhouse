"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDAOFactory = void 0;
const ProductFileDAO_1 = __importDefault(require("../daos/ProductFileDAO"));
const ProductMemoryDAO_1 = __importDefault(require("../daos/ProductMemoryDAO"));
const ProductMongoDAO_1 = __importDefault(require("../daos/ProductMongoDAO"));
const ProductFirestoreDAO_1 = __importDefault(require("../daos/ProductFirestoreDAO"));
const storageMapper = {
    file: () => new ProductFileDAO_1.default(),
    memory: () => new ProductMemoryDAO_1.default(),
    mongo: () => new ProductMongoDAO_1.default(),
    firestore: () => new ProductFirestoreDAO_1.default()
};
const productDAOFactory = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper["file"];
    const dao = storageDAOFn();
    return dao;
};
exports.productDAOFactory = productDAOFactory;
