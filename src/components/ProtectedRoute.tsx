import { useAuth } from "../hooks/useAuth";
import { AuthModal } from "../components/auth/AuthModal";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth();

  // Note: Automatic redirect to profile disabled
  // Users should manually navigate to profile when needed
  // This prevents unwanted redirects after login for existing users

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthModal />;
  }

  return <>{children}</>;
}
