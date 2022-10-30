import FirestoreContainer from '../containers/FirestoreContainer';

export default class UserFileDAO extends FirestoreContainer{
    constructor(){
        super("users");
    }
}