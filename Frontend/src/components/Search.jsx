import React, { useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { toogleSearch } from '../utils/slice/searchSlice'
import { setSearchQuery } from '../utils/slice/searchQuerySlice'

function Search() {

    const {showSearch} = useSelector(slice => slice.toogleSearch)
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')

    useEffect(()=>{
        dispatch(setSearchQuery(search))
    },[search])

            
  return showSearch ?(
    <div className='border-t border-b bg-white text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:1/2'>
            <input onChange={(e)=> setSearch(e.target.value)} value={search} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
               <IoIosSearch className='text-xl cursor-pointer'/>
        </div>
        <IoClose className='inline cursor-pointer text-xl' onClick={()=> dispatch(toogleSearch(false))} />
    </div>
  ) : null
}

export default Search