import { GetProviders } from '@/app/actions/actions';
import CustomersList from '@/app/components/CustomersList';
import ProvidersList from '@/app/components/ProvidersList';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatPhoneNumber } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertCircle, Edit2, Trash2 } from 'lucide-react';


export default function Page(){
    return (
        <main className="container flex flex-col gap-4 px-4 py-12 m-auto">
            <div className='flex justify-between'>
                <h2 className='text-3xl font-semibold'>Proveedores</h2>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Razon Social</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Activo</TableHead>
                        <TableHead>Accion</TableHead>
                    </TableRow>
                </TableHeader>
                <ProvidersList/>
            </Table>
        </main>
    );
}