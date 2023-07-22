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

  const revenue_array_per_location = new Map()

  concats?.forEach((concat: Concat) => {
    const { location, sold_at } = concat
    if (revenue_array_per_location.has(location)) {
      revenue_array_per_location.set(location, revenue_array_per_location.get(location))
    } else {
      revenue_array_per_location.set(location, sold_at)
    }
  })

  const total_revenue_array = Array.from(revenue_array_per_location, ([location, sold_at]) => ({ location, sold_at }));
  
  const data = {
    labels: total_revenue_array.map((revenue) => revenue.location),
    datasets: [
      {
        label: ` ${t('Sales')}`,
        data: total_revenue_array.map((revenue) => revenue.sold_at),
        backgroundColor: concats?.map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`)
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