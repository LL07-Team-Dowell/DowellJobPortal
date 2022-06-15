import React from 'react';
import './Search.css';
import {BsSearch, BsMic} from 'react-icons/bs';

function Search() {
  return (
    <div className='search__wrapper'>
        <div className='search__container'>
           <form>
                <input type='search' placeholder='Search by skill, job'/>
                <button type='submit'><BsSearch/></button>
                <button type='record'> <BsMic className='btn'/></button>
           </form>

        </div>
    </div>
  )
}

export default Search
