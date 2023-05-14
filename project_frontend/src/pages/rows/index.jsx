import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';

export default function TeacherHome() {

  const [Names, setNames] = useState([]);

  useEffect(() => {
    fetchMarks();
  }, [])

  const fetchMarks = async () => {
    await axios.get(`http://127.0.0.1:8000/api/rows`).then(({ data }) => { setNames(data) })
  }

  const deleteMark = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/rows/${id}`)
      .then(({ data }) => {
        alert('Class deleted successfully');
        fetchMarks();
      }).catch(({ response: { data } }) => {
        alert("Can't delete the class because it's related to students");
      })

  }
  return (
    <div className='flex flex-col gap-4 mx-auto w-fit'>
      <NavLink to={'/Classes/create'} className="w-fit p-[6px] border border-transparent shadow-sm font-semibold text-sm rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">

        <span>Add new</span>
      </NavLink>
      <div className=" max-w-full overflow-x-auto">
        <table className="min-w-[1060px] font-bold">
          <thead className="bg-[#F3F4F6] border-b text-mainBlue font-bold">
            <tr>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                N
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Class
              </th>
            
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              Names.length > 0 && (

                Names.map((Mark, key) => (
                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-[#c7cedb]" key={Mark.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{Mark.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{Mark.name}</td>
                    

                    <td className="text-sm px-6 py-4 whitespace-nowrap">
                      <div className='flex gap-2'>

                        <NavLink to={`/Classes/Update/${Mark.id}`} title='edit'>
                          <FaEdit className='text-mainBlue cursor-pointer text-lg' />
                        </NavLink>

                        <RiDeleteBin5Fill className='text-red-600 cursor-pointer text-lg' title='delete' onClick={() => deleteMark(Mark.id)} />
                      </div>
                    </td>

                  </tr>
                ))
              )
            }

          </tbody>
        </table>
      </div>
    </div>




  )
}

