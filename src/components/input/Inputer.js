import React, { useState } from 'react'
import './Inputer.css'

function Inputer(text) {
    const [inputText, setinputText] = useState("")
    return (
        <>
         <input className='inputContent' onChange={(e)=>{setinputText(e.target.value)}} type="text" placeholder={text.text} />
        </>
    )
}
export default Inputer
