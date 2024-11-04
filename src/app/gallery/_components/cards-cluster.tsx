import { CupSodaIcon, EarthIcon, ShoppingBasketIcon, SproutIcon } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui';

export default function CardsCluster() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="col-span-2">
        <CardHeader>
          <div className="flex flex-row gap-1">
            <CardTitle>$2,387</CardTitle>
            <span className="text-xs text-muted-foreground">+16%</span>
            <div className="ml-auto flex flex-col items-center justify-center rounded-full h-6 w-6 bg-violet-500">
              <EarthIcon className="h-4 w-4 stroke-white" />
            </div>
          </div>
          <CardDescription>TRAVEL EXPENSES</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-xs text-gray-400">
            Staff international and domestic travel for work or meetings
          </span>
        </CardContent>
      </Card>

      <Card className="row-span-2">
        <CardHeader>
          <div className="flex flex-col items-center justify-center rounded-full h-6 w-6 bg-yellow-500">
            <SproutIcon className="h-4 w-4 stroke-white fill-white"/>
          </div>
          <div className="flex flex-row gap-1">
            <CardTitle>$847</CardTitle>
            <span className="text-xs text-muted-foreground">-24%</span>
          </div>
          <CardDescription>WELLBEING</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-xs text-gray-400">Events or everyday wellbeing costs</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-row gap-1">
            <CardTitle>$13,525</CardTitle>
            <span className="text-xs text-muted-foreground">+13%</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="flex flex-col items-center justify-center rounded-full h-5 w-5 bg-rose-500">
              <CupSodaIcon className="h-3 w-3 stroke-white"/>
            </div>
            <CardDescription>BEVERAGES</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-row gap-1">
            <CardTitle>$2,183</CardTitle>
            <span className="text-xs text-muted-foreground">-9%</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="flex flex-col items-center justify-center rounded-full h-5 w-5 bg-emerald-500">
              <ShoppingBasketIcon className="h-3 w-3 stroke-white"/>
            </div>
            <CardDescription>GROCERIES</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
