// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import eventsReducer from "./slices/eventsSlice";
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, eventsReducer);

const store = configureStore({
  reducer: {
    events: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => {
    // Настраиваем middleware
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    });
  },
});

export const persistor = persistStore(store);
export default store;
