type userDTOParams = {
  email: string;
  name: string;
  cellphone: number;
  id?: string;
  _id?: string;
};

export default class CartDTO {
  email: string;
  name: string;
  cellphone: number;
  id: string | undefined;

  constructor({ email, name, cellphone, id, _id }: userDTOParams) {
    this.email = email;
    this.name = name;
    this.cellphone = cellphone;
    this.id = id || _id;
  }
}
