import { getDatabase, onValue, ref } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./auth/authContext";
import Loading from "./Loading/loading";
const DataContext=React.createContext();
// eslint-disable-next-line react-refresh/only-export-components
export function useGetData(){
  return useContext(DataContext);
}

// eslint-disable-next-line react/prop-types
export function UseGetData({children}){
    const [mainArray,setMainArray]=useState([]);
    const[dataArray,setDataArray]=useState([]);
    const [mounthArray,setMounthArray]=useState([]);
    const[loading,setLoading]=useState(false);
    const{currentuser}=useAuth();
useEffect(()=>{
    async function AllData(){
      const db = getDatabase();
      if(currentuser){
        setLoading(true);
        const uid=currentuser.uid;
        const dbRef = ref(db, 'main/'+`/${uid}`);
    try{
      await onValue(dbRef, (snapshot) => {
        const mounth=[];
        let array=[];
        const dataArray=[];
       mounth.push(Object.values(snapshot.val()));
       
        snapshot.forEach((child)=>{
        child.forEach((item)=>{
            dataArray.push(Object.values(item.val()));
            item.forEach((last)=>{
                const valu=last.val();
                array.push({
                    childKey:child.key,
                    itemKey:item.key,
                    lastKey:last.key,
                    name:valu.name,
                    taka:valu.taka,
                    time:valu.time

                })
            })
        })
        })
        setDataArray(dataArray);
        setMainArray(array);
        setMounthArray(mounth);
        }).then(setLoading(false))
    }catch(err){
      //
    }
      }else{
        console.log('king')
        alert('no data found');
      }  
    }
    AllData();  
    },[currentuser])
    //const newDataArray=mainArray.sort((a,b)=>{
    //  return a.itemKey-b.itemKey; 
   // });
 const value={
    mainArray,
   dataArray,
   mounthArray,
   loading
  }
 return (
  <>
  <DataContext.Provider value={value}>
  {!loading ? children:<Loading />}
  </DataContext.Provider>
  </>
 )
}