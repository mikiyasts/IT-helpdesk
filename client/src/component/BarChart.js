import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
// import { dataset } from '../dataset/weather';

const chartSetting = {
 
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const valueFormatter = (value) => `${value}req`;

export default function BarsDataset(props) {


  
  const dataset = []
  if(props.dataset){
    console.log("from bar",typeof(props.dataset));
    console.log("from bar",Object.keys(props.dataset));
    Object.keys(props.dataset).map((el,index)=>{
      dataset[index]={
        [el]:Number(props.dataset[el]),
        "month":el
      }
      return 1
    })
  }
  console.log("from bar",dataset);
  
      
  return (
    <BarChart
      dataset={dataset}
      tooltip={{
        trigger:"item"
      }}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'Kality', label: 'Kality', valueFormatter,color:"#ac88df" },
        { dataKey: 'Lideta', label: 'Lideta', valueFormatter ,color:"#493775"},
        { dataKey: 'Mekanissa', label: 'Mekanissa', valueFormatter,color:"#365be6" },
        { dataKey: 'Farm', label: 'Farm', valueFormatter ,color:"#1dc8ba"},
      ]}
      {...chartSetting}
    />
  );
}
