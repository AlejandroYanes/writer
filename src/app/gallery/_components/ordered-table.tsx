import { Card, CardContent, CardDescription, CardHeader, CardTitle, Table, TableBody, TableCell, TableRow } from '@/ui';

export default function OrderedTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl">Our mission</CardTitle>
        <CardDescription>
          Changing the world in three key ways
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <span className="text-4xl">1st</span>
              </TableCell>
              <TableCell>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span className="text-4xl">2nd</span>
              </TableCell>
              <TableCell>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span className="text-4xl">3rd</span>
              </TableCell>
              <TableCell>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
