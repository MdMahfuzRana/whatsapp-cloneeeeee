import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../hooks/StateProvider'
import { Navigate } from 'react-router-dom'
import LeftBar from '../../components/HomeLeftSection/LeftBar'
import './Home.css'
import RightSection from '../../components/HomeContainerRight/RightSection'
import useFetchData from '../../hooks/useFetchData'
import { auth, db, provider } from '../../config/FirebaseConfig/Firebase'

function Home() {
    const [{authUser,friend},dispatch]=useStateValue()
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
    }, [])
    return (
        <>
{authUser?
        (
        <div className='HomeContainer__home'>
           <div className='homecontainer__left'>
                <LeftBar avatar={authUser?.photoURL} />
           </div>
            <div className='homecontainer__right'>
                <RightSection />
           </div>
        </div>
        ):
        (<Navigate to="/" />)
}
        </>
    )
}

export default Home
