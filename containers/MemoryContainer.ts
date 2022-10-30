import { v4 as uuid } from "uuid";

export default class MemoryContainer {
  objects: Object[];

  constructor(objects = []) {
    this.objects = objects;
  }

  async save(object: any){
    const newObject = { ...object, id: uuid() };
    this.objects.push(newObject);
    return newObject;
  };

  async getAll(){
    return this.objects;
  }

  async getById(id: string){
    return this.objects.find((object:any) => id == object.id);
  };

  async update(id: string, updatedObject: any){
    if (this.objects.some((object:any) => id == object.id)){
      this.objects = this.objects.map((object: any) => {
        return object.id == id
          ? { ...object, ...updatedObject, id }
          : object;
      });
    }
    return this.objects.find((object: any) => object.id === id);
  };

  async deleteById(id: string){
    if (this.objects.some((object:any) => object.id === id)){
      this.objects.splice(
        this.objects.indexOf(
          this.objects.find((object:any) => object.id == id) || -1
        ),
        1
      );
      return true;
    }
    return false;
  };

  async deleteAll(){
    this.objects = [];
  };
};
