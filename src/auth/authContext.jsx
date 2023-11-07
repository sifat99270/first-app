import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { useContext, useEffect, useState } from "react";
import '../firebase/firebase';
import Loading from '../Loading/loading';

const AuthContext=React.createContext();


// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(){
    return useContext(AuthContext);
}
// eslint-disable-next-line react/prop-types
export function AuthProvider({children}){

    const[loading,setLoading]=useState(true);
    const[error,setError]=useState('');
    const[currentuser,setCurrentUser]=useState()

    useEffect(()=>{
        const auth=getAuth();
     const unSubscribe=onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            setLoading(false);
        })
        return unSubscribe;

    },[])

   async function signin(email,password,username){
        const auth=getAuth();
     try{
        setLoading(true);
        await createUserWithEmailAndPassword(auth,email,password).then(setLoading(false));

     }catch(err){
        setLoading(false);
        setError(`Can't Signin`);
     }

       // update profile
       await updateProfile(auth.currentUser,{displayName:username})

       const user=auth.currentUser;
       setCurrentUser({
        ...user,
       })
    }
   async function login(email,password){
    const auth=getAuth();
    try{
        setLoading(true);
        return await signInWithEmailAndPassword(auth,email,password).then(setLoading(false))
    }catch(err){
        setError(`Can't Login`);
    }

 }
 function logout(){
    const auth=getAuth();

    return signOut(auth)
 }
 const value={
    currentuser,
    signin,
    login,
    logout,
    loading,
    error
 }
    return(
        <AuthContext.Provider value={value}>
            {!loading ? children:<Loading />}
        </AuthContext.Provider>
    )

}