import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "shared";

export const Logo = () => {
    const {
        aboutUsInfos: {
          logo,
        } = {},
      } = useSelector((state) => state.aboutUs);

    return (
        <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            {logo ?
                <img src={`${import.meta.env.VITE_BASE_URL}/storage/${logo}`} />
                :
                ''
            }
        </Link>
    )
}