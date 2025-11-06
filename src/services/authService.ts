import { supabase, ServiceResponse } from "./supabaseClient";

export interface AuthUser {
  id: string;
  email: string;
  created_at: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  nickname?: string;
}

// Sign up with email and password
export async function signUp(
  data: SignUpData
): Promise<ServiceResponse<AuthUser>> {
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return { data: undefined, error: error.message, success: false };
    }

    if (!authData.user) {
      return {
        data: undefined,
        error: "No user data returned",
        success: false,
      };
    }

    // Create profile after successful signup
    if (data.nickname) {
      await supabase.from("profiles").insert([
        {
          id: authData.user.id,
          nickname: data.nickname,
        },
      ]);
    }

    const user: AuthUser = {
      id: authData.user.id,
      email: authData.user.email || data.email,
      created_at: authData.user.created_at || new Date().toISOString(),
    };

    return { data: user, error: undefined, success: true };
  } catch (error: any) {
    return { data: undefined, error: error.message, success: false };
  }
}

// Sign in with email and password
export async function signIn(
  data: LoginData
): Promise<ServiceResponse<AuthUser>> {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return { data: undefined, error: error.message, success: false };
    }

    if (!authData.user) {
      return {
        data: undefined,
        error: "No user data returned",
        success: false,
      };
    }

    const user: AuthUser = {
      id: authData.user.id,
      email: authData.user.email || data.email,
      created_at: authData.user.created_at || new Date().toISOString(),
    };

    return { data: user, error: undefined, success: true };
  } catch (error: any) {
    return { data: undefined, error: error.message, success: false };
  }
}

// Sign out
export async function signOut(): Promise<ServiceResponse<boolean>> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { data: false, error: error.message, success: false };
    }

    return { data: true, error: undefined, success: true };
  } catch (error: any) {
    return { data: false, error: error.message, success: false };
  }
}

// Get current user
export async function getCurrentUser(): Promise<ServiceResponse<AuthUser>> {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      return { data: undefined, error: error.message, success: false };
    }

    if (!user) {
      return { data: undefined, error: "No user found", success: false };
    }

    const authUser: AuthUser = {
      id: user.id,
      email: user.email || "",
      created_at: user.created_at || new Date().toISOString(),
    };

    return { data: authUser, error: undefined, success: true };
  } catch (error: any) {
    return { data: undefined, error: error.message, success: false };
  }
}

// Auth state change listener
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      const authUser: AuthUser = {
        id: session.user.id,
        email: session.user.email || "",
        created_at: session.user.created_at || new Date().toISOString(),
      };
      callback(authUser);
    } else {
      callback(null);
    }
  });
}
