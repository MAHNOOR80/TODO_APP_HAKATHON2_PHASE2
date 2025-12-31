import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types/auth.types';
import { getCurrentUser } from '../services/auth.api';

/**
 * Authentication Context
 * Manages user authentication state across the app
 */

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with true to check session

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('[AuthContext] Checking for existing session...');
        const currentUser = await getCurrentUser();
        console.log('[AuthContext] Session found, user:', currentUser.email);
        setUser(currentUser);
      } catch (error) {
        console.log('[AuthContext] No valid session found');
        // No valid session, user remains null
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = (userData: User) => {
    console.log('[AuthContext] User logged in:', userData.email);
    setUser(userData);
  };

  const logout = () => {
    console.log('[AuthContext] User logged out');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
