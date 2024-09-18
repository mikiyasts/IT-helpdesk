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

export default function BarsDataset() {


const dataset = [
        {
          Lideta: 59,
          Kality: 57,
          Mekanissa: 86,
          Farm: 21,
          month: 'Jan',
        },
        {
          Lideta: 50,
          Kality: 52,
          Mekanissa: 78,
          Farm: 28,
          month: 'Feb',
        },
        {
          Lideta: 47,
          Kality: 53,
          Mekanissa: 106,
          Farm: 41,
          month: 'Mar',
        },
        {
          Lideta: 54,
          Kality: 56,
          Mekanissa: 92,
          Farm: 73,
          month: 'Apr',
        },
        {
          Lideta: 57,
          Kality: 69,
          Mekanissa: 92,
          Farm: 99,
          month: 'May',
        },
        {
          Lideta: 60,
          Kality: 63,
          Mekanissa: 103,
          Farm: 144,
          month: 'June',
        },
        {
          Lideta: 59,
          Kality: 60,
          Mekanissa: 105,
          Farm: 319,
          month: 'July',
        },
        {
          Lideta: 65,
          Kality: 60,
          Mekanissa: 106,
          Farm: 249,
          month: 'Aug',
        },
        {
          Lideta: 51,
          Kality: 51,
          Mekanissa: 95,
          Farm: 131,
          month: 'Sept',
        },
        {
          Lideta: 60,
          Kality: 65,
          Mekanissa: 97,
          Farm: 55,
          month: 'Oct',
        },
        {
          Lideta: 67,
          Kality: 64,
          Mekanissa: 76,
          Farm: 48,
          month: 'Nov',
        },
        {
          Lideta: 61,
          Kality: 70,
          Mekanissa: 103,
          Farm: 25,
          month: 'Dec',
        },
      ];
      
  return (
    <BarChart
      dataset={dataset}
      tooltip={{
        trigger:"item"
      }}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'Lideta', label: 'Lideta', valueFormatter ,color:"#493775"},
        { dataKey: 'Kality', label: 'Kality', valueFormatter,color:"#ac88df" },
        { dataKey: 'Mekanissa', label: 'Mekanissa', valueFormatter,color:"#365be6" },
        { dataKey: 'Farm', label: 'Farm', valueFormatter ,color:"#1dc8ba"},
      ]}
      {...chartSetting}
    />
  );
}
