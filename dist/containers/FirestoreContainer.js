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
class FirestoreContainer {
    constructor(collectionName) {
        this.admin = require('firebase-admin');
        this.db = this.admin.firestore();
        this.collection = this.db.collection(collectionName);
    }
    save(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = yield this.collection.add(object);
                return Object.assign(Object.assign({}, object), { id });
            }
            catch (err) {
                throw new Error("Error saving object in file");
            }
        });
    }
    ;
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getDocs = yield this.collection.get();
                return getDocs.docs.map((doc) => {
                    return Object.assign(Object.assign({}, doc.data()), { id: doc.id });
                });
            }
            catch (err) {
                throw new Error("Error fetching objects");
            }
        });
    }
    ;
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findQuery = this.collection.doc(id);
                const doc = yield findQuery.get();
                if (!doc.data())
                    return undefined;
                return Object.assign(Object.assign({}, doc.data()), { id: doc.id });
            }
            catch (err) {
                throw new Error("Error fetching object");
            }
        });
    }
    ;
    update(id, object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findQuery = this.collection.doc(id);
                yield findQuery.update(Object.assign({}, object));
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
                const object = yield this.getById(id);
                if (!object)
                    return false;
                const findQuery = this.collection.doc(id);
                yield findQuery.delete();
                return true;
            }
            catch (err) {
                throw new Error("Error removing object");
            }
        });
    }
    ;
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batch = this.db.batch();
                const snapshot = yield this.collection.get();
                snapshot.docs.forEach((doc) => {
                    batch.delete(doc.ref);
                });
                yield batch.commit();
            }
            catch (err) {
                throw new Error("Error removing objects");
            }
        });
    }
    ;
}
exports.default = FirestoreContainer;
;
