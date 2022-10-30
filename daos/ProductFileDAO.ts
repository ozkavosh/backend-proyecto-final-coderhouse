import FileContainer from '../containers/FileContainer';

export default class ProductFileDAO extends FileContainer{
    constructor(){
        super("./db/products.json");
    }
}