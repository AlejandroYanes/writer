import { Card, CardContent, CardDescription, CardHeader, CardTitle, Table, TableBody, TableCell, TableRow } from '@/ui';

export default function FancyTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
        <CardDescription>
          Improvements vs last month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex flex-col border-violet-300 border-l-4 pl-2">
                  <span className="text-xs text-muted-foreground">FOOD</span>
                  <span className="text-xl">48%</span>
                </div>
              </TableCell>
              <TableCell>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </TableCell>
              <TableCell className="text-xl">-$5,387</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex flex-col border-amber-300 border-l-4 pl-2">
                  <span className="text-xs text-muted-foreground">TRAVEL</span>
                  <span className="text-xl">35%</span>
                </div>
              </TableCell>
              <TableCell>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </TableCell>
              <TableCell className="text-xl">-$9,498</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex flex-col border-pink-300 border-l-4 pl-2">
                  <span className="text-xs text-muted-foreground">TECH</span>
                  <span className="text-xl">23%</span>
                </div>
              </TableCell>
              <TableCell>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </TableCell>
              <TableCell className="text-xl">-$2,397</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
