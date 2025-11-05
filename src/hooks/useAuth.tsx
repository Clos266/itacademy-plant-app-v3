import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  onAuthStateChange,
  type AuthUser,
  type LoginData,
  type SignUpData,
} from "../services/authService";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  signIn: (data: LoginData) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const result = await getCurrentUser();
        if (mounted) {
          if (result.success && result.data) {
            setUser(result.data);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = onAuthStateChange((authUser) => {
      setUser(authUser);
      if (!loading) {
        // Only set loading to false after initial load
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loading]);

  const handleSignUp = async (data: SignUpData) => {
    setLoading(true);
    try {
      const result = await signUp(data);
      if (result.success && result.data) {
        setUser(result.data);
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch (error: any) {
      return { success: false, error: error.message || "Sign up failed" };
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (data: LoginData) => {
    setLoading(true);
    try {
      const result = await signIn(data);
      if (result.success && result.data) {
        setUser(result.data);
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch (error: any) {
      return { success: false, error: error.message || "Sign in failed" };
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const result = await signOut();
      if (result.success) {
        setUser(null);
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch (error: any) {
      return { success: false, error: error.message || "Sign out failed" };
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const result = await getCurrentUser();
      if (result.success && result.data) {
        setUser(result.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signOut: handleSignOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
