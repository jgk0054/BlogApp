import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default: localStorage
import authReducer from './reducers/authReducer'; // Adjust the import path as needed

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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['persist/PERSIST']
    }
  })
});

const persistor = persistStore(store);

export { store, persistor };