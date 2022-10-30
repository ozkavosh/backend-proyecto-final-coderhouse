import FirestoreContainer from '../containers/FirestoreContainer';

export default class CartFileDAO extends FirestoreContainer{
    constructor(){
        super("carts");
    }
}