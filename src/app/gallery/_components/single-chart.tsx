'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui';
import { LineChart } from '@/ui/line-chart';

export default function SingleChart() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-2">
        <div className="flex flex-row items-center gap-1">
          <span className="text-xs text-white rounded-full py-0 px-1.5 bg-violet-500">MAU</span>
          <span className="text-xs">JAN 2024</span>
        </div>
        <CardTitle className="text-5xl">52k</CardTitle>
        <CardDescription>Marketing campaign effectiveness</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart
          index="date"
          lineType="natural"
          className="w-full h-80"
          data={chartData}
          showYAxis
          showGridLines
          valueFormatter={valueFormatter}
          colors={['violet', 'gray']}
          categories={['SolarPanels', 'Inverters']}
        />
      </CardContent>
    </Card>
  );
}

const valueFormatter = (number: number) => `$${Intl.NumberFormat('us').format(number).toString()}`;

const chartData = [
  {
    date: 'Jan 23',
    SolarPanels: 890,
    Inverters: 538,
  },
  {
    date: 'Feb 23',
    SolarPanels: 1756,
    Inverters: 1303,
  },
  {
    date: 'Mar 23',
    SolarPanels: 3022,
    Inverters: 2594,
  },
  {
    date: 'Apr 23',
    SolarPanels: 3270,
    Inverters: 2808,
  },
  {
    date: 'May 23',
    SolarPanels: 3075,
    Inverters: 2412,
  },
  {
    date: 'Jun 23',
    SolarPanels: 3129,
    Inverters: 2426,
  },
  {
    date: 'Jul 23',
    SolarPanels: 3490,
    Inverters: 2982,
  },
  {
    date: 'Aug 23',
    SolarPanels: 2903,
    Inverters: 2012,
  },
  {
    date: 'Sep 23',
    SolarPanels: 2643,
    Inverters: 2342,
  },
  {
    date: 'Oct 23',
    SolarPanels: 2837,
    Inverters: 2473,
  },
  {
    date: 'Nov 23',
    SolarPanels: 2954,
    Inverters: 3348,
  },
  {
    date: 'Dec 23',
    SolarPanels: 3839,
    Inverters: 3736,
  },
];
