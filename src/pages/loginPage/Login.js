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

    const login =(e)=>{
        e.preventDefault();
        auth.signInWithPopup(provider)
        .catch(e => alert(e.message))
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
