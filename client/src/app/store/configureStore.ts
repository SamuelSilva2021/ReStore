
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { catologSlice } from '../../features/catalog/catalogSlice';
import { cestaSlice } from '../../features/cesta/cestaSlice';
import { counterSlice } from '../../features/contact/counterSlice';

// export function configureStore(){
//     return createStore(counterReducer);
// }
export const store = configureStore({
    reducer:{
        counter: counterSlice.reducer,
        cesta: cestaSlice.reducer,
        catalog: catologSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;