import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = ({title, xdata, seriesdata}) => {
    const chartRef = useRef(null)
    useEffect(()=>{
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);
        const option = {
          title: {
            text : title
          },
          xAxis: {
            type: 'category',
            data: xdata
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: seriesdata,
              type: 'bar'
            }
          ]
        };
        option && myChart.setOption(option);
    },[title, xdata, seriesdata])
    return <div ref={chartRef} style={{height:"400px" , width:"500px"}}></div>
}

export default BarChart