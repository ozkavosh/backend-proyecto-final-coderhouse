import FirestoreContainer from '../containers/FirestoreContainer';

export default class ProductFileDAO extends FirestoreContainer{
    constructor(){
        super("products");
    }
}