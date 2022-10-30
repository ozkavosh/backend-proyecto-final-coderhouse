import MessageFileDAO from "../daos/MessageFileDAO";
import MessageMemoryDAO from "../daos/MessageMemoryDAO";
import MessageMongoDAO from "../daos/MessageMongoDAO";
import MessageFirestoreDAO from "../daos/MessageFirestoreDAO";

type storageMapperKeys = {
  [key: string]: () => MessageFileDAO | MessageMemoryDAO | MessageMongoDAO | MessageFirestoreDAO,
}

const storageMapper: storageMapperKeys = {
  file: () => new MessageFileDAO(),
  memory: () => new MessageMemoryDAO(),
  mongo: () => new MessageMongoDAO(),
  firestore: () => new MessageFirestoreDAO()
};

export const messageDAOFactory = (storage: string) => {
  const storageDAOFn = storageMapper[storage] || storageMapper["file"];
  const dao = storageDAOFn();
  return dao;
};
