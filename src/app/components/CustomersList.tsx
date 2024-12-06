import { Customer } from "@/features/customers/customerSlice";
import { Checkbox } from '@/components/ui/checkbox';
import { TableBody, TableCell, TableRow } from "@/components/ui/table";


export default function CustomersList({ customers }: { customers: Customer[] }) {
  return (
    <TableBody>
      {customers.map((it) => (
        <TableRow key={it.id}>
          <TableCell>{it.id}</TableCell>
          <TableCell>{it.name}</TableCell>
          <TableCell>
            <Checkbox disabled checked={it.isMype} />
          </TableCell>
          <TableCell>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
