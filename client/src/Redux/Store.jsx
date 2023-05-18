import { configureStore } from '@reduxjs/toolkit'
import roomSlice from './Reducer/roomSlice'
// import logger from 'redux-logger'
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["room"],
  };
const reducer = combineReducers({
    room: roomSlice,

});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true
})

export const persistor = persistStore(store);