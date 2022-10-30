import FileContainer from '../containers/FileContainer';

export default class MessageFileDAO extends FileContainer{
    constructor(){
        super("./db/messages.json");
    }
}