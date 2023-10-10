import { DataTable, ErrorBoundaryClass } from "components";
import { Loader } from "common";
import { t } from "i18next";
import { useGetProductQuery } from "store";

const header = [
  { key: "title", width: "min-w-[150px]" },
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
  const { isSuccess, isLoading, data } = useGetProductQuery();
  if (isLoading) return <Loader />;

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
