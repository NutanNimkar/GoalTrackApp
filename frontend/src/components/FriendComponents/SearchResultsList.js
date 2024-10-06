import React from 'react'
import './SearchResultsList.css'
import { SearchResults } from './SearchResults'

export default function SearchResultsList({results}) {
  return (
    <div className='results-list'>
       {
        results.map((result, id) =>{
            return <SearchResults result = {result} key={id}/>
        })
       }
    </div>
  )
}
