type orderDTOParams = {
  email: string;
  products: Array<any>;
  createdAt: string;
  orderNum: number;
  status: string;
  id?: string;
  _id?: string;
};

export default class OrderDTO {
  email: string;
  products: Array<any>;
  createdAt: string;
  orderNum: number;
  status: string;
  id: string | undefined;

  constructor({
    email,
    products,
    createdAt,
    orderNum,
    status,
    id,
    _id,
  }: orderDTOParams) {
    this.email = email;
    this.products = products;
    this.createdAt = createdAt;
    this.orderNum = orderNum;
    this.status = status;
    this.id = id || _id;
  }
}
