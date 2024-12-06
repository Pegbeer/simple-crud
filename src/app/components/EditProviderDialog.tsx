'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Providers } from "@prisma/client";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { z } from 'zod';

interface Props {
    provider: Providers,
    onSubmit: () => void
}

export default function EditProviderDialog({ provider, onSubmit }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [socialReason, setSocialReason] = useState(provider.SocialReason ?? '');
    const [phone, setPhone] = useState(provider.Phone ?? '');
    const [nrc, setNrc] = useState(provider.NRC ?? '');
    const [industry, setIndustry] = useState(provider.NIT ?? '');
    const [email, setEmail] = useState(provider.Email ?? '');

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size='icon'>
                    <Edit2 />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-max lg:max-w-max">
                <DialogTitle>Editar proveedor</DialogTitle>
                <DialogDescription>Aqui puedes editar los detalles del proveedor</DialogDescription>
                <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="socialReason" className="text-right">Razon Social</Label>
                    <Input id="socialReason" className="col-span-2" value={socialReason} onChange={(e) => setSocialReason(e.target.value)} />
                    <Label htmlFor="phone" className="text-right">Teléfono</Label>
                    <div className="flex items-center gap-2 col-span-2">
                        <p>+503</p>
                        <InputOTP maxLength={8} pattern={REGEXP_ONLY_DIGITS}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator/>
                            <InputOTPGroup>
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                                <InputOTPSlot index={6} />
                                <InputOTPSlot index={7} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <Label htmlFor="nrc" className="text-right">NRC</Label>
                    <Input id="nrc" className="col-span-2" value={nrc} onChange={(e) => setSocialReason(e.target.value)} />
                    <Label htmlFor="nit" className="text-right">NIT</Label>
                    <Input id="nit" className="col-span-2" value={nrc} onChange={(e) => setSocialReason(e.target.value)} />
                </div>
            </DialogContent>
        </Dialog>
    );
}