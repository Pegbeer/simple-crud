import { Label } from './label';
import { Input } from './input';
import InputMask from '@mona-health/react-input-mask';
import { Button } from './button';
import { CreateProvider } from '@/app/actions/actions';
import { redirect, RedirectType } from 'next/navigation';

export default function CreateProviderForm() {
    const handleSubmit = async (data: FormData) => {
        'use server';
        const form = {
            SocialReason: data.get('socialReason')?.toString() ?? '',
            Phone: data.get('phone')?.toString() ?? '',
            NRC: data.get('nrc')?.toString() ?? '',
            NIT: data.get('nit')?.toString() ?? '',
            Industry: data.get('industry')?.toString() ?? '',
            Email: data.get('email')?.toString() ?? '',
        };

        console.log(form);

        const created = await CreateProvider(form);
        if(created){
            redirect('/providers');
        }
    };

    return (
        <form action={handleSubmit} className='flex flex-col gap-4 lg:max-w-[525px]'>
            <div className='grid grid-cols-3 items-center gap-4'>
                <Label htmlFor='socialReason'>Razon social</Label>
                <Input name='socialReason' className='col-span-2' />
                <Label htmlFor="phone">Teléfono</Label>
                <Input name='phone' type='tel' className='col-span-2' />
                <Label htmlFor="nrc">NRC</Label>
                <Input id="nrc" name='nrc' className="col-span-2" type='number' />
                <Label htmlFor="nit">NIT</Label>
                <Input id="nit" name='nit' className="col-span-2" type='number' />
                <Label htmlFor="industry">Giro</Label>
                <Input id="industry" name='industry' className="col-span-2" type='text' />
                <Label htmlFor="email">Email</Label>
                <Input id="email" name='email' className="col-span-2" type='email' />
            </div>
            <div className='flex items-center justify-end gap-4'>
                <Button>Cancelar</Button>
                <Button variant='secondary'>Crear</Button>
            </div>
        </form>
    );
}
