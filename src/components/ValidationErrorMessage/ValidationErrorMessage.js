import React from 'react'

export const ValidationErrorMessage = (props) => {
  return (
    <> 
    {props.touched && <p className=" mb-1 text-danger" style={{color:"red"}}>{props.message}</p>}
</>
  )
}
