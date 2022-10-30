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
const uuid_1 = require("uuid");
class MemoryContainer {
    constructor(objects = []) {
        this.objects = objects;
    }
    save(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const newObject = Object.assign(Object.assign({}, object), { id: (0, uuid_1.v4)() });
            this.objects.push(newObject);
            return newObject;
        });
    }
    ;
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.objects;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.objects.find((object) => id == object.id);
        });
    }
    ;
    update(id, updatedObject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.objects.some((object) => id == object.id)) {
                this.objects = this.objects.map((object) => {
                    return object.id == id
                        ? Object.assign(Object.assign(Object.assign({}, object), updatedObject), { id }) : object;
                });
            }
            return this.objects.find((object) => object.id === id);
        });
    }
    ;
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.objects.some((object) => object.id === id)) {
                this.objects.splice(this.objects.indexOf(this.objects.find((object) => object.id == id) || -1), 1);
                return true;
            }
            return false;
        });
    }
    ;
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.objects = [];
        });
    }
    ;
}
exports.default = MemoryContainer;
;
