import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Breadcrumb, Select } from "components";
import { languages } from "constants";
import { userApi } from "store";
import i18n, { t } from "i18next";
import { setToLocale, getFromLocale } from "utils";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lang, setLang] = useState(getFromLocale("language") || "en");

  const handleChangeLanguage = (e) => {
    const { value } = e.target;
    setLang(value);
    i18n.changeLanguage(value);
    setToLocale({ key: "language", value });
    navigate("/user/settings");
    dispatch(userApi.util.resetApiState());
  };

  return (
    <div className="mx-auto text-black dark:text-white">
      <Breadcrumb pageName={t("settings")} />
      <div className="w-full bg-white shadow-default dark:bg-boxdark rounded-md overflow-hidden">
        <div className="border px-10 min-h-[150px] w-full border-stroke py-5 dark:border-strokedark">
          <div className="flex gap-5 max-w-[350px] flex-col sm:flex-row">
            <Select
              {...{
                title: t("language"),
                defaultChecked: lang,
                options: languages,
                onChange: handleChangeLanguage,
                classes: "w-full sm:max-w-[100px]",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
