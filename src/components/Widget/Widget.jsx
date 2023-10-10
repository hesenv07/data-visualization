import { Icon } from "shared";
import { useNavigate } from "react-router-dom"

export const Widget = ({ iconName, title, count, classes, to }) => {
  const navigate = useNavigate()

  return (
    <div 
      className="rounded-sm border cursor-pointer border-stroke flex flex-col items-center justify-center bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
      onClick={() => navigate(`/${to}`)}  
    >
      {Icon && (
        <div className="flex h-18 w-18 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <Icon name={iconName} className={classes || `w-9 h-9`} />
        </div>
      )}

      <div className="mt-4">
        <div className="flex flex-col items-center text-black dark:text-white">
          <h4 className="text-title-md font-bold">{count}</h4>
          <span className="text-md text-center font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};
