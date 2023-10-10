import { setUserData } from "store";

export const userLogout = () => {
  return (dispatch) => {
    dispatch(setUserData({}));
  };
};
