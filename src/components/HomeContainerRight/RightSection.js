import React, { useEffect, useRef, useState } from 'react'
import './RightSection.css'
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton } from '@mui/material';
// import Inputer from '../input/Inputer';
import SendIcon from '@mui/icons-material/Send'
import { useStateValue } from '../../hooks/StateProvider';
import { auth, db ,createTimestamp } from '../../config/FirebaseConfig/Firebase';
import audios from './src_message_sent.mp3'
import MicNoneIcon from '@material-ui/icons/MicNone';
import { actionTypes } from '../../hooks/reducer';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import Messages from './Messages';



function RightSection() {
  const [{friend,authUser,authUserFireStoreId},dispatch] = useStateValue()
  const [message, setmessage] = useState('')
  const [userMessages, setuserMessages] = useState(null)
  const [AuthUserMessages, setAuthUserMessages] = useState(null)
  const [roomId, setroomId] = useState(null)
  const [roomId2, setroomId2] = useState(null)
  const [roomDataSender, setroomDataSender] = useState(null)
  const [publicRoomId, setpublicRoomId] = useState(null)
  const [i, seti] = useState(0)
  const [roomIdEntry, setroomIdEntry] = useState(null)
  const [isLoading, setisLoading] = useState(false);
  const audio = new Audio(audios)
  const endOfMessage = useRef(null);
  const divRref = useRef(null);



  useEffect(() => {

    if(friend && authUser){
      if(friend && authUser){
        setroomId(friend?.id+authUser?.uid)
        setroomId2(authUser?.uid+friend?.id)
      }
      else{
        db.collection('rooms').onSnapshot(snapShot=>{
          snapShot.docs.map(doc=>{
            setpublicRoomId(doc.id)
          })
        })
      }
    }

    if(roomIdEntry){
      db.collection("rooms").doc(`${roomIdEntry}`).collection("messages").orderBy('timestamp','asc').onSnapshot((snapShot)=>(
        setuserMessages(
          snapShot.docs.map((doc)=>(
              doc.data()
            ))
        )
      ))
    }
    
    db.collection('rooms').onSnapshot(snapShot=>{
      setroomDataSender(             
          snapShot.docs.map((doc)=>({ 
          id:doc.id,
          data:doc.data()
        }))
      )
      
    })
    for(var a=0;a<roomDataSender?.length;a++){
      seti(a) 
  }
  if(roomDataSender){
    if(roomDataSender[i]?.id===roomId2){
      setroomIdEntry(roomId2)
    }
    else{
      setroomIdEntry(roomId)
    }
  }

    console.log('this is the room dtaaroomData')
  }, [friend,authUser,roomId2,roomIdEntry,roomId,i,authUserFireStoreId])

const scrollToBottom = () => {
  divRref.current.scrollIntoView({ behavior: 'smooth' });
}

  const sendMessage = () => {
    if(message.length>0){
      if(roomId){
        if(roomDataSender[i]?.id!==roomId && roomDataSender[i]?.id!==roomId2){
          db.collection('rooms').doc(`${roomId}`).set({
            friend:{
              displayName:authUser?.displayName,
              photoURL:authUser?.photoURL,
              email:authUser?.email,
              message:message,
              timestamp: createTimestamp(),
              time: new Date().toUTCString(),
            }
          })
        }
        else{
          if(roomIdEntry){
            db.collection('rooms').doc(`${roomIdEntry}`).collection("messages").add({
              message:{
                displayName:authUser?.displayName,
                photoURL:authUser?.photoURL,
                email:authUser?.email,
                message:message,
                timestamp: createTimestamp(),
                time: new Date().toUTCString(),
              },
              timestamp:{
                timestamp: createTimestamp(),
              }
            })
            .catch(err=>{
              console.log(err)
            })
            .then(payload=>{
              if(payload){
                audio.play()
                setisLoading(false)
              }
            })
            setisLoading(true)
            setmessage('')
            scrollToBottom()
          }
        }
      }
      else{
        console.log('massageCannotset')
      }
    }
    else{
      console.log('please enter something')
    }

  }

    return (
        <div className='rightsection__main__container'>
           <div className='rightSection__top__header'>
               <div className='top__header__section__first__container'>
                    <div style={{marginRight:"20px"}}><Avatar src={friend?.data.photoURL} /></div>
                    <div><p>{friend?.data.displayName}</p><p style={{fontWeight:"normal"}}>last seen at...</p></div>
               </div>
               <div className='topHeader__second__container'>
                  <IconButton>
                    <ArrowBackIosIcon onClick={()=>{
                      if(friend){
                        dispatch({
                          type:actionTypes.SET__FRIEND,
                          friend:null,
                        })
                      }
                    }} /> 
                  </IconButton>
                  <IconButton>
                    <AttachFileIcon /> 
                  </IconButton>
                  <IconButton>
                    <MoreVertIcon /> 
                  </IconButton>
               </div> 
            </div> 
           <div className='chathistriand__field__container extension1' >
            {             
              userMessages?.map(umesages=>(
                  <Messages message={umesages?.message?.message} time={umesages?.message?.created} displayName={umesages?.message?.displayName}    />
              )) 
              
            }
           </div>
           <div className='footer__main__container'>
                <IconButton style={{backgroundColor:"rgb(99, 236, 168)"}}>
                    <MicNoneIcon style={{height:'24px',width:'24px',color:"white",fontWeight:"bold"}} />
                </IconButton>
               <div className='input__container__formessgae__send'>
                <>
                  <input className='inputContent' onChange={(e)=>{setmessage(e.target.value)}} value={message} type="text" placeholder="Send a message" />
                </>
               </div>
{!isLoading?          ( 
                  <IconButton style={{backgroundColor:"rgb(99, 236, 168)"}} onClick={sendMessage}>
                    <SendIcon style={{color:"white",fontWeight:"bold"}} />
                  </IconButton>
):
                (<IconButton style={{backgroundColor:"rgb(99, 236, 168)"}}>
                    <CircularProgress style={{height:'24px',width:'24px',color:"white",fontWeight:"bold"}} />
                </IconButton>)
    }
           </div>
        </div>
    )
}

export default RightSection
