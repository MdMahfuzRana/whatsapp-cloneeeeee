import React from 'react'
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
import { auth, db, provider } from '../../config/FirebaseConfig/Firebase'
import { useNavigate  } from 'react-router-dom'


function LeftBar({avatar}) {
    const [{publicUsers},dispatch] = useStateValue()
    const history = useNavigate();
    return (
        <div className='leftbar__main__container'>
           <div className='leftbar__header__containaer'>
               <div className='avatar__cotnainer'>
                   <IconButton>
                     <Avatar onClick={()=>{auth.signOut();history("/")}} src={avatar} alt="" />
                   </IconButton>
               </div>
               <div className='iconcontainer'>
                   <IconButton>
                        <DonutLargeIcon />
                   </IconButton>
                   <IconButton>
                        <MessageIcon />
                   </IconButton>
                   <IconButton>
                        <MoreVertIcon />
                   </IconButton>
               </div>
            </div> 
           <div className='leftbar__search__container'>
               <div className='search__container'>
                    <SearchIcon />
                    <Inputer text={"Search your friends"} />
               </div>
           </div>
           <div className='people__container'>
{publicUsers?.map((user)=>(
              <div key={user?.id} onClick={()=>{
                  if(user){
                      dispatch({
                          type:actionTypes.SET__FRIEND,
                          friend:user
                      })
                  }
              }} className='people__container__self'> 
              <div style={{width:"fit-content",display:'flex',justifyContent:"center",alignItems:"center"}}><Avatar src={user?.data.photoURL} /></div>
              <div className='people__container__second'>
                  <div className='people__container__time__and__user'>
                      <div><p style={{fontSize:".9rem",fontWeight:"bold"}}>{user?.data.displayName}</p></div>
                      <div><p>time</p></div>
                  </div>
                  <div><p style={{fontSize:"small",marginTop:"3px"}}>last messgae...</p></div>
              </div>
            </div> 

))
              }
           </div>
        </div>
    )
}

export default LeftBar
