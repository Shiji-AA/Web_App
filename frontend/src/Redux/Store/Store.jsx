import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../Slices/AuthSlice';
import {persistReducer,persistStore} from "redux-persist";
// import storage from "redux-persist/lib/storage";//localStorage
import storageModule from "redux-persist/lib/storage";
const storage = storageModule.default ?? storageModule;

const persistConfig = {    
  key: 'auth',
  storage,
}
const persistedAuthReducer = persistReducer(persistConfig, authSlice); 

export const store=configureStore({
    reducer:{
        auth:persistedAuthReducer,        
    }
})

export const persistor = persistStore(store)
