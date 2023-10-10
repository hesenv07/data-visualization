import { useSelector } from "react-redux";
import { Widget, ChartTwo, BarChart, StockLineChart } from "components";
import { t } from "i18next";
import { useGetProductQuery } from "store";
const Dashboard = () => {
  const { userProductCount } = useSelector((state) => state.common);
  const { data } = useGetProductQuery();
  const calculateTotals = (products) => {
    let totalPrice = 0;
    let totalStock = 0;
    let totalDiscount = 0;

    products?.forEach((product) => {
      totalPrice += product.price;
      totalStock += product.stock;
      totalDiscount += product.discountPercentage;
    });

    return {
      totalPrice: totalPrice.toFixed(2),
      totalStock: totalStock,
      totalDiscount: totalDiscount.toFixed(2),
      priceDiscountDifference: totalPrice - totalDiscount,
    };
  };

  const { totalPrice, totalStock, totalDiscount, priceDiscountDifference } =
    calculateTotals(data?.products) || {};
  return (
    <>
      <div className="grid gap-4 md:gap-6 content-stretch md:grid-cols-1 lg:grid-cols-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:gap-7.5">
          <Widget
            {...{
              iconName: "orderList",
              title: t("orders"),
              count: userProductCount || data?.products.length,
              to: "my-orders",
              classes: "text-[#2563EB] w-11.5 h-11.5 ",
            }}
          />
          <Widget
            {...{
              iconName: "orderList",
              title: t("totalPrice"),
              count: totalPrice,
              to: "my-orders",
              classes: "text-[#2563EB] w-11.5 h-11.5 ",
            }}
          />
          <Widget
            {...{
              iconName: "orderList",
              title: t("totalStock"),
              count: totalStock,
              to: "my-orders",
              classes: "text-[#2563EB] w-11.5 h-11.5 ",
            }}
          />
          <Widget
            {...{
              iconName: "orderList",
              title: t("totalDiscount"),
              count: totalDiscount,
              to: "my-orders",
              classes: "text-[#2563EB] w-11.5 h-11.5 ",
            }}
          />
          <Widget
            {...{
              iconName: "orderList",
              title: t("priceDiscountDifference"),
              count: priceDiscountDifference,
              to: "my-orders",
              classes: "text-[#2563EB] w-11.5 h-11.5 ",
            }}
          />
        </div>
        <div>
          <ChartTwo
            {...{ totalPrice, totalDiscount, priceDiscountDifference }}
          />
        </div>
      </div>

      <div className="mt-6 ">
        <BarChart data={data} />
      </div>
      <div className="mt-6">
        <StockLineChart data={data} />
      </div>
    </>
  );
};

export default Dashboard;
