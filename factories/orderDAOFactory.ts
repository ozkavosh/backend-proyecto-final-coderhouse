import OrderFileDAO from "../daos/OrderFileDAO";
import OrderMemoryDAO from "../daos/OrderMemoryDAO";
import OrderMongoDAO from "../daos/OrderMongoDAO";
import OrderFirestoreDAO from "../daos/OrderFirestoreDAO";

type storageMapperKeys = {
  [key: string]: () => OrderFileDAO | OrderMemoryDAO | OrderMongoDAO | OrderFirestoreDAO,
}

const storageMapper: storageMapperKeys = {
  file: () => new OrderFileDAO(),
  memory: () => new OrderMemoryDAO(),
  mongo: () => new OrderMongoDAO(),
  firestore: () => new OrderFirestoreDAO()
};

export const orderDAOFactory = (storage: string) => {
  const storageDAOFn = storageMapper[storage] || storageMapper["file"];
  const dao = storageDAOFn();
  return dao;
};
