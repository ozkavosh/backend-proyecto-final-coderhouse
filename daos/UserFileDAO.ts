import FileContainer from '../containers/FileContainer';

export default class UserFileDAO extends FileContainer{
    constructor(){
        super("./db/users.json");
    }
}