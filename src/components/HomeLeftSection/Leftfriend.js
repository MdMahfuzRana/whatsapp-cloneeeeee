import { Avatar } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { actionTypes } from '../../hooks/reducer';
import { useStateValue } from '../../hooks/StateProvider';

function Leftfriend({user,id}) {
    const [{authUser},dispatch] = useStateValue()
    const [friend, setfriend] = useState(false);
    const [lastMessge, setlastMessge] = useState(null)
    const [messageLimite, setmessageLimite] = useState(true)

    useEffect(() => {
        if(user){
            if(user?.friend?.displayName===authUser?.displayName){
                setfriend(true)
            }
         }

         if(user?.timeStamp?.lastMessage?.length>15){
            setlastMessge(authUser?.displayName + ' sent text')
         }
         else{
            setlastMessge(user?.timeStamp?.lastMessage) 
         }




    }, [friend,user,lastMessge]);

  return (
  <div className='people__container__self' onClick={()=>{
      dispatch({
      type:actionTypes.SET__ROOMENTRY,
      roomEntry:id
  })
    if(friend){
        dispatch({
            type:actionTypes.SET__ONLYFRIEND,
            onlyFriend:user?.myself
        })
    }
    else{
    dispatch({
        type:actionTypes.SET__ONLYFRIEND,
        onlyFriend:user?.friend
    }) 
    }
    
  }}> 
{friend?  (
    <>
    <div style={{width:"fit-content",display:'flex',justifyContent:"center",alignItems:"center"}}><Avatar src={user?.myself?.photoURL} /></div>
  <div className='people__container__second'>
      <div className='people__container__time__and__user'>
          <div><p style={{fontSize:".9rem",fontWeight:"bold"}}>{user?.myself?.displayName}</p></div>
          <div><p>{moment(user?.timeStamp?.timeStamp).format('LT')}</p></div>
      </div>
      <div><p style={{fontSize:"small",marginTop:"3px"}}>{lastMessge}...</p></div>
  </div>
  </>
  ):
  (
    <>
    <div style={{width:"fit-content",display:'flex',justifyContent:"center",alignItems:"center"}}><Avatar src={user?.friend?.photoURL} /></div>
  <div className='people__container__second'>
      <div className='people__container__time__and__user'>
          <div><p style={{fontSize:".9rem",fontWeight:"bold"}}>{user?.friend?.displayName}</p></div>
          <div><p>{moment(user?.timeStamp?.timeStamp).format('LT')}</p></div>
      </div>
      <div><p style={{fontSize:"small",marginTop:"3px"}}>{lastMessge}...</p></div>
  </div>
  </>
  )}
  
  </div>

  ) ;
}

export default Leftfriend;
