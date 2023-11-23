import BarChart from "./components/BarChart"


const Home = () => {
    return (
      <div>
        <BarChart title={'前端三劍客熟練度'} xdata={['Html','Css','JavaScript']} seriesdata={[90, 70, 80]} />
        <BarChart title={'前端三大框架熟練度'} xdata={['Vue','Angular','React']} seriesdata={[20, 5, 80]} />
        </div>
    )
}

export default Home