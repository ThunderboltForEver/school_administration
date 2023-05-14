import React from 'react'

export default function SuccessAlert(props) {
  return (
    <>
    <div className="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3" role="alert">
        <p className="text-sm">{props.message}</p>
    </div>
</>
  )
}
