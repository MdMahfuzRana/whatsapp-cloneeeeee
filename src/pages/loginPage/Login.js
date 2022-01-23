import React, { useEffect, useState } from 'react'
import './Login.css'
import logo from '../../assets/logos/whatsapplogo.png'
import Button from '../../components/button/Button'
import { auth, db, provider } from '../../config/FirebaseConfig/Firebase'
import { actionTypes } from '../../hooks/reducer'
import { useStateValue } from '../../hooks/StateProvider'
import { Navigate } from 'react-router-dom'

function Login() {
    const [{authUser},dispatch]=useStateValue()
    const [dbUserEmail, setdbUserEmail] = useState([])
    const [mail, setmail] = useState(null)
    const [i, seti] = useState(0)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
       db.collection("allUser").onSnapshot((snapShot)=>(

        // if(authUser.id !== )
           dispatch({
               type:actionTypes.SET__PUBLIC,
               publicUsers:
               snapShot.docs.map((doc)=>({ 
                id:doc.id,
                data:doc.data()}
            ))
           }),

           setdbUserEmail(
               snapShot.docs.map((doc)=>({ 
                   id:doc.id,
                   data:doc.data(),
                }
               ))
           )
       ))
     for(var a=0;a<dbUserEmail?.length;a++){
         seti(a) 
     }
     db.collection("allUser").onSnapshot((snapShot)=>(
        snapShot.docs.forEach((doc)=>{ 
          if(doc.data().email===authUser?.email){
            dispatch({
                type:actionTypes.SET__USER__ID,
                authUserFireStoreId:doc.id,
            })
          }
          else{
            console.log(false)
          }
        })
      ))
    }, [i])

    const login =(e)=>{
        e.preventDefault();
        auth.signInWithPopup(provider)
        .catch(e => alert(e.message))
        // .then(result=>{
        //     if(result?.user.email!==dbUserEmail[i]?.data.email){
        //         db.collection("allUser").add({
        //             email:result.user.email,
        //             displayName:result.user.displayName,
        //             photoURL:result.user.photoURL,               
        //         })     
        //     } 
        //     else{
        //         console.log("user Exist so we are not adding this user!!!")
        //     } 
        // })

    }

    useEffect(() => {
        auth.onAuthStateChanged(authUsr => {
            if (authUsr) {
                dispatch({
                    type:actionTypes.SET__USER,
                    authUser:authUsr
                })
            }
        });
    }, [])

                // if(result?.user.email!==dbUserEmail[i]?.data.email){
                //     db.collection("allUser").add({
                //         email:result.user.email,
                //         displayName:result.user.displayName,
                //         photoURL:result.user.photoURL,               
                //     })     
                // } 
                // else{
                //     console.log("user Exist so we are not adding this user!!!")
                // } 
    // useEffect(() => {
    //     let isMounted = true;            
    //       if (isMounted){
              
    //       }    
    //     return () => { isMounted = false }; 
    //   }, []);

    return (
        <>
{authUser?
            (
            <>
                <Navigate to="/home" />
            </>
            ):(
           <div className='loginPage' >
                <div className='login__main__container'>
                    <div className='logo__container'>
                         <img src={logo} alt=" " />
                    </div>
                    <div  onClick={login} className='buttton__contaienr'>
                        <Button label="signIn" />
                    </div>
                </div>
            </div>
            )
            }
        </>

    )
}

export default Login
