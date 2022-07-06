import React from 'react';
import './Search.css';
import { BsMic } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

function Search({ searchValue }) {
  return (
    <div className='search__wrapper'>
        <div className='search__container'>
           <form>
              <input type='search' placeholder='Search by skill, job' value={searchValue} />
              <button type='record' onSubmit={() => {}}> <BsMic className='btn'/></button>
              <button type='submit'><FiSearch/></button>
              
           </form>

        </div>
    </div>
  )
}

export default Search
