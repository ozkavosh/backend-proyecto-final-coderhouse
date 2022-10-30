import CartFileDAO from "../daos/CartFileDAO";
import CartMemoryDAO from "../daos/CartMemoryDAO";
import CartMongoDAO from "../daos/CartMongoDAO";
import CartFirestoreDAO from "../daos/CartFirestoreDAO";

type storageMapperKeys = {
  [key: string]: () => CartFileDAO | CartMemoryDAO | CartMongoDAO | CartFirestoreDAO,
}

const storageMapper: storageMapperKeys = {
  file: () => new CartFileDAO(),
  memory: () => new CartMemoryDAO(),
  mongo: () => new CartMongoDAO(),
  firestore: () => new CartFirestoreDAO()
};

export const cartDAOFactory = (storage: string) => {
  const storageDAOFn = storageMapper[storage] || storageMapper["file"];
  const dao = storageDAOFn();
  return dao;
};
