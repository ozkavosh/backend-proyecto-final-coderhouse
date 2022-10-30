import { promises as fs } from "fs";
import { v4 as uuid } from "uuid";

export default class FileContainer {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  async save(object: any){
    try {
      const objects = await this.getAll();
      const newObject = { ...object, id: uuid() };
      await fs.writeFile(
        this.path,
        JSON.stringify([...objects, newObject], null, 4),
        "utf8"
      );
      return newObject;
    } catch (e) {
      throw new Error("Error saving object in file");
    }
  };

  async getAll(){
    try {
      const file = await fs.readFile(this.path, "utf8");
      return JSON.parse(file);
    } catch {
      console.error("File not found, creating a new one...");
      await fs.writeFile(this.path, JSON.stringify([], null, 4), "utf8");
      return [];
    }
  };

  async getById(id: string){
    const objects = await this.getAll();
    return objects.find((object: any) => object.id == id);
  };

  async update(id: string, updatedObject: any){
    const objects = await this.getAll();
    const objectsAux = objects.map((object: any) => {
      return object.id == id ? { ...object, ...updatedObject, id } : object;
    });
    await fs.writeFile(this.path, JSON.stringify(objectsAux, null, 4), "utf8");
    return objectsAux.find((object: any) => object.id === id);
  };

  async deleteById(id: string){
    const objects = await this.getAll();
    const objectsAux = objects.filter((object: any) => object.id != id);
    if(objects.length === objectsAux.length) return false;
    await fs.writeFile(this.path, JSON.stringify(objectsAux, null, 4), "utf8");
    return true;
  };

  async deleteAll(){
    await fs.writeFile(this.path, JSON.stringify([], null, 4), "utf8");
  }
}
