import MongoDBContainer from '../containers/MongoDBContainer';
import CartModel from '../models/Cart';

export default class CartFileDAO extends MongoDBContainer{
    constructor(){
        super(CartModel);
    }
}