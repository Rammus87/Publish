import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';


const Home = () => {
    const chartRef = useRef(null)
    useEffect(()=>{
        
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);
        const option = {
          xAxis: {
            type: 'category',
            data: ['Html','Css','Javascript','Vue','Angular','React']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [100,70,80,20, 1, 80],
              type: 'bar'
            }
          ]
        };
        option && myChart.setOption(option);
    },[])
    return <div><div ref={chartRef} style={{height:"400px" , width:"500px"}}></div></div>
}

export default Home