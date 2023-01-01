import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
} from 'redux-persist';
import cartSlicer from "./cartSlicer";
import { configureStore } from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import productSlicer from "./productSlicer";

const persistConfig = {
    key: 'cartState',
    storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlicer);
const store = configureStore({
    reducer: {
        cartState : persistedReducer,
        productState: productSlicer
    },
});

let persistor = persistStore(store);
export { persistor, store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;