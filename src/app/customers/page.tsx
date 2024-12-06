'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Customer } from '@/features/customers/customerSlice';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import CustomersList from '../components/CustomersList';
import { CreateCustomer, fetchCustomers } from '../actions/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CreateCustomerDialog, { CustomerFormValues } from '../components/CreateCustomerDialog';

export default function Page() {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, error, isLoading } = useQuery<Customer[],Error>({
        queryKey: ['customers'],
        queryFn: () => fetch('/api/customers').then(res => res.json())
    });

    const mutation = useMutation({
        mutationFn: CreateCustomer,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey:['customers']
            });
            setIsModalOpen(false);
        }
    });

    const handleCreateCustomer = (newCustomer:CustomerFormValues) =>{
        mutation.mutate(newCustomer);
    };

    return (
        <main className="container flex flex-col gap-4 px-4 py-12 m-auto">
            <div className='flex justify-between'>
                <h2 className='text-3xl font-semibold'>Clientes</h2>
                <CreateCustomerDialog onCreate={handleCreateCustomer} isOpen={isModalOpen} onClose={(e) => { setIsModalOpen(e) }}/>    
            </div>
            
            { error ?
                <Alert variant="destructive">
                    <AlertCircle />
                    <AlertTitle>Ocurrió un error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
                : <></>
            }
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Numero cliente</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Es MYPE</TableHead>
                        <TableHead>Accion</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.map(it => (
                            <TableRow>
                                <TableCell></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </main>
    );
}
