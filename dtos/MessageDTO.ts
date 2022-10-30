type cartDTOParams = {
  email: string;
  body: string;
  createdAt: string;
  id?: string;
  _id?: string;
};

export default class CartDTO {
  email: string;
  body: string;
  createdAt: string;
  id: string | undefined;

  constructor({
    email,
    body,
    createdAt,
    id,
    _id,
  }: cartDTOParams) {
    this.email = email;
    this.body = body;
    this.createdAt = createdAt;
    this.id = id || _id;
  }
}
