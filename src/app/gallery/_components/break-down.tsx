import { SparkleIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CategoryBar, cn,
  Table,
  TableBody, TableCell,
  TableRow,
} from '@/ui';

export default function BreakDown() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription className="flex flex-row items-center gap-1">
          <SparkleIcon className="h-3 w-3" />
          <span className="text-xs">STATS</span>
        </CardDescription>
        <CardTitle>Traffic sources</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <CategoryBar values={[54, 29, 14, 3]} colors={['pink', 'violet', 'cyan', 'amber']} />
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Dot className="bg-pink-500"/>Instagram
                </div>
              </TableCell>
              <TableCell className="text-right">12,480</TableCell>
              <TableCell className="text-right">+26%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Dot className="bg-violet-500"/>Facebook
                </div>
              </TableCell>
              <TableCell className="text-right">6,530</TableCell>
              <TableCell className="text-right">+17%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Dot className="bg-cyan-500"/>Organic
                </div>
              </TableCell>
              <TableCell className="text-right">3,290</TableCell>
              <TableCell className="text-right">-9%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Dot className="bg-amber-500"/>Tiktok
                </div>
              </TableCell>
              <TableCell className="text-right">928</TableCell>
              <TableCell className="text-right">+10%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function Dot({ className }: { className: string }) {
  return <div className={cn('w-3 h-3 rounded-full', className)} />
}
