import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatToBRL from "@/helpers/currency";
import { useGetAllUserTransactions } from "@/hooks/data/Transactions";

import EditTransaction from "./EditTransaction";
import TypeBadge from "./TypeBadge";
import { Card, CardContent, CardHeader } from "./ui/card";

const TransactionsTable = () => {
  const { data: userTransactions } = useGetAllUserTransactions();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", {
      month: "long",
      timeZone: "UTC",
    });
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  };

  const capitalizeFirstLetter = (string) => {
    if (string.length === 0) {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Card>
      <CardHeader className="text-xl font-semibold">Transactions</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground w-25">
                Title
              </TableHead>
              <TableHead className="text-muted-foreground">Type</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userTransactions?.map((userTransaction) => (
              <TableRow key={userTransactions?.id}>
                <TableCell className="font-medium">
                  {capitalizeFirstLetter(userTransaction?.name)}
                </TableCell>
                <TableCell>
                  <TypeBadge variant={userTransaction?.type} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(userTransaction?.date)}
                </TableCell>
                <TableCell>{formatToBRL(userTransaction?.amount)}</TableCell>
                <TableCell className="text-muted-foreground text-right">
                  <EditTransaction transaction={userTransaction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
