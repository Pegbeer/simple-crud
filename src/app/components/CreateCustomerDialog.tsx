'use client';

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Customer } from '@/features/customers/customerSlice';

const formSchema = z.object({
    name: z.string().min(5, {
        message: 'Debe contener al menos 5 caracteres'
    }).max(32),
    isMype: z.boolean().default(false)
});

export type CustomerFormValues = z.infer<typeof formSchema>

const defaultValues: Partial<CustomerFormValues> = {
    name: '',
    isMype: false
}

interface Props{
    isOpen:boolean,
    onClose:(open:boolean) => void,
    onCreate:(newCustomer:Omit<Customer,'id'>) => void;
}

export default function CreateCustomerDialog({isOpen,onClose,onCreate}:Props) {
    const form = useForm<CustomerFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    
    const onSubmit = (data:CustomerFormValues) =>{
        const model = {
            name: data.name,
            isMype: data.isMype
        };
        onCreate(model);
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Crear cliente
                </Button>
            </DialogTrigger>
            <DialogContent className='w-[425px] rounded'>
                <DialogHeader className='flex items-start'>
                    <DialogTitle>Crear cliente</DialogTitle>
                    <DialogDescription>Aqui puede introducir los datos del cliente.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre y apellido</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name='isMype'
                            render={({ field }) => (
                                <FormItem className='items-center space-x-2'>
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel>Es MYPE</FormLabel>
                                </FormItem>
                            )} />
                        <Button type='submit'>Crear</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}