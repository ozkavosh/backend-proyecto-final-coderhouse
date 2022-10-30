type productDTOParams = {
  title: string;
  price: number;
  category: string;
  description: string;
  photoUrl: string;
  id?: string;
  _id?: string;
};

export default class ProductDTO {
  title: string;
  price: number;
  category: string;
  description: string;
  photoUrl: string;
  id: string | undefined;

  constructor({
    title,
    price,
    category,
    description,
    photoUrl,
    id,
    _id,
  }: productDTOParams) {
    this.title = title;
    this.price = price;
    this.category = category;
    this.description = description;
    this.photoUrl = photoUrl;
    this.id = id || _id;
  }
}
