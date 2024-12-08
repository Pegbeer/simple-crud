'use client';
import { useQuery } from "@tanstack/react-query";
import { GetProviders } from "../actions/actions";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { formatPhoneNumber } from "@/lib/utils";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import EditProviderDialog from "./EditProviderDialog";

export default function ProvidersList() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['providers'],
        queryFn: GetProviders,
    });

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
                            <TableCell className='flex items-center space-x-3'>
                                <EditProviderDialog provider={it} onUpdated={()=>{}}/>
                                <Button size='icon' variant='destructive'>
                                    <Trash2 />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </>
    );
}