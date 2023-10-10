import { useState, useEffect } from "react";
import { Icon } from "shared";
import { ErrorBoundaryClass } from "..";
import { t } from "i18next";
import { NavLink } from "react-router-dom";

const Title = ({ title, size = "xl" }) => {
  return (
    <h4 className={`text-${size} font-semibold text-black dark:text-white`}>
      {title}
    </h4>
  );
};

export const DataTable = ({
  header,
  body,
  keys,
  page,
  title,
  headTitle = true,
  iconName,
}) => {
  const [tableBody, setTableBody] = useState([]);

  useEffect(() => {
    setTableBody(
      body?.map((item) => {
        let ns = [];
        let _item = { ...item };

        for (let [key, value] of Object.entries(item)) {
          if (["price"].includes(key)) {
            _item[key] = value + " AZN";
          }
        }

        return { ..._item, ns };
      })
    );
  }, [body]);

  return (
    <ErrorBoundaryClass>
      <div>
        {headTitle && (
          <div className="flex px-4 mb-5 justify-between items-center rounded-sm border border-stroke text-black dark:text-white bg-white h-20 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex items-center gap-3">
              <Icon
                {...{
                  name: iconName,
                  className: "text-[#2563EB] w-9 h-9",
                }}
              />
              <Title title={title} />
            </div>

            <NavLink
              to="/dashboard"
              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white dark:text-gray hover:bg-opacity-70"
            >
              Visualization
            </NavLink>
          </div>
        )}
        <div className="rounded-sm border border-stroke text-black dark:text-white bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          {!headTitle && (
            <div className="mb-6 px-5 sm:px-0">
              <Title title={title} />
            </div>
          )}

          <div className="max-w-full overflow-x-auto">
            <table className="w-full overflow-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  {header?.map((item) => {
                    return (
                      <th
                        className={`${item.width} py-4 px-5 font-medium`}
                        key={item.key}
                      >
                        {t(item.key)}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {tableBody?.length ? (
                  tableBody?.map((data) => {
                    return (
                      <tr key={data.id}>
                        {keys?.map((key) => {
                          return (
                            <td
                              key={data[key]}
                              className="border-b border-[#eee] py-5 px-5 dark:border-strokedark"
                            >
                              {Array.isArray(data[key]) ? (
                                <ul>
                                  {data[key]?.map((v) => {
                                    return <li key={v}>{v}</li>;
                                  })}
                                </ul>
                              ) : (
                                <p>{data[key]}</p>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr className="h-20">
                    <td colSpan={header?.length} className="text-center">
                      {t("noData", { page: t(page)?.toLowerCase() })}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ErrorBoundaryClass>
  );
};
