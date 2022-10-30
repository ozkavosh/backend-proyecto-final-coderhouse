import UserFileDAO from "../daos/UserFileDAO";
import UserMemoryDAO from "../daos/UserMemoryDAO";
import UserMongoDAO from "../daos/UserMongoDAO";
import UserFirestoreDAO from "../daos/UserFirestoreDAO";

type storageMapperKeys = {
  [key: string]: () => UserFileDAO | UserMemoryDAO | UserMongoDAO | UserFirestoreDAO,
}

const storageMapper: storageMapperKeys = {
  file: () => new UserFileDAO(),
  memory: () => new UserMemoryDAO(),
  mongo: () => new UserMongoDAO(),
  firestore: () => new UserFirestoreDAO()
};

export const userDAOFactory = (storage: string) => {
  const storageDAOFn = storageMapper[storage] || storageMapper["file"];
  const dao = storageDAOFn();
  return dao;
};
