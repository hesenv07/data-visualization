import { DataTable, ErrorBoundaryClass } from "components";
import { Loader } from "common";
import { t } from "i18next";
import { useGetProductQuery } from "store";
import { useDispatch } from "react-redux";
import { setCount } from "store";

const header = [
  { key: "title", width: "min-w-[250px]" },
  { key: "price", width: "min-w-[120px]" },
  { key: "discountPercentage", width: "min-w-[150px]" },
  { key: "rating", width: "min-w-[150px]" },
  { key: "stock", width: "min-w-[120px]" },
  { key: "brand", width: "min-w-[150px]" },
  { key: "category", width: "min-w-[200px]" },
];

const keys = [
  "title",
  "price",
  "discountPercentage",
  "rating",
  "stock",
  "brand",
  "category",
];

const MyOrders = ({ ...params }) => {
  const dispatch = useDispatch();
  const { isSuccess, isLoading, data } = useGetProductQuery();
  if (isLoading) return <Loader />;
  if (isSuccess)
    dispatch(
      setCount({ key: "userProductCount", value: data?.products?.length })
    );
  return (
    <ErrorBoundaryClass>
      <DataTable
        {...{
          header,
          keys,
          page: "orders",
          body: isSuccess ? data.products : [],
          title: t("orders"),
          iconName: "orderList",
          to: "my-orders",
          ...params,
        }}
      />
    </ErrorBoundaryClass>
  );
};
export default MyOrders;
