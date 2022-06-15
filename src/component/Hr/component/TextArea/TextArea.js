import React, {useState} from 'react';
import './TextArea.css';

function TextArea({ show_discord}) {
    const [textarea, setTextarea] = useState("");
    
      const handleChange = (event) => {
        setTextarea(event.target.value)
      }
  return (
        <div className='form__container'>
            <div className='form__header'>
                <h3>{ show_discord ?  "Discord Link" : "Remarks" } <span>{show_discord ?  "": "(by hr)"}</span></h3>
            </div>
            <div className='form__body'>
            <form>
                <textarea className={ show_discord ? " textarea textarea__discord":"textarea textarea__remarks"} placeholder={show_discord ? "Add Discord link" : "Remarks given"} value={textarea} onChange={handleChange} />
            </form>
            </div>
        </div>
   
  )
}

export default TextArea