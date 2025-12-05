"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAcountService } from "@/services/acount-service";
import { UserData } from "@/services/acount-service";
import { use, useState } from "react";
import { toast } from "sonner"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { registerUser } = useAcountService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongCredentials, setWrongCredential] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setWrongCredential(false);
  const userData: UserData = { email, password };

  const user = await registerUser(userData);

  if (user) {
    console.log("Usuario registrado:", user);
    toast.info(`usuario ${user.email} registrado - con Rol: ${user.role}`);
  } else {
    toast.error("Correo o contraseña incorrectos");
    setWrongCredential(true);
  }
};

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold text-content">Crea tu cuenta</h1>
          <p className="text-sm text-balance text-amber-100">
            Escribe dentro de los espacios para crear tu cuenta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name" className="text-content">
            Nombre completo
          </FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            className="!placeholder-[#b46b35] text-[#b46b35] bg-content"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email" className="text-content">
            Correo electronico
          </FieldLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="m@example.com"
            className= {`!placeholder-[#b46b35] text-[#b46b35] bg-content ${wrongCredentials ? "border-red-700 border-3":""}`}
            required
          />
          <FieldDescription className="text-content">
            usaremos este correo para contactarte
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password" className="text-content">
            Contraseña
          </FieldLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="!placeholder-[#b46b35] text-[#b46b35] bg-content"
            required
          />
          <FieldDescription className="text-content">
            La contraseña debe tener minimo 8 caracteres
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password" className="text-content">
            Confirma tu contraseña
          </FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            className="!placeholder-[#b46b35] text-[#b46b35] bg-content"
            required
          />
          <FieldDescription className="text-content">
            Porfavor confirma tu contraseña
          </FieldDescription>
        </Field>
        <Field>
          <Button type="submit" className="text-content">
            Registrate
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center text-content">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-amber-100">
              Regresemos al login
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
