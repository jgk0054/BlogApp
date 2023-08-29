// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default: localStorage

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['isAuthenticated', 'user'] // Specify which parts of the state you want to persist. Add more keys as needed.
};

const rootReducer = {
    auth: persistReducer(authPersistConfig, authReducer)
    // other reducers can be added here
};

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST']
      }
    })
  });
  
export const persistor = persistStore(store);

export default store;
