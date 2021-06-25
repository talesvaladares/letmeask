import {createContext, useContext, useState, useEffect} from 'react';
import {auth, firebase} from '../services/firebase';

type User = {
  name: string;
  avatar: string;
  id: string;
};

type AuthContextProps = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type AuthProviderProps = {
  children: React.ReactNode;
}

export function AuthProvider({children}: AuthProviderProps){

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        const {displayName, photoURL, uid} = user;

        if(!displayName || !photoURL){
          throw new Error("Missing information from Goole Account")
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    })

    return () => {
      unsubscribe();
    }
  },[]);

  async function signInWithGoogle(){
    
    const provider = new firebase.auth.GoogleAuthProvider();
    
    const response = await auth.signInWithPopup(provider);

    if(response.user){
      const {displayName, photoURL, uid} = response.user;

      if(!displayName || !photoURL){
        throw new Error("Missing information from Goole Account")
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
    
  }
  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  const context = useContext(AuthContext);

  return context;
}