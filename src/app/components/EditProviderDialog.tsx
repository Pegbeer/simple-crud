'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Providers } from "@prisma/client";
import { Edit2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { z } from 'zod';
import InputMask from '@mona-health/react-input-mask';
import { UpdateProvider } from "../actions/actions";

interface Props {
    provider: Providers,
    onUpdated: () => void;
}

export default function EditProviderDialog({ provider }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [socialReason, setSocialReason] = useState(provider.SocialReason ?? '');
    const [phone, setPhone] = useState(provider.Phone ?? '');
    const [nrc, setNrc] = useState(provider.NRC ?? '');
    const [nit, setNit] = useState(provider.NIT ?? '');
    const [industry, setIndustry] = useState(provider.Industry ?? '');
    const [email, setEmail] = useState(provider.Email ?? '');

    const onSubmit = async () => {
        try {
            provider.SocialReason = socialReason;
            provider.Phone = phone;
            provider.Email = email;
            provider.NIT = nit,
            provider.NRC = nrc;
            provider.Industry = industry;
            await UpdateProvider(provider);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size='icon'>
                    <Edit2 />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:min-w-[450px]">
                <DialogTitle>Editar proveedor</DialogTitle>
                <DialogDescription>Aqui puedes editar los detalles del proveedor</DialogDescription>
                <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="socialReason" className="text-right">Razon Social</Label>
                    <Input id="socialReason" className="col-span-2" value={socialReason} onChange={(e) => setSocialReason(e.target.value)} />
                    <Label htmlFor="phone" className="text-right">Teléfono</Label>
                    <InputMask
                        id="phone"
                        className="col-span-2"
                        mask="+503 9999-9999"
                        value={phone}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}>
                        <Input type="text" className="no-underline" />
                    </InputMask>
                    <Label htmlFor="nrc" className="text-right">NRC</Label>
                    <Input id="nrc" className="col-span-2" value={nrc} onChange={(e) => setNrc(e.target.value)} />
                    <Label htmlFor="nit" className="text-right">NIT</Label>
                    <InputMask
                        id="nit"
                        className="col-span-2"
                        mask="9999-999999-999-9"
                        value={nit}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNit(e.target.value)}>
                        <Input type="text" className="no-underline" />
                    </InputMask>
                    <Label htmlFor="industry" className="text-right">Giro</Label>
                    <Input id="industry" className="col-span-2" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                    <Label htmlFor="email" className="text-right">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        className="col-span-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={onSubmit}>Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}