import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../hooks/StateProvider'
import { Navigate } from 'react-router-dom'
import LeftBar from '../../components/HomeLeftSection/LeftBar'
import './Home.css'
import RightSection from '../../components/HomeContainerRight/RightSection'
import useFetchData from '../../hooks/useFetchData'
import { auth, db, provider } from '../../config/FirebaseConfig/Firebase'
import { actionTypes } from '../../hooks/reducer'

function Home() {
    const [{authUser,friend,publicUsers,onlyFriend,roomEntry},dispatch]=useStateValue()
    const [rightContainer, setrightContainer] = useState(null);
    const [leftContainer, setleftContainer] = useState(null);
    const [noUser, setnoUser] = useState(null);
    const [a, seta] = useState(0);

    useEffect(() => {
        const ref = db.collection("allUser").doc(`${authUser?.uid}`);
        ref.get().then(doc => {
          const data = doc.data();
          if (data) {
            if (data.timestamp) {
              //console.log("updating user")
              return ref.set({
                displayName: authUser?.displayName,
                photoURL: authUser?.photoURL,
              }, { merge: true })
            }
          }
          //console.log("setting user")
          return ref.set({
            displayName: authUser?.displayName,
            photoURL: authUser?.photoURL,
          }, { merge: true })
        });    
        if(roomEntry){
          setrightContainer('right')
          setleftContainer('left')
        }
        else{
          setrightContainer('right2')
          setleftContainer('left2')
        }

        for(var i=0;i<publicUsers?.length;i++){
          seta(i)
        }

        db.collection('allUser').onSnapshot(snapshot=>{
          dispatch({
            type:actionTypes.SET__PUBLIC,
            publicUsers:
            snapshot.docs.map(doc=>(
              {
                id:doc.id,
                data:doc.data()
              }
            ))
          })
        })
        
        // if(authUser){
        //   if(Notification.permission ==='granted'){ 
        //     const greeting = new Notification(`${authUser?.displayName}`,{
        //       body: `${authUser?.uid}`,
        //       icon: `${authUser?.photoURL}`
        //     });
        //     greeting.onclick = () => window.open('http://localhost:3000/home');
        //     setTimeout(() => {
        //       greeting.close()
        //     }, 2000); 
    
        //   } 
        //   else if(Notification.permission ==='denied'){
        //    Notification.requestPermission();
        //   }
        //   else{
        //     Notification.requestPermission();
        //   }
        // }

    }, [rightContainer,leftContainer,friend,a,authUser,roomEntry])

    
    return (
        <>
{authUser?
        (
        <div className='HomeContainer__home'>
           <div className={`homecontainer__left ${leftContainer}`}>
                <LeftBar avatar={authUser?.photoURL} />
           </div>
            <div className={`homecontainer__right ${rightContainer}`}>
{roomEntry?         (<RightSection />):
                        null
                }
           </div>
        </div> 
        ):
        (<Navigate to="/" />)
}
        </>
    )
}

export default Home
