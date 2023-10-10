import { Suspense, lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { DashboardLayout } from "./layouts";
import { Loader } from "common";
import NotFound from "./pages/NotFound";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Navigate to="/dashboard" />,
        },
        {
          index: true,
          path: "dashboard",
          element: <Dashboard />,
        },

        {
          path: "my-orders",
          element: <MyOrders />,
        },
        {
          path: "user",
          children: [
            {
              path: "profile",
              element: <Profile />,
            },

            {
              path: "settings",
              element: <Settings />,
            },
          ],
        },
      ],
    },
    {
      path: "/*",
      Component: <NotFound />,
    },
  ]);

  return <Suspense fallback={<Loader />}>{routes}</Suspense>;
};

export default Routes;
