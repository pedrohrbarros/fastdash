import { Concat } from "@/entities/concat";
import { getAllConcat } from "@/services/concat/getAll";
import { useTranslation } from "next-i18next"
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function RevenuePerLocationGraph() {

  const { t } = useTranslation('home')
  
  const [concats, setConcats] = useState<Concat[]>()

  useEffect(() => {
    const fetchData = async () => {
      const data: Concat[] | string = await getAllConcat()
      if (typeof data === 'string') {
        const message: string = data
        alert(t(message))
      } else {
        setConcats(data)
      }
    }
    fetchData()
  }, [])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: t('Sales per Location'),
      },
    },
  };
  
  const labels = concats?.map((concat: Concat) => concat.location).filter((location, index) => concats?.map((concat: Concat) => concat.location).indexOf(location) === index)
  
  const data = {
    labels,
    datasets: [
      {
        label: t('Sales'),
        data: concats?.map((concat: Concat) => +concat.sold_at),
        backgroundColor: concats?.map((concat: Concat) => `#${Math.floor(Math.random()*16777215).toString(16)}`)
      },
    ],
  };
  

  return (
    <div className="w-[60vw] h-[60vh] bg-white rounded-lg p-4 max-[665px]:w-full">
      <Pie options={options} data={data}/>
    </div> 
  )
}

export default RevenuePerLocationGraph