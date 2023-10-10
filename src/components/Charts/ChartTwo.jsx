import {useSelector} from "react-redux"
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { noData } from "assets"
import { t } from "i18next";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartTwo = () => {
  const [data, setData] = useState({
    labels: [t('domains'), 'Hosting', 'VPS', t('servers')],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: ['#10B981', '#375E83', '#259AE6', '#FFA70B'],
        borderColor: ['#10B981', '#375E83', '#259AE6', '#FFA70B'],
        borderWidth: 1,
      },
    ],
  })

  const { userDomainCount, userHostingCount, userServerCount, userVPSCount } = useSelector(state => state.common)

  useEffect(() => {
    setData(prev => ({
      ...prev,
      datasets: prev.datasets.map(i => ({ 
        ...i,
        data: [userDomainCount, userHostingCount, userVPSCount, userServerCount] 
      }))
    }))
  }, [userDomainCount, userHostingCount, userVPSCount, userServerCount])


  return (
    <div className="col-span-12 statistic_chart flex items-center justify-center rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default h-full dark:border-strokedark dark:bg-boxdark min-h-[300px] pb-4 xl:col-span-5">
      {
        userDomainCount || userHostingCount || userVPSCount || userServerCount
          ? <Doughnut data={data} />
          : (
            <div className="flex items-center justify-center flex-col gap-3">
              <img src={noData} alt="no-data" />
              <p className="text-black text-[18px] dark:text-white font-500">{t('no_data')}</p>
            </div>
          )
      }
    </div>
  );
}
