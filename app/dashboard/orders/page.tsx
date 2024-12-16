import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function OrdersPage() { 
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                Orders
            </CardTitle>
            <CardDescription>Recent orders from your store</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <p className="font-medium">Muhammad Zulfan Abidin</p>
                            <p className="hidden md:flex text-sm text-muted-foreground">text@test.com</p>
                        </TableCell>
                        <TableCell>Sell</TableCell>
                        <TableCell>Successful</TableCell>
                        <TableCell>24-4-5</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}