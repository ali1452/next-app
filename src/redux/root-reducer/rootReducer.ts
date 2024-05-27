import { combineReducers } from 'redux';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// slices
import mainSlice from '../slice/mainSlice';
// import cartSlice from '../slice/cartSlice';

// ----------------------------------------------------------------------

export const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

export const storage =
  typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export const rootPersistConfig = {
  key: 'root',
  storage,
  version:1,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
const { cartSlice, productSlice } = mainSlice
const rootReducer = combineReducers({
   cart: cartSlice,
   product: productSlice
});

export default rootReducer;