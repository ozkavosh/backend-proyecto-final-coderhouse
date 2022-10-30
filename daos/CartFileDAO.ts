import FileContainer from '../containers/FileContainer';

export default class CartFileDAO extends FileContainer{
    constructor(){
        super("./db/carts.json");
    }
}