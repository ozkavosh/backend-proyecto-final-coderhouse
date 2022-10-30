import MongoDBContainer from '../containers/MongoDBContainer';
import OrderModel from '../models/Order';

export default class OrderFileDAO extends MongoDBContainer{
    constructor(){
        super(OrderModel);
    }
}