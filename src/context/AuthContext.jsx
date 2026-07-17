import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config.js';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, 'usuarios', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUser({ uid: currentUser.uid, email: currentUser.email, ...userDocSnap.data() });
        } else {
          const datos = {
            nombre: currentUser.email === 'norberto@vinieve.com' ? 'Norberto' : 'Usuario',
            email: currentUser.email,
            rol: currentUser.email === 'norberto@vinieve.com' ? 'admin' : 'user'
          };
          await setDoc(userDocRef, datos);
          setUser({ uid: currentUser.uid, ...datos });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
