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
import { auth, db ,storage ,createTimestamp } from '../../config/FirebaseConfig/Firebase';
import audios from './src_message_sent.mp3'
import MicNoneIcon from '@material-ui/icons/MicNone';
import { actionTypes } from '../../hooks/reducer';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import Messages from './Messages';
import moment from 'moment';



function RightSection() {
  const [{friend,authUser,authUserFireStoreId,roomEntry,publicUsers,onlyFriend},dispatch] = useStateValue()
  const [message, setmessage] = useState('')
  const [userMessages, setuserMessages] = useState(null)
  const [AuthUserMessages, setAuthUserMessages] = useState(null)
  const [roomId, setroomId] = useState(null)
  const [roomId2, setroomId2] = useState(null)
  const [roomDataSender, setroomDataSender] = useState(null)
  const [publicRoomId, setpublicRoomId] = useState(null)
  const [isLoading, setisLoading] = useState(false);
  const audio = new Audio(audios)
  const endOfMessage = useRef(null);
  const [lastSeen, setlastSeen] = useState('00:00');
  const [file, setfile] = useState('');
  const [j, setj] = useState(0);
  const [id, setid] = useState(null);



  useEffect(() => {
    if (endOfMessage) {
      endOfMessage.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
    endOfMessage.current.onscroll = () =>{
      if(endOfMessage.current.scrollTop ===  0){
        console.log('in the top')
      }
    }
  }, [])

  useEffect(() => {
      db.collection("rooms").doc(`${roomEntry}`).collection("messages").orderBy('timestamp','asc').onSnapshot((snapShot)=>(
        setuserMessages(
          snapShot.docs.map((doc)=>(
              doc.data()
            ))
        )
      ))    
    db.collection('rooms').onSnapshot(snapShot=>{
      setroomDataSender(             
          snapShot.docs.map((doc)=>({ 
          id:doc.id,
          data:doc.data()
        }))
      )
      
    })
  }, [friend,authUser,roomId2,roomId,j,authUserFireStoreId,lastSeen,file,publicUsers,roomEntry,id,onlyFriend])

  const sendMessage = () => {
    if(message.length>0 || file){
        if(roomEntry || roomId){
          if(roomEntry && file){
            setisLoading(true)
            const upladTask = storage.ref(`images/${file.name}`).put(file);
            upladTask.on(
              "state_changed",
              (snapShot) => {

              },
              (error) => {
                console.log(error);
              },
              () => {
                storage
                .ref('images')
                .child(file.name)
                .getDownloadURL()
                .then(url=>{
                  db.collection('rooms').doc(`${roomEntry}`).collection("messages").add({
                    message:{
                      displayName:authUser?.displayName,
                      photoURL:authUser?.photoURL,
                      email:authUser?.email,
                      message:url,
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
                  setfile(null)
                })
              }
            )
          }
          else if(roomEntry){
            db.collection('rooms').doc(`${roomEntry}`).collection("messages").add({
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
                db.collection('rooms').doc(`${roomEntry}`).set({
                  friend:{
                    id:onlyFriend?.id,
                    displayName:onlyFriend?.displayName,
                    photoURL:onlyFriend?.photoURL,
                    lastSeen:createTimestamp(),
                    totalunseenMessages:null
                  },
                  myself:{
                    id:authUser?.uid,
                    displayName:authUser?.displayName,
                    photoURL:authUser?.photoURL,
                    lastSeen:createTimestamp(),
                    totalunseenMessages:null
                  },
                  timeStamp:{
                    timeStamp:createTimestamp(),
                    lastMessage:message,
                  }
                })
                audio.play()
                setisLoading(false)
              }
            })
            setisLoading(true)
            setmessage('')
          }
          else{
            console.log('problem FOund')
          }
        }
        else{
          console.log('no found Room PERmiSSION')
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
                    <div style={{marginRight:"20px"}}><Avatar src={onlyFriend?.photoURL} /></div>
                    <div><p>{onlyFriend?.displayName}</p><p style={{fontWeight:"normal"}}>last seen at... {moment(lastSeen).format('LT')}</p></div>
               </div>
               <div className='topHeader__second__container'>
                  <IconButton>
                  <label>
                    <ArrowBackIosIcon onClick={()=>{
                      if(roomEntry){
                        dispatch({
                          type:actionTypes.SET__ROOMENTRY,
                          roomEntry:null,
                        })
                      }
                    }} /> 
                    </label>
                  </IconButton>
                  <IconButton>
                    <label htmlFor='fileInput'>
                       <AttachFileIcon /> 
                    </label>
                  </IconButton>
                  <input type='file' id="fileInput" style={{display:"none"}} onChange={(e)=>{if(e.target.files[0]){setfile(e.target.files[0])}}} />
                  <IconButton>
                    <label>
                       <MoreVertIcon /> 
                    </label>
                  </IconButton>
               </div> 
            </div> 
           <div className='chathistriand__field__container' ref={endOfMessage} >
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
