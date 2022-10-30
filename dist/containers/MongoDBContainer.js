"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDBContainer {
    constructor(model) {
        this.model = model;
    }
    save(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield this.model.create(object);
                return yield document.save();
            }
            catch (err) {
                throw new Error("Error saving object");
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objects = yield this.model.find();
                return objects;
            }
            catch (err) {
                throw new Error("Error fetching objects");
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const object = yield this.model.findOne({
                    _id: new mongoose_1.default.Types.ObjectId(id),
                });
                return object;
            }
            catch (_a) {
                return undefined;
            }
        });
    }
    update(id, object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, { $set: Object.assign({}, object) });
                return yield this.getById(id);
            }
            catch (err) {
                return undefined;
            }
        });
    }
    ;
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteResult = yield this.model.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
                return Boolean(deleteResult.deletedCount);
            }
            catch (err) {
                return false;
            }
        });
    }
    ;
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.deleteMany({});
        });
    }
    ;
}
exports.default = MongoDBContainer;
