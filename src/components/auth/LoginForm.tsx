import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

interface LoginFormProps {
  onToggleMode: () => void;
}

export function LoginForm({ onToggleMode }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    const result = await signIn({ email, password });
    if (!result.success) {
      setError(result.error || "Error al iniciar sesión");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
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
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={onToggleMode}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Regístrate aquí
          </button>
        </p>
      </CardFooter>
    </Card>
  );
}
