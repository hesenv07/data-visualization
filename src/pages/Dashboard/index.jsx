import { useSelector } from "react-redux";
import { Widget, ChartTwo } from "components";
import { t } from "i18next";
import MyDomain from "../MyOrders";
const Dashboard = () => {
  const { userDomainCount, userHostingCount, userServerCount, userVPSCount } =
    useSelector((state) => state.common);

  return (
    <>
      <div className="grid gap-4 md:gap-6 content-stretch md:grid-cols-1 lg:grid-cols-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:gap-7.5">
          <Widget
            {...{
              iconName: "domain",
              title: t("domains"),
              count: userDomainCount,
              to: "my-domains",
              classes: "text-[#2563EB] w-11.5 h-11.5 stroke-1",
            }}
          />
        </div>
        <div>
          <ChartTwo />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6 md:gap-8">
        <MyDomain
          {...{
            // showActions: false,
            headTitle: false,
          }}
        />
      </div>
    </>
  );
};

export default Dashboard;
