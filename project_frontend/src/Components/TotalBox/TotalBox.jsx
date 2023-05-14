import React from 'react'

export default function TotalBox(props) {
  return (
        <div className="flex items-center relative gap-8 px-8 border border-gray-300 font-semibold h-[180px] rounded-md">
            <div className={`flex justify-center items-center w-20 h-16 bg-yellow-400 text-white shadow-lg rounded-md text-[32px]`}>
                {props.icon}
            </div>
            <div>
              <div className='flex justify-center'>
                <span className="text-4xl text-blue-500">{props.total}</span>
              </div>
            
            <p >{props.description}</p>
            </div>
        </div>
  )
}
