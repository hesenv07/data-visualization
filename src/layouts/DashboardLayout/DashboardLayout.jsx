import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLoading, useLazyGetUserInfoQuery, setUserData } from "store";
import { DashboardHeader, Sidebar } from "components";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const [
    getUserInfo,
    { data: userData, isSuccess: isSuccessUserData, isError, error, isLoading },
  ] = useLazyGetUserInfoQuery();

  useEffect(() => {
    const fetchUser = async () => {
      await getUserInfo();
    };
    fetchUser();
  }, [getUserInfo]);

  useEffect(() => {
    if (isSuccessUserData && userData) {
      dispatch(setUserData(userData));
    }
  }, [isSuccessUserData, userData, dispatch]);

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (error && isError) {
      dispatch(setUserData({}));
    }
  }, [dispatch, error, isError]);
  console.log(userData);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <DashboardHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <main>
            <div className="mx-auto max-w-screen-2xl px-4 md:px-6 2xl:px-10 py-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
