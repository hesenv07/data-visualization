import { Link } from 'react-router-dom';
import { t } from "i18next"

export const Breadcrumb = ({ pageName }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:items-center text-black dark:text-white sm:justify-between">
      <h2 className="text-title-md2 font-semibold">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/dashboard">{t('dashboard')} /</Link>
          </li>
          <li className="text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};
