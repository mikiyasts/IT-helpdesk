import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';


const size = {
  width: 400,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

// function PieCenterLabel({ children }) {
  //   const { width, height, left, top } = useDrawingArea();
  //   return (
    //     <StyledText x={left + width / 2} y={top + height / 2}>
//       {children}
//     </StyledText>
//   );
// }

export default function PieChartWithCenterLabel(props) {
  let propsObjects
  if(props.dataset){
    propsObjects=Object.keys(props?.dataset)
  }
  let data=[]

  const colors=["#493775","#ac88df","#365be6","#1dc8ba"]
  if(propsObjects){
    
     data= propsObjects.map((el,index)=>{
      return {
        value:props.dataset[el],
        label:el,
        color:colors[index]
  
      }
    })
  }
//  const data= [
//     { value: 5, label: 'Network Problem',color:"#493775" },
//     { value: 10, label: 'Computer Problem',color:"#ac88df" },
//     { value: 15, label: 'Syspro Problem',color:"#365be6"},
//     { value: 20, label: 'Any Other',color:"#1dc8ba"},
//   ];
  
console.log("props",propsObjects);
console.log("propsdata",props.dataset);



  return (
    <PieChart series={[{ data, innerRadius: 80 }]} {...size} sx={{color:"white"}}>
      {/* <PieCenterLabel>Issues</PieCenterLabel> */}
    </PieChart>
  );
}
