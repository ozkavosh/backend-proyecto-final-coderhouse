import ProductFileDAO from "../daos/ProductFileDAO";
import ProductMemoryDAO from "../daos/ProductMemoryDAO";
import ProductMongoDAO from "../daos/ProductMongoDAO";
import ProductFirestoreDAO from "../daos/ProductFirestoreDAO";

type storageMapperKeys = {
  [key: string]: () => ProductFileDAO | ProductMemoryDAO | ProductMongoDAO | ProductFirestoreDAO,
}

const storageMapper: storageMapperKeys = {
  file: () => new ProductFileDAO(),
  memory: () => new ProductMemoryDAO(),
  mongo: () => new ProductMongoDAO(),
  firestore: () => new ProductFirestoreDAO()
};

export const productDAOFactory = (storage: string) => {
  const storageDAOFn = storageMapper[storage] || storageMapper["file"];
  const dao = storageDAOFn();
  return dao;
};
