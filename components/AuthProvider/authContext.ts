import { Auth, User, UserCredential } from 'firebase/auth';
import { createContext, useContext } from 'react';
  
  export interface AuthContextModel {
    auth: Auth;
    currentUser: User | null;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    changeEmail: (email: string) => Promise<void>;
    changePassword: (password: string) => Promise<void>;
  }
  
  export const AuthContext = createContext<AuthContextModel>(
    {} as AuthContextModel
  );
  
  export function useAuth() {
    return useContext(AuthContext);
  }
  