import FirestoreContainer from '../containers/FirestoreContainer';

export default class MessageFileDAO extends FirestoreContainer{
    constructor(){
        super("messages");
    }
}