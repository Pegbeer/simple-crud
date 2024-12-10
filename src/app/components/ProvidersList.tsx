'use client';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateProvider, DeleteProvider, GetProviders, UpdateProvider } from "../actions/actions";
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { formatPhoneNumber } from "@/lib/utils";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import EditProviderDialog from "./EditProviderDialog";
import { Providers } from "@prisma/client";
import CustomAlertDialog from "./CustomAlertDialog";
import Link from "next/link";

export default function ProvidersList() {
    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery({
        queryKey: ['providers'],
        queryFn: GetProviders,
    });

    const invalidateQueries = () =>{
        queryClient.invalidateQueries({
            queryKey: ['providers']
        });
    }

    const updateMutation = useMutation({
        mutationFn: UpdateProvider,
        onSuccess: invalidateQueries
    });

    const deleteMutation = useMutation({
        mutationFn: DeleteProvider,
        onSuccess: invalidateQueries
    });

    const handleUpdateProvider = async (provider: Providers) => {
        await updateMutation.mutateAsync(provider);
    };

    const handleDeleteProvider = async(id:string) =>{
        await deleteMutation.mutateAsync(id);
    };

    return (
        <>
            {error ?
                <Alert>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
                : <></>
            }
            <TableBody>
                {
                    data?.map(it => (
                        <TableRow key={it.Id}>
                            <TableCell>{it.SocialReason}</TableCell>
                            <TableCell>{it.Email}</TableCell>
                            <TableCell>{formatPhoneNumber(it.Phone)}</TableCell>
                            <TableCell>
                                <Checkbox disabled checked={it.IsActive ?? false} />
                            </TableCell>
                            <TableCell className='flex items-center space-x-3 out'>
                                <Link href='/providers/create' className={buttonVariants({variant: 'secondary',size: 'icon'})}>
                                    <Edit2/>
                                </Link>
                                <CustomAlertDialog
                                    isDelete
                                    title="Esta seguro?"
                                    description="Esta accion no se puede deshacer. Eliminara los datos de este proveedor."
                                    onSuccess={() => { handleDeleteProvider(it.Id) }}
                                    successTitle="Aceptar">
                                    <Button size='icon' variant='destructive'>
                                        <Trash2/>
                                    </Button>
                                </CustomAlertDialog>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </>
    );
}