import mongoose from "mongoose";

export default class MongoDBContainer {
  model: mongoose.Model<any>;

  constructor(model: mongoose.Model<any>) {
    this.model = model;
  }

  async save(object: any) {
    try {
      const document = await this.model.create(object);
      return await document.save();
    } catch (err) {
      throw new Error("Error saving object");
    }
  }

  async getAll() {
    try {
      const objects = await this.model.find();
      return objects;
    } catch (err) {
      throw new Error("Error fetching objects");
    }
  }

  async getById(id: string) {
    try{
      const object = await this.model.findOne({
        _id: new mongoose.Types.ObjectId(id),
      });
      return object;
    }catch{
      return undefined;
    }
  }

  async update(id: string, object: any){
    try {
      await this.model.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { ...object } }
      );
      return await this.getById(id);
    } catch (err) {
      return undefined;
    }
  };

  async deleteById(id: string){
    try {
      const deleteResult = await this.model.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
      return Boolean(deleteResult.deletedCount);
    } catch (err) {
      return false;
    }
  };

  async deleteAll(){
    await this.model.deleteMany({});
  };
}
