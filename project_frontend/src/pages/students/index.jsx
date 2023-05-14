import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import ErrorAlert from '../../Components/ErrorAlert/ErrorAlert';
import SuccessAlert from '../../Components/SuccessAlert/SuccessAlert';

export default function StudentHome() {

  const [students, setStudents] = useState([]);
  const [Classes, setClasses] = useState('');
  const [SelectValue, setSelectValue] = useState('');
  const [firstDate, setFirstDate] = useState('');
  const [secondDate, setSecondDate] = useState('');
  const [message, setMessage] = useState('');


  useEffect(() => {
    fetchStudentsInfo();
    getClasses();
  }, []);

  const fetchStudentsInfo = async () => {
    await axios.get(`http://127.0.0.1:8000/api/students`).then(({ data }) => { setStudents(data.students); })
  }
  const getClasses = async () => {
    await axios.get(`http://127.0.0.1:8000/api/students`).then(({ data }) => { setClasses(data.classes) })
  }

  const deleteStudent = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/students/${id}`)
      .then(({ data }) => {
        setMessage('Student deleted successfully');
        handleSuccess();
        fetchStudentsInfo();
      }).catch(({ data }) => {
        setMessage("Can't delete the student because it's related to marks table");
        handleError();
      })
  }
  const clearDates = (e) => {
    setSelectValue(e.target.value);
    document.getElementById('firstDate').value = "";
    document.getElementById('secondDate').value = "";
    setFirstDate(''); setSecondDate('')
  }
  const resetSelect = () => {
    let getOption = document.getElementById('defaultOption');

    setSelectValue('');

    if (getOption.hasAttributes('selected')) {
      getOption.removeAttribute('selected');
      getOption.setAttribute('selected', '');
    } else {
      getOption.setAttribute('selected', '');
    }

  }

  const handleError = () => {
    let getErrorAlert = document.getElementById('error-alert');
    getErrorAlert.classList.remove('hidden');

    setTimeout(() => {
      getErrorAlert.classList.add('hidden');
    }, 3000);

  }
  const handleSuccess = () => {
    let getSuccessAlert = document.getElementById('success-alert');
    getSuccessAlert.classList.remove('hidden');

    setTimeout(() => {
      getSuccessAlert.classList.add('hidden');
    }, 3000);
  }
  return (
    <div className='container flex flex-col gap-4 w-fit max-w-full mx-auto'>
      <div id='error-alert' className='hidden'>
        <ErrorAlert message={message} />
      </div>
      <div id='success-alert' className='hidden'>
        <SuccessAlert message={message} />
      </div>
      <div className='flex justify-between'>
        <NavLink to={'/Students/create'} className="w-fit p-[6px] self-center border border-transparent shadow-sm font-semibold text-sm rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">

          <span>Add new</span>
        </NavLink>
        <div>
          <div className='flex'>
            <div className='mr-4'>
              <span className='mr-2'>Filter by:</span>
              <select className="py-2 px-2 border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={clearDates} >
                <option value="" id='defaultOption' >All</option>
                {
                  Classes.length > 0 &&
                  (

                    Classes.map((Class, key) => (
                      <option key={key} value={Class.name}>{Class.name}</option>

                    ))

                  )
                }
              </select>
            </div>
            <div className='flex gap-4'>
              <span className='self-center'>Dates between</span>
              <input type="date" className='border rounded-md px-4' id='firstDate' onChange={(e) => { setFirstDate(e.target.value); resetSelect(); }} />
              <input type="date" className='border rounded-md px-4' id='secondDate' onChange={(e) => { setSecondDate(e.target.value); resetSelect(); }} />
            </div>

          </div>

        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="min-w-[1060px] max-w-full font-bold">
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
                Image
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

              students.length > 0 && (

                students.filter((item) => {
                  return SelectValue === '' && (firstDate === '' && secondDate === '') ? item : (firstDate !== '' && secondDate !== '') ? (item.birthday >= firstDate && item.birthday <= secondDate) ? item : (item.birthday <= firstDate && item.birthday >= secondDate) ? item : '' : item.className === (SelectValue)
                }).map((student) => (

                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-[#c7cedb]" key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{student.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{student.name}</td>
                    <td className="text-sm px-6 py-4 whitespace-nowrap">
                      {student.birthday}
                    </td>
                    <td className="text-sm px-6 py-4 whitespace-nowrap">
                      {student.address}
                    </td>
                    <td className="text-sm px-6 py-4 whitespace-nowrap">
                      <img src={`http://127.0.0.1:8000/storage/${student.image}`} alt="" className='w-12 h-12 rounded-[50%]' />

                    </td>
                    <td className="text-sm px-6 py-4 whitespace-nowrap">
                      {student.className}
                    </td>

                    <td className="text-sm px-6 py-4 whitespace-nowrap">
                      <div className='flex gap-2'>

                        <NavLink to={`/students/Update/${student.id}`} title='edit'>
                          <FaEdit className='text-mainBlue cursor-pointer text-lg' />
                        </NavLink>

                        <RiDeleteBin5Fill className='text-red-600 cursor-pointer text-lg' title='delete' onClick={() => deleteStudent(student.id)} />
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

