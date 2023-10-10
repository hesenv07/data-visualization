import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  commonReducer,
  authReducer,
  modalsReducer,
  loadingReducer,
  alertReducer,
  notificationReducer,
  aboutUsReducer,
} from "./slices";

import {
  authApi,
  paymentApi,
  userApi,
  staticApi,
  notificationApi,
  productsApi,
} from "./apis";

export const store = configureStore({
  reducer: {
    //slices
    common: commonReducer,
    auth: authReducer,
    loading: loadingReducer,
    modals: modalsReducer,
    alert: alertReducer,
    notification: notificationReducer,
    aboutUs: aboutUsReducer,

    //apis rtk query
    [authApi.reducerPath]: authApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [staticApi.reducerPath]: staticApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(paymentApi.middleware)
      .concat(userApi.middleware)
      .concat(notificationApi.middleware)
      .concat(productsApi.middleware)
      .concat(staticApi.middleware),
});

setupListeners(store.dispatch);
