import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <ul className="flex flex-wrap py-8 container m-auto">
            <Link href='/providers'>
                <Card className="hover:opacity-85">
                    <CardHeader>
                        <CardTitle>Proveedores</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Truck />
                    </CardContent>
                </Card>
            </Link>
        </ul>
    );
}