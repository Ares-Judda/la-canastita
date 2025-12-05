"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAcountService } from "@/services/acount-service";
import { UserData } from "@/services/acount-service";
import { useState } from "react";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { loginUser } = useAcountService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongCredentials, setWrongCredential] = useState(false);
  const router = useRouter();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWrongCredential(false);

    // 🔥 LOGIN DEMO (sin API)
    if (email === "aresjudda@gmail.com" && password === "123456") {
      const fakeUser = {
        email: "ares.judda@gmail.com",
        role: "demo",
      };

      console.log("Usuario logueado:", fakeUser);
      toast.info(`Bienvenido ${fakeUser.email} - Rol: ${fakeUser.role}`);
      router.push("/home");
      return; // Detener flujo y NO llamar a la API
    }

    // 🔥 LOGIN REAL (API)
    const userData: UserData = { email, password };
    const user = await loginUser(userData);

    if (user) {
      console.log("Usuario logueado:", user);
      toast.info(`Bienvenido ${user.email} - Rol: ${user.role}`);
    } else {
      toast.error("Correo o contraseña incorrectos");
      setWrongCredential(true);
    }
  
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 bg-cesta">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-content">
                  Bienvenido <br />a tu tienda de abarrotes
                </h1>
                <p className="text-balance text-content">
                  Ingresa a tu cuenta para continuar
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email" className="text-content">
                  Correo electrónico
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className={`!placeholder-[#b46b35] text-[#b46b35] bg-content ${
                    wrongCredentials ? "border-red-700 border-3" : ""
                  }`}
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-content">
                    Contraseña
                  </FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`!placeholder-[#b46b35] text-[#b46b35] bg-content ${
                    wrongCredentials ? "border-red-700 border-3" : ""
                  }`}
                  required
                />
              </Field>

              <Field>
                <Button type="submit" className="bg-[#55321e]">
                  Ingresar
                </Button>
              </Field>

              <FieldDescription className="text-center text-content">
                ¿No tienes cuenta?{" "}
                <Link href="/signup" className="text-amber-100">
                  Regístrate
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="bg-muted relative hidden md:block">
            <img
              src="/logo.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        Al continuar, aceptas nuestros{" "}
        <a href="#">Términos de Servicio</a> y{" "}
        <a href="#">Política de Privacidad</a>.
      </FieldDescription>
    </div>
  );
}
