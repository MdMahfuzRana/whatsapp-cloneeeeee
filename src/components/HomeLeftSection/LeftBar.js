import React, { useEffect, useRef, useState } from 'react'
import './LeftBar.css'
import Avatar from '@mui/material/Avatar';
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import MessageIcon from '@mui/icons-material/Message'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import Inputer from '../input/Inputer';
import { useStateValue } from '../../hooks/StateProvider';
import { actionTypes } from '../../hooks/reducer';
import { auth, createTimestamp, db, provider } from '../../config/FirebaseConfig/Firebase'
import { useNavigate  } from 'react-router-dom'
import Leftfriend from './Leftfriend';


function LeftBar({avatar}) {
    const [{publicUsers,friend,authUser,roomEntry,onlyFriend,roomId,sidebarFriends,roomid},dispatch] = useStateValue()
    const history = useNavigate();
    const [allUserClicked, setallUserClicked] = useState(false);
    const [loader, setloader] = useState(false);
    const currentLoader = useRef(null);
    const [roomIdList, setroomIdList] = useState([]);
    const [rooms, setrooms] = useState([]);
    const [rooms1, setrooms1] = useState([]);
    const [lists, setlists] = useState([]);
    const [i, seti] = useState(0);
    const [m, setm] = useState(0)


    useEffect(()=>{
      db.collection('allUser').doc(`${authUser.uid}`).collection('roomList').onSnapshot(snapShot=>{
        var roomIdilist = []
        snapShot.docs.map(doc=>{
          roomIdilist.push(doc?.data())
        })
        dispatch({
          type:actionTypes.SET__ROOMID,
          roomid:roomIdilist
        })
        setlists(roomIdilist)
      })
    },[])

    useEffect(() => {

    if(roomid){   
      db.collection('rooms').orderBy('timeStamp','desc').onSnapshot(snapShot=>{
        var data = []
        snapShot.docs.map(doc=>{
          for(var v=0;v<roomid?.length;v++){
            if(doc?.id.includes(roomid[v]?.roomId)){
              data.push({
                id:doc?.id,
                data:doc?.data()
              })  
              // setrooms([...rooms,{id:doc?.id,data:doc?.data()}])
            }   
            else{
              console.log('not matched')
            }
          }
        }) 
        setrooms(data)  
      })
    }   

    for(var a=0;a<lists.length;a++){
          seti(a)
    }
    for(var b=0;b<roomid?.length;b++){
        setm(b)
     }

    }, [friend,i,m,roomid]);  


    // console.log(rooms)



    return (
        <div className='leftbar__main__container'>
           <div className='leftbar__header__containaer'>
               <div className='avatar__cotnainer'>
                   <IconButton>
                     <Avatar onClick={()=>{auth.signOut();window.location.reload();}} src={avatar} alt="" />
                   </IconButton>
               </div>
               <div className='iconcontainer'>
                   <IconButton>
                        <DonutLargeIcon />
                   </IconButton>
                   <IconButton onClick={()=>{if(allUserClicked){
                       setallUserClicked(false)
                   }else{
                    setallUserClicked(true)
                   }
                   }}>
                        <MessageIcon />
                   </IconButton>
                   <IconButton>
                        <MoreVertIcon />
                   </IconButton>
                   <div></div>
               </div>
            </div> 
           <div className='leftbar__search__container'>
               <div className='search__container'>
                    <SearchIcon />
                    <Inputer text={"Search your friends"} />
               </div>
           </div>
           <div className='people__container'>
{allUserClicked?
               (<>
{publicUsers?.map((user)=>(
              <div key={user?.id}  className='people__container__self'> 
              <div style={{width:"fit-content",display:'flex',justifyContent:"center",alignItems:"center"}}><Avatar src={user?.data?.photoURL} /></div>
              <div className='people__container__second'>
                  <div className='people__container__time__and__user1'>
                      <div><p style={{fontSize:".9rem",fontWeight:"bold"}}>{user?.data?.displayName}</p></div>
                      <div ref={currentLoader} className='buildFriend'>{loader?(<p>loading...</p>):<p onClick={()=>{
                        // dispatch({
                        //   type:actionTypes.SET__FRIEND,
                        //   friend:user
                        // })

                        if(user?.id && authUser?.uid && lists){
                          var roomId = user?.id + '+' + authUser?.uid
                          var roomId2 = authUser?.uid + '+' + user?.id
                          var roomId3 = authUser?.uid + '+' + authUser?.uid
                          console.log(lists[i]?.roomId)
                            if(lists[i]?.roomId.includes(roomId) || lists[i]?.roomId.includes(roomId2)){
                              console.log('found !! id ')
                            }   
                            else{
                              console.log('not found so we are adding')
                              db.collection('allUser').doc(`${user?.id}`).collection('roomList').onSnapshot(snapShot=>{
                                var docfriendRoomId = []
                                snapShot.docs.map(doc=>{
                                  docfriendRoomId.push(doc?.data()?.roomId)
                                })
                                console.log(docfriendRoomId)
                                  if(docfriendRoomId.includes(roomId) || docfriendRoomId.includes(roomId2)){
                                    console.log('we have')
                                  }
                                  else{
                                    console.log('not mathced')
                                    db.collection('allUser').doc(`${user?.id}`).collection('roomList').add({
                                      roomId:roomId
                                    })
                                  }
                              })

                              db.collection('allUser').doc(`${authUser?.uid}`).collection('roomList').onSnapshot(snapShot=>{
                                var docRoomId = []
                                snapShot.docs.map(doc=>{
                                  docRoomId.push(doc?.data()?.roomId)
                                })
                                console.log(docRoomId)
                                  if(docRoomId.includes(roomId) || docRoomId.includes(roomId2)){
                                    console.log('we have')
                                  }
                                  else{
                                    console.log('not mathced')
                                    db.collection('allUser').doc(`${authUser?.uid}`).collection('roomList').add({
                                      roomId:roomId
                                    })
                                    .then(payload=>{
                                      if(payload){
                                        db.collection('rooms').doc(`${roomId}`).set({
                                          friend:{
                                            id:user?.id,
                                            displayName:user?.data?.displayName,
                                            photoURL:user?.data?.photoURL,
                                            lastSeen:null,
                                            totalunseenMessages:null
                                          },
                                          myself:{
                                            id:user?.id,
                                            displayName:authUser?.displayName,
                                            photoURL:authUser?.photoURL,
                                            lastSeen:null,
                                            totalunseenMessages:null
                                          },
                                          timeStamp:{
                                            timeStamp:createTimestamp(),
                                            lastMessage:null,
                                          }
                                        })
                                        .then(load=>{
                                          console.log('sucess')
                                        })
                                      }
                                  })
                                  }
                              })

                            }
                        }
                        else{
                          console.log('not Exist')
                        }

                      }} >Add</p>}</div>
                  </div>
                  {/* <div><p style={{fontSize:"small",marginTop:"3px"}}>last messgae...</p></div> */}
              </div>
            </div> 
))
              }
               </>):
               (<>
            {rooms?.map((user)=>(
              <Leftfriend key={user?.id} id={user?.id} user={user?.data} />
            ))
              }
               </>)}
           </div>
        </div>
    )
}

export default LeftBar
