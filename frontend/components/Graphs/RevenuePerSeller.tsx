import { Concat } from "@/entities/concat";
import { getAllConcat } from "@/services/concat/getAll";
import { useTranslation } from "next-i18next"
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function RevenuePerSellerGraph() {

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
        text: t('Sales per Seller'),
      },
    },
  };
  
  const labels = concats?.map((concat) => concat.seller);
  
  const data = {
    labels,
    datasets: [
      {
        label: t('Sales'),
        data: concats?.map((concat) => +concat.sold_at),
        backgroundColor: '#581c87',
      },
    ],
  };
  

  return <Bar options={options} data={data}/>
}

export default RevenuePerSellerGraph