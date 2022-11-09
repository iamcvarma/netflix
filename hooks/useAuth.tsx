import { useState, useContext, useEffect, useMemo, createContext } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [initalLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(
    ()=>onAuthStateChanged(auth,(user)=>{
      if (user){
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(true)
        router.push('/login')
      }

      setInitialLoading(false)
    }),
    [auth]
  )



  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };
  const logOut = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };
  const memoedValue = useMemo(
    () => ({ user, signIn, signUp, logOut, loading, error }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initalLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
