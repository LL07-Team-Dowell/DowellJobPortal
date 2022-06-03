import React from 'react';
import SecondNavbar from '../SecondNavbar';
import './css/TaskScreen.css';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';



function TaskScreen() {
  return (
    <div className='taskScreen'>
        <SecondNavbar/>
        <div className='taskScreen__body'>
          <div className='taskScreen__row'>
            <h3 className='taskScreen__title'><span className='title'>Tasks details</span><span className='project'>Project: <span className='project__title'>Hr Hiring</span></span></h3>
            <hr/>
          </div>
          <div className='taskScreen__row'>
            <p className='taskScreen__task'><span className='task__content'>1. I will eat rice</span><span className='task__status'>Complete</span></p>
            <p className='date'><span className='given__date'>Given on 16-04-22</span><span className='status__date'>On 24-04-22</span></p>
            <hr/>
          </div>
          {/* start */}
          <div className='taskScreen__row'>
            <p className='taskScreen__task'><span className='task__content'>1. I will eat rice</span><span className='task__status'>Complete</span></p>
            <p className='date'><span className='given__date'>Given on 16-04-22</span><span className='status__date'>On 24-04-22</span></p>
            <hr/>
          </div>
          {/* end */}
          <IconContext.Provider value={{ color: '#838383', size:'27px', AiJustify:'center'}}>
          <div className='new__task'>
            <ul>
            <li> <AiIcons.AiOutlinePlusCircle/></li>
              <li className='add'>Add</li>
              
            </ul>
          </div>
          </IconContext.Provider>

        </div>
    </div>
  )
}

export default TaskScreen