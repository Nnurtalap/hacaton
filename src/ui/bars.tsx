import * as React from 'react';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';

const uData = [400, 300, 200, 278, 189, 239, 349];
const xLabels = ['Almaty', 'Astana', 'Aqtobe', 'Aktay', 'Atyray'];

export default function Bars() {
  return (
    <div className="flex-row p-10">
      <div className="font-semibold ml-10 ">
        Города с наибольшим количеством чистых автомобилей:
      </div>
      <Box sx={{ width: '100%', height: 300 }}>
        <BarChart
          series={[{ data: uData, id: 'uvId', stack: 'total' }]}
          xAxis={[{ data: xLabels }]}
          yAxis={[{ width: 50 }]}
        />
      </Box>
    </div>
  );
}
