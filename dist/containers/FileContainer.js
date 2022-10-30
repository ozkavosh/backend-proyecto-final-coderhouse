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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const uuid_1 = require("uuid");
class FileContainer {
    constructor(path) {
        this.path = path;
    }
    save(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objects = yield this.getAll();
                const newObject = Object.assign(Object.assign({}, object), { id: (0, uuid_1.v4)() });
                yield fs_1.promises.writeFile(this.path, JSON.stringify([...objects, newObject], null, 4), "utf8");
                return newObject;
            }
            catch (e) {
                throw new Error("Error saving object in file");
            }
        });
    }
    ;
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield fs_1.promises.readFile(this.path, "utf8");
                return JSON.parse(file);
            }
            catch (_a) {
                console.error("File not found, creating a new one...");
                yield fs_1.promises.writeFile(this.path, JSON.stringify([], null, 4), "utf8");
                return [];
            }
        });
    }
    ;
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const objects = yield this.getAll();
            return objects.find((object) => object.id == id);
        });
    }
    ;
    update(id, updatedObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const objects = yield this.getAll();
            const objectsAux = objects.map((object) => {
                return object.id == id ? Object.assign(Object.assign(Object.assign({}, object), updatedObject), { id }) : object;
            });
            yield fs_1.promises.writeFile(this.path, JSON.stringify(objectsAux, null, 4), "utf8");
            return objectsAux.find((object) => object.id === id);
        });
    }
    ;
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const objects = yield this.getAll();
            const objectsAux = objects.filter((object) => object.id != id);
            if (objects.length === objectsAux.length)
                return false;
            yield fs_1.promises.writeFile(this.path, JSON.stringify(objectsAux, null, 4), "utf8");
            return true;
        });
    }
    ;
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_1.promises.writeFile(this.path, JSON.stringify([], null, 4), "utf8");
        });
    }
}
exports.default = FileContainer;
