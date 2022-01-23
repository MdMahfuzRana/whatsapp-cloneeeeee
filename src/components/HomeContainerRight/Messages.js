import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player';
import { useStateValue } from '../../hooks/StateProvider';

function Messages({message,time,displayName}) {
  const [image, setimage] = useState(false);
  const [audio, setaudio] = useState(false);
  const [vedio, setvedio] = useState(false);
  const [text, settext] = useState(false);
  const [{authUser}]=useStateValue();
  const [sender, setsender] = useState(false);

  useEffect(() => {
    if(message){
      const chackMessages = message.split('.')
      if(chackMessages.length===2){
        if(chackMessages[1]==='jpg'){
          setimage(true)
        }
        else if(chackMessages[1]==='mp4'){
          setvedio(true)
        }
        else if(chackMessages[1]==='mp3'){
          setaudio(true)
        }
        else{
          settext(true)
        }
      }
      else{
        settext(true)
      }
    }
  if(displayName && authUser){
    if(displayName===authUser.displayName){
      setsender(true)
      console.log("true")
    }
  }
  }, [image,audio,vedio,text,sender,displayName,authUser]);
  
  return (
  <>

{ image?  
        (<div className='recieverrmessage'>
              <div className='iamge__container'>
                <div className='photo__header'>
                <p >{displayName}</p>
                <p>time</p>
                </div>
                <div className='image__background__photo'>
                  <img className='image__sent' src='https://images.pexels.com/photos/2567011/pexels-photo-2567011.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='' />
                </div>
              </div>
          </div>):null
          }
{text?       <div className={sender? 'recieverrmessage':'sendermessage'}>
              <div className={sender? 'text__container':'recievertext__container'}>
                <div className='photo__header'>
                  <p >{displayName}</p>
                  <p style={{fontSize:".7rem"}}>{moment(time).format('LLLL')}</p>
                </div>
                <div className='image__background__photo'>
                  <p>
                  {message}
                  </p>
                </div>
              </div>
          </div>:null
}
{vedio?         <div className='sendermessage'>
              <div className='recieveriamge__container'>
                <div className='photo__header'>
                <p >{displayName}</p>
                <p>time</p>
                </div>
                <ReactPlayer width='100%' height='100%' url='https://youtu.be/4yWLofNagy8' />
              </div>
          </div>:null
}
{audio?
          (<div className='sendermessage'>
              <div className='recievertext__container'>
                <div className='photo__header'>
                <p >{displayName}</p>
                <p>time</p>
                </div>
                <div className='image__background__photo'>
                <ReactAudioPlayer
                    src={''}
                    autoPlay
                    controls
                  />
                </div>
              </div>
          </div>):null
          }

  </>
  )
}

export default Messages;
