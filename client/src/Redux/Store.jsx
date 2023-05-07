import { configureStore } from '@reduxjs/toolkit'
import roomSlice from './Reducer/roomSlice'
import logger from 'redux-logger'
import { combineReducers } from "redux";


const reducer = combineReducers({
    room: roomSlice,

});
export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: true
})