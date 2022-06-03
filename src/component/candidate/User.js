import React from 'react';
import './css/User.css';
import Link from '@material-ui/core/Link';


function User() {
  return (
    <div className='user__body'>    
        <div className='user__row'>
            <div className='username'>
            <h3>  <span className='name'> User Name</span><span className='user__edit'> <Link> Edit</Link></span></h3>
            <p className='email_id'><span>something@gmail.com</span></p>     
            </div>
            <hr/>
            </div>
            <div className='user__row'>
                <div className='discord'>
                    <h3> Discord ID</h3>
                    <p className='discor__id'>Userid#1234</p>
                </div>
                <hr/>
        </div>
    </div>
  )
}

export default User