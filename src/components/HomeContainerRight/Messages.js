import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
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
      const chackMessages = message.split('?')
      const findFormate = chackMessages[0].split('.')
      if(findFormate){
        let length = findFormate.length
        if(findFormate[length-1]==='jpg'){
          setimage(true)
        }
        else if(findFormate[length-1]==='mp4'){
          setvedio(true)
        }
        else if(findFormate[length-1]==='jpeg'){
          setimage(true)
        }
        else if(findFormate[length-1]==='png'){
          setimage(true)
        }
        else if(findFormate[length-1]==='mp3'){
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
    }
  }
  }, [image,audio,vedio,text,sender,displayName,authUser,message]);
  
  return (
  <>

{ image?  
        (<div className={sender? 'recieverrmessage':'sendermessage'}>
              <div className='iamge__container'>
                <div className='photo__header'>
                <p >{displayName}</p>
                <p>{moment(time).format('LLLL')}</p>
                </div>
                <div className='image__background__photo'>
                  <img className='image__sent' src={message} alt='' />
                </div>
              </div>
          </div>):null
          }
{text?       <div className={sender? 'recieverrmessage':'sendermessage'}>
              <div className={sender? 'text__container':'recievertext__container'}>
                <div className='photo__header'>
                  <p className='name__in__text'>{displayName}</p>
                  <p className='date__in__text'>{moment(time).format('LLL')}</p>
                </div>
                <div className='image__background__photo'>
                  <p className='message__in__text'>
                  {message}
                  </p>
                </div>
              </div>
          </div>:null
}
{vedio?         <div className={sender? 'recieverrmessage':'sendermessage'}>
              <div className='recieveriamge__container'>
                <div className='photo__header'>
                <p >{displayName}</p>
                <p>time</p>
                </div>
                <ReactPlayer width='100%' height='100%' url={message} />
              </div>
          </div>:null
}
{audio?
          (<div className={sender? 'recieverrmessage':'sendermessage'}>
              <div className='recievertext__container'>
                <div className='photo__header'>
                <p >{displayName}</p>
                <p>time</p>
                </div>
                <div className='image__background__photo'>
                <ReactAudioPlayer
                    src={message}
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
