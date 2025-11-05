import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

interface SignUpFormProps {
  onToggleMode: () => void;
}

export function SignUpForm({ onToggleMode }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const { signUp, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const result = await signUp({
      email,
      password,
      nickname: nickname || undefined,
    });

    if (!result.success) {
      setError(result.error || "Error al crear la cuenta");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Crear Cuenta</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email *
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium mb-2"
            >
              Nombre de usuario (opcional)
            </label>
            <Input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Tu nombre de usuario"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Contraseña *
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-2"
            >
              Confirmar Contraseña *
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <button
            onClick={onToggleMode}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Inicia sesión aquí
          </button>
        </p>
      </CardFooter>
    </Card>
  );
}
