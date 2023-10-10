import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { FormOverlay, Alert } from "./components";
import { setToLocale } from "utils";
import {
  setAboutUs,
  useGetAboutInfosQuery,
} from "store";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/swiper.min.css";
import Routes from "./Routes"
import i18n from "i18next";

const App = () => {
  const dispatch = useDispatch()

  const { isLoading } = useSelector((state) => state.loading);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isSuccess } = useGetAboutInfosQuery();

  useEffect(() => {
    dispatch(setAboutUs(data?.body));
    setToLocale({ value: data?.body?.type, key: "typeWebsite" });
  }, [isSuccess]);


  useEffect(() => {
    const access_token = searchParams.get("access_token");
    const lang = searchParams.get('lang')

    if (access_token) {
      setToLocale({ value: access_token });
    }

    if(lang && lang !== 'null') {
      setToLocale({ key: 'language', value: lang })
      i18n.changeLanguage(lang);
    }

    searchParams.delete("access_token");
    searchParams.delete("lang")

    setSearchParams(searchParams)
  }, [searchParams]);


  return (
    <>
      <Alert />
      <div className="font-fira">
        {isLoading && <FormOverlay />}
        <Routes />
      </div>
    </>
  );
};

export default App;
