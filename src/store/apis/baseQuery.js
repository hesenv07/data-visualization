import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { getFromLocale, getSearchParams } from "utils";

const { lang } = getSearchParams();

export const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_URL}/`,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    headers.set("Authorization", `Bearer `);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Language", `${lang || getFromLocale("language")}`);
    return headers;
  },
});
