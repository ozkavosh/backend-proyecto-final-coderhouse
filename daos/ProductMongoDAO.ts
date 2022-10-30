import MongoDBContainer from '../containers/MongoDBContainer';
import ProductModel from '../models/Product';

export default class ProductFileDAO extends MongoDBContainer{
    constructor(){
        super(ProductModel);
    }
}