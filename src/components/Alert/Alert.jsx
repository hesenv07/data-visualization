import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { setAlertData } from "store";

export const Alert = () => {
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState()
  const { message, status } = useSelector((state) => state.alert);

  useEffect(() => {
    setAlertMessage(message)
  }, [message])

  const hideAlert = () => {
    dispatch(setAlertData({ message: "", status: "" }));
  };

  if (status && alertMessage)
    toast[status](alertMessage, {
      onClose() {
        hideAlert();
      },
    });

  return <ToastContainer className="z-9999" autoClose={3000} />;
};
