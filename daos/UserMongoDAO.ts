import MongoDBContainer from '../containers/MongoDBContainer';
import UserModel from '../models/User';

export default class UserFileDAO extends MongoDBContainer{
    constructor(){
        super(UserModel);
    }
}