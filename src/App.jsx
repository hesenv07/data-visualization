import { FormOverlay, Alert } from "./components";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/swiper.min.css";
import Routes from "./Routes";
import { useSelector } from "react-redux";

const App = () => {
  const { isLoading } = useSelector((state) => state.loading);

  return (
    <>
      <Alert />
      <div className="font-fira">
        {isLoading && <FormOverlay />}
        <Routes />
      </div>
    </>
  );
};

export default App;
