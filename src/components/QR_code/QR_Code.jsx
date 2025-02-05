import React, { useEffect, useState } from 'react'
import './qr.css'

const QR_Code = () => {
    const [ temp, setTemp ] = useState("");
    const [ word, setWord ] = useState("");
    const [ bgColor, setBgColor ] = useState("fffff");
    const [ size, setSize ] = useState(400);
    const [ qrCode, setQrCode] = useState("");
    
    useEffect(()=>{
        setQrCode(`http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}&bgcolor=${bgColor}`)
    },[word, size, bgColor])

    const handleClick = () =>{
        setWord(temp);
    }
    
  return (
    <>
        <div className='App'>
            <h2>QR_Code Generator</h2>
            <div className='input-box'>
                <div className='gen'>
                    <input type='text' placeholder='Eneter Text to encode' onChange={(e)=>{setTemp(e.target.value)}} />
                    <button className='button' onClick={handleClick}>Generate</button>
                </div>
                <div className='extra'>
                    <h2>Background Color:</h2>
                    <input type='color' onChange={(e)=>{setBgColor(e.target.value.substring(1))}} />
                    <h5>Dimension:</h5>
                    <input type='range' min="200" max="600" value={size} onChange={(e)=>{setSize(e.target.value)}} />
                </div>
            </div>
            <div className='output-box'>
                <img src={qrCode} alt='qr' />
                <a href={qrCode} download="QRCode">
                    <button type='button'>Download</button>
                </a>
            </div>
        </div>
    </>
  )
}

export default QR_Code