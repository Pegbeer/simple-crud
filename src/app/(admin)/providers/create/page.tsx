import CreateProviderForm from "@/components/ui/create-provider-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <main className="container mx-auto flex flex-col py-6 px-4 gap-4">
        <h2 className="text-3xl font-semibold tracking-normal">
            Crear nuevo proveedor
        </h2>
        <CreateProviderForm/>
    </main>
  );
}
