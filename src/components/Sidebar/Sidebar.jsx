import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "shared";
import { t } from "i18next";

export const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const main_page_url = `${import.meta.env.VITE_MAIN_URL}`;

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark md:static md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center ml-5 justify-between gap-2 px-6 py-5.5 md:py-6.5">
        <a href={main_page_url}>
          <img src="agile-solutions-logo-small.png" className="dark:invert" />
        </a>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block md:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col p-4 lg:px-6 h-full justify-between md:justify-start overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 lg:mt-9">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5 items-start">
              {/* <!-- Menu Item Dashboard --> */}
              <li className="w-full">
                <NavLink
                  to="/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    (pathname === "/" || pathname.includes("dashboard")) &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <Icon name="dashboard" />
                  {t("dashboard")}
                </NavLink>
              </li>

              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Calendar --> */}
              <li className="w-full">
                <NavLink
                  to="/my-orders"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-3 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("my-domains") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <Icon name="orderList" />
                  {t("orders")}
                </NavLink>
                <NavLink
                  to="/user/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-3 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("my-domains") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <Icon name="settingsIcon" />
                  {t("settings")}
                </NavLink>
                <NavLink
                  to="/user/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-3 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("my-domains") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <Icon name="profileIcon" />
                  {t("myProfile")}
                </NavLink>
              </li>
              {/* <!-- Menu Item Domains --> */}

              {/* <!-- Menu Item Profile --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}

        <a
          href={main_page_url}
          className={`group md:hidden relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
        >
          <Icon name="main" className="w-5 h-5" fill={"white"} />
          {t("main_page")}
        </a>
      </div>
    </aside>
  );
};
