export default class FirestoreContainer {
  collection: any;
  db: any;
  admin: any;

  constructor(collectionName: string) {
    this.admin = require('firebase-admin');
    this.db = this.admin.firestore();
    this.collection = this.db.collection(collectionName);
  }

  async save(object: any){
    try {
      const { id } = await this.collection.add(object);
      return { ...object, id };
    } catch (err) {
      throw new Error("Error saving object in file");
    }
  };

  async getAll(){
    try {
      const getDocs = await this.collection.get();
      return getDocs.docs.map((doc: any) => {
        return { ...doc.data(), id: doc.id };
      });
    } catch (err) {
      throw new Error("Error fetching objects");
    }
  };

  async getById(id: string){
    try {
      const findQuery = this.collection.doc(id);
      const doc = await findQuery.get();
      if(!doc.data()) return undefined;
      return {...doc.data(), id: doc.id};
    } catch (err) {
      throw new Error("Error fetching object");
    }
  };

  async update(id: string, object: any){
    try {
      const findQuery = this.collection.doc(id);
      await findQuery.update({ ...object });
      return await this.getById(id);
    } catch (err) {
      return undefined;
    }
  };

  async deleteById(id: string){
    try {
      const object = await this.getById(id);
      if(!object) return false;
      const findQuery = this.collection.doc(id);
      await findQuery.delete();
      return true;
    } catch (err) {
      throw new Error("Error removing object");
    }
  };

  async deleteAll(){
    try {
      const batch = this.db.batch();
      const snapshot = await this.collection.get();

      snapshot.docs.forEach((doc: any) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (err) {
      throw new Error("Error removing objects");
    }
  };
};
