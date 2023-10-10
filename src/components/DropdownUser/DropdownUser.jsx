import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "shared";
import { t } from "i18next";

export const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { firstName, lastName, image } = user || {};
  const trigger = useRef(null);
  const dropdown = useRef(null);

  const clickHandler = useCallback(
    ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    },
    [dropdownOpen]
  );

  const keyHandler = useCallback(
    ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    },
    [dropdownOpen]
  );

  useEffect(() => {
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [clickHandler]);

  useEffect(() => {
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [keyHandler]);

  const handleLogout = async () => {
    console.log("Logout");
  };

  return (
    <div className="relative flex item-center">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-3 text-black dark:text-white"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium">
            {firstName + " " + lastName}
          </span>
        </span>

        <span className="rounded-full">
          {user?.image ? (
            <img
              className="w-8 h-8 rounded-[50%] shadow"
              src={image}
              alt="avatar"
            />
          ) : (
            <Icon name="userIcon" />
          )}
        </span>
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 top-7 mt-4 z-999 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              to="/user/profile"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center text-black dark:text-white gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <Icon name="profileIcon" />
              {t("myProfile")}
            </Link>
          </li>

          <li>
            <Link
              to="/user/settings"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center text-black dark:text-white gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <Icon name="settingsIcon" />
              {t("settings")}
            </Link>
          </li>
        </ul>
        <button
          className="flex text-black dark:text-white items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          onClick={handleLogout}
        >
          <Icon name="logoutIcon" />
          {t("signOut")}
        </button>
      </div>
    </div>
  );
};
