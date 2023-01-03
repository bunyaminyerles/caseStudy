import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
} from 'redux-persist';
import cartSlicer from "./cartSlicer";
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import productSlicer from "./productSlicer";

const testStore = configureStore({
    reducer: {
        cartState: cartSlicer,
        productState: productSlicer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export {testStore};

export type RootState = ReturnType<typeof testStore.getState>;
export type AppDispatch = typeof testStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;