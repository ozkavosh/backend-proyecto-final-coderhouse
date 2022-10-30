import MongoDBContainer from '../containers/MongoDBContainer';
import MessageModel from '../models/Message';

export default class MessageFileDAO extends MongoDBContainer{
    constructor(){
        super(MessageModel);
    }
}