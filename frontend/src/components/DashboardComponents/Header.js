import React from 'react'

const DBHeader = (page, groupName, userName) => {
  return (
    <>
    <div>
      <h1> Dashboard - `${page}`</h1>
    </div>
    <div> 
      {page == "Group" ? <span>Group Name: </span> : <span> User Name: </span>}
    </div>
    </>
  )
}

export default DBHeader