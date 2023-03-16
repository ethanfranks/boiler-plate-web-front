import { AuthContext } from "@/components/AuthProvider/authContext";
import { auth } from "@/utils/firebase";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  User,
} from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";

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

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
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
