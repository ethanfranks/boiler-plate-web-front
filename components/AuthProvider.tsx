import { auth } from "@/utils/firebase";
import {
  Auth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  User,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type LoginResponse = {
  message?: string;
  successful: boolean;
};

export interface AuthContextModel {
  auth: Auth;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<LoginResponse>;
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

type AuthProviderProps = {
  children?: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      console.log(`AuthProvider currentUser: ${currentUser.email}`);
    } else {
      console.log(`AuthProvider currentUser: ${null}`);
    }
  }, [currentUser]);

  async function login(email: string, password: string) {
    const loginRes = {} as LoginResponse;

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user);
        loginRes.successful = true;
        console.log(`User logged in successfully!`);
      })
      .catch((error) => {
        loginRes.message = error.message;
        loginRes.successful = false;
        console.log(`${error.message}`);
      });

    return loginRes;
  }

  async function logout() {
    await auth.signOut();
    setCurrentUser(null);
    console.log(`User logged out.`);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function changeEmail(email: string) {
    return updateEmail(auth.currentUser!, email);
  }

  function changePassword(password: string) {
    return updatePassword(auth.currentUser!, password);
  }

  const value = {
    auth,
    currentUser,
    login,
    logout,
    resetPassword,
    changeEmail,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
