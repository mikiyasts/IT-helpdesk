import * as React from 'react';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';

const uData = [45, 5, 6, 2, 12, 8];
const xLabels = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

export default function SimpleAreaChart() {
  return (
    <LineChart
      width={500}
      height={300}
      axisHighlight={{
        x: 'none', // Or 'none', or 'band'
        y: 'none', // Or 'none'
      }}
      series={[{ data: uData, area: true,showMark: false ,color:"#5238fa4a"}]}
      xAxis={[{ scaleType: 'point', data: xLabels}]}
      sx={{
        [`& .${lineElementClasses.root}`]: {
          display: 'none',
        },
      }}
    />
  );
}