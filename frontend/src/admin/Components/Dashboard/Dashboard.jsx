import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

function Dashboard() {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const [chartData, setChartData] = useState({
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Dataset 1',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderWidth: 1
        }]
    });

    useEffect(() => {
        const randomData = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));
        setChartData(prevState => ({
            ...prevState,
            datasets: [{
                ...prevState.datasets[0],
                data: randomData
            }]
        }));
    }, []);

    return (
   <section>
      <div className="grid grid-cols-3 gap-4 mb-3">

<a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Thống kê tháng 1 2024</h5>
<p className="font-normal text-gray-700 dark:text-gray-400"></p>
</a>
<a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Thống kê tháng 2 2024</h5>
<p className="font-normal text-gray-700 dark:text-gray-400"></p>
</a>
<a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Thống kê tháng 3 2024</h5>
<p className="font-normal text-gray-700 dark:text-gray-400"></p>
</a>

      </div>

 <div className="relative flex flex-row text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
       <Doughnut data={chartData}  />
    <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
      <div role="button"
        className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
        <div className="grid mr-4 place-items-center">
          <img alt="candice" src="https://docs.material-tailwind.com/img/face-1.jpg"
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
        </div>
        <div>
          <h6
            className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
            Tania Andrew
          </h6>
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
           Người dùng đóng góp nhiều nhất @TaniaAndrew
          </p>
        </div>
      </div>
      <div role="button"
        className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
        <div className="grid mr-4 place-items-center">
          <img alt="alexander" src="https://docs.material-tailwind.com/img/face-2.jpg"
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
        </div>
        <div>
          <h6
            className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
            Alexander
          </h6>
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
          Người dùng đóng góp nhiều nhất @Alexander
          </p>
        </div>
      </div>
      <div role="button"
        className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
        <div className="grid mr-4 place-items-center">
          <img alt="emma" src="https://docs.material-tailwind.com/img/face-3.jpg"
            className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center" />
        </div>
        <div>
          <h6
            className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
            Emma Willever
          </h6>
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
          Người dùng đóng góp nhiều nhất @EmmaWillever
          </p>
        </div>
      </div>
    </nav>
    
  </div>
   </section>
    )
}

export default Dashboard;