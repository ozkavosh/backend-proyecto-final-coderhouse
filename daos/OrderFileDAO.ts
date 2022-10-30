import FileContainer from '../containers/FileContainer';

export default class OrderFileDAO extends FileContainer{
    constructor(){
        super("./db/orders.json");
    }
}