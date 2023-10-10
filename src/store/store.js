import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  commonReducer,
  authReducer,
  modalsReducer,
  loadingReducer,
  alertReducer,
  aboutUsReducer,
} from "./slices";

import { authApi, productsApi } from "./apis";

export const store = configureStore({
  reducer: {
    //slices
    common: commonReducer,
    auth: authReducer,
    loading: loadingReducer,
    modals: modalsReducer,
    alert: alertReducer,
    aboutUs: aboutUsReducer,

    //apis rtk query
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(productsApi.middleware),
});

setupListeners(store.dispatch);
