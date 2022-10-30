import FirestoreContainer from '../containers/FirestoreContainer';

export default class OrderFileDAO extends FirestoreContainer{
    constructor(){
        super("orders");
    }
}