import React, {useRef, useState} from 'react';
import Button1 from './Buttons/Button1';
import Button3 from './Buttons/Button3';
import Button4 from './Buttons/Button4';
import './Status.css';



function Status() {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const [changeColor, setchangeColor] = useState(false);
    // const toggle =(ref)=>setchangeColor(!changeColor && ref );
    const toggle =(ref) =>{
        if (!ref.current) return;
        ref.current=setchangeColor(!changeColor);
    }

    
    
  return (
    <div className='status__container'>
        <h3>Status</h3>
        <div className='status__content'>
            <div 
                ref={ref1}
                tabIndex={0}
                role="button"
                onKeyDown={() => toggle(ref1)}
                onClick={()=> toggle(ref1)}
                className='first__button'>
                    <>{changeColor? <Button3/>  : <Button1/>}<p className={ changeColor? 'selected':''}>Selected</p></>        
            </div>
            <div 
                ref={ref2}
                tabIndex={0}
                role="button"
                onKeyDown={() => toggle(ref2)}
                onClick={()=> toggle(ref2)}
                className='second__button'>
                <>{changeColor? <Button4/>  : <Button1/>}<p className={ changeColor? 'rejected':''}>Rejected</p></>
            </div>
        </div>
    </div>
  )
}

export default Status