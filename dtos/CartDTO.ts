type cartDTOParams = {
  email: string;
  products: Array<any>;
  createdAt: string;
  id?: string;
  _id?: string;
};

export default class CartDTO {
  email: string;
  products: Array<any>;
  createdAt: string;
  id: string | undefined;

  constructor({
    email,
    products,
    createdAt,
    id,
    _id,
  }: cartDTOParams) {
    this.email = email;
    this.products = products;
    this.createdAt = createdAt;
    this.id = id || _id;
  }
}
