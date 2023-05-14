import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FaEye, FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';

export default function TeacherHome() {

  const [Teachers, setTeachers] = useState([]);
  const [Search, setSearch] = useState('');

  useEffect(() => {
    fetchTeachersInfo();
  }, [])

  const fetchTeachersInfo = async () => {
    await axios.get(`http://127.0.0.1:8000/api/teachers`).then(({ data }) => { setTeachers(data.teachers) })
  }

  const deleteTeacher = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/teachers/${id}`)
      .then(({ data }) => {
        alert('Teacher deleted successfully');
        fetchTeachersInfo();
      }).catch(({ data }) => {
        alert("Can't delete it because the teacher is related to subjects");
      })


  }
  return (
    <div className='flex flex-col gap-4 mx-auto w-fit'>
      <div className='h-fit flex justify-between'>
        <NavLink to={'/Teachers/create'} className="w-fit p-[6px] border border-transparent shadow-sm font-semibold text-sm rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">

          <span>Add new</span>
        </NavLink>
        <div className='flex gap-2 items-center'>
          <label>Search by name or number</label>
        <input type="search" className='border h-8 p-2 rounded-md outline-none focus:outline-none' placeholder='Search' onChange={(e) => { setSearch(e.target.value.toLowerCase()) }} />

        </div>
      </div>

      <div className=" max-w-full overflow-x-auto">
        <table className="min-w-[1060px] font-bold">
          <thead className="bg-[#F3F4F6] border-b text-mainBlue font-bold">
            <tr>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                N
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Name
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Birthday
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Address
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              Teachers.length > 0 && (

                Teachers.filter((item) => { return Search === '' ? item : isNaN(Search) ? item.name.toLowerCase().includes(Search) : (item.id == Search) ? item : '' }).map((Teacher, key) => (
                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-[#c7cedb]" key={Teacher.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{Teacher.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{Teacher.name}</td>
                    <td className="text-sm px-6 py-4 whitespace-nowrap">
                      {Teacher.birthday}
                    </td>
                    <td className="text-sm px-6 py-4 whitespace-nowrap">
                      {Teacher.address}
                    </td>

                    <td className="text-sm px-6 py-4 whitespace-nowrap">
                      <div className='flex gap-2'>

                        <NavLink to={`/Teachers/Update/${Teacher.id}`} title='edit'>
                          <FaEdit className='text-mainBlue cursor-pointer text-lg' />
                        </NavLink>

                        <RiDeleteBin5Fill className='text-red-600 cursor-pointer text-lg' title='delete' onClick={() => deleteTeacher(Teacher.id)} />
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

