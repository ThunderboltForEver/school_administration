import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';




export default function TeacherHome() {

  const [Marks, setMarks] = useState([]);
  const [Subjects, setSubjects] = useState([]);
  const [Students, setStudents] = useState([]);
  const [Subject, setSubject] = useState('');
  const [Student, setStudent] = useState('');
  const [StudentState, setStudentState] = useState('');
  const [SuccessedSubjects, setSuccessedSubjects] = useState([]);
  const [bestTeacher, setBestTeacher] = useState('');



  useEffect(() => {
    fetchMarks();
    getSubjects();
    getStudents();
  }, []);

  useEffect(() => {
    setSuccessedSubjects(Marks.filter((item) => { return (item.mark >= 50) ? item : '' }).map(item => { return item.subject }));
  }, [Marks]);

  useEffect(() => {
    getBestTeacher()
  }, [SuccessedSubjects])
console.log(SuccessedSubjects)
  const fetchMarks = async () => {
    await axios.get(`http://127.0.0.1:8000/api/marks`).then(({ data }) => { setMarks(data.marks) })
  }
  const getSubjects = async () => {
    await axios.get(`http://127.0.0.1:8000/api/subjects`).then(({ data }) => { setSubjects(data.subjects) })
  }
  const getStudents = async () => {
    await axios.get(`http://127.0.0.1:8000/api/students`).then(({ data }) => { setStudents(data.students) })
  }
  const deleteMark = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/marks/${id}`)
      .then(({ data }) => {
        alert('Mark deleted successfully');
        fetchMarks();
        getBestTeacher();
      }).catch(({ response: { data } }) => {
        alert('Faild To delete');
      })

  }
  const resetStudentAndState = (e) => {
    let getStudentOption = document.getElementById('studentDefaultOption')
    let getStateOption = document.getElementById('stateDefaultOption')
    getStudentOption.setAttribute('selected', '');
    getStateOption.setAttribute('selected', '');

    if (getStudentOption.hasAttribute('selected')) {
      getStudentOption.removeAttribute('selected');
      getStudentOption.setAttribute('selected', '');
    }
    if (getStateOption.hasAttribute('selected')) {
      getStateOption.removeAttribute('selected');
      getStateOption.setAttribute('selected', '');
    }
    setSubject(e.target.value);
    setStudent('');
    setStudentState('');
  }
  const resetSubjectAndState = (e) => {
    let getSubjectOption = document.getElementById('subjectDefaultOption')
    let getStateOption = document.getElementById('stateDefaultOption')
    getSubjectOption.setAttribute('selected', '');
    getStateOption.setAttribute('selected', '');

    if (getSubjectOption.hasAttribute('selected')) {
      getSubjectOption.removeAttribute('selected');
      getSubjectOption.setAttribute('selected', '');
    }
    if (getStateOption.hasAttribute('selected')) {
      getStateOption.removeAttribute('selected');
      getStateOption.setAttribute('selected', '');
    }
    setStudent(e.target.value)
    setSubject('');
    setStudentState('');
  }
  const resetSubjectAndStudent = (e) => {
    let getSubjectOption = document.getElementById('subjectDefaultOption')
    let getStudentOption = document.getElementById('studentDefaultOption')
    getSubjectOption.setAttribute('selected', '');
    getStudentOption.setAttribute('selected', '');

    if (getSubjectOption.hasAttribute('selected')) {
      getSubjectOption.removeAttribute('selected');
      getSubjectOption.setAttribute('selected', '');
    }
    if (getStudentOption.hasAttribute('selected')) {
      getStudentOption.removeAttribute('selected');
      getStudentOption.setAttribute('selected', '');
    }
    setStudentState(e.target.value);
    setStudent('');
    setSubject('');
  }
  const getBestTeacher = () => {
    console.log(Subjects)
    let counter = 0;
    let successCounter = 0;
    let bestSubject = '';
    Subjects.map((item) => {
      SuccessedSubjects.map((success => {
        if (item.name == success) {
          counter++;
        }
      }))
      if (successCounter < counter) {
        successCounter = counter;

        bestSubject = item.name;
        Subjects.map(subject => { return subject.name === bestSubject ? setBestTeacher(subject.teacher) : '' })
        
      } else if (successCounter === counter) {
        setBestTeacher('')
      }
      counter = 0;

    })
  }
  return (
    <div className='flex flex-col gap-4 mx-auto w-fit'>
      <div className='flex justify-between'>
        <NavLink to={'/Marks/create'} className="w-fit p-[6px] self-center border border-transparent shadow-sm font-semibold text-sm rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">

          <span>Add new</span>
        </NavLink>
        <div className='bg-mainGray text-orange-800 flex items-center  rounded-md px-2'>

          <span>{bestTeacher == '' ? "No best teacher" : "Best teacher is " + bestTeacher.charAt(0).toUpperCase() + bestTeacher.slice(1)}</span>
        </div>
        <div className='flex'>
          <div className='flex items-center gap-4'>
            <span className='mr-2'>Filter by:</span>
            <select className="py-2 px-2 border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" id='subject' onChange={resetStudentAndState}>
              <option value="" id='subjectDefaultOption' >select subject</option>

              {

                Subjects.length > 0 &&
                (

                  Subjects.map((subject, key) => (
                    <option key={key} value={subject.name}>{subject.name}</option>

                  ))

                )


              }
            </select>
            <select className="py-2 px-2 border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" id='student' onChange={resetSubjectAndState}>
              <option value="" id='studentDefaultOption'  >select student</option>

              {

                Students.length > 0 &&
                (

                  Students.map((student, key) => (
                    <option key={key} value={student.name}>{student.name}</option>

                  ))

                )


              }
            </select>
            <select className="py-2 px-2 border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" id='state' onChange={resetSubjectAndStudent}>
              <option value="" id='stateDefaultOption'>All</option>
              <option value="passed">passed</option>
              <option value="failed">failed</option>
            </select>
          </div>
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
                Mark
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Student
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Subject
              </th>
              <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              Marks.length > 0 && (

                Marks.filter((item) => {
                  return (Subject === '' && Student === '' && StudentState === '') ?
                    item : (Subject !== '' && Student === '' && StudentState === '') ?
                      item.subject === Subject : (Subject === '' && Student !== '' && StudentState === '') ?
                        item.student === Student : (Subject === '' && Student === '' && StudentState !== '') ?
                          (StudentState === 'passed') ? item.mark >= 50 : item.mark < 50 : '';
                }).map((Mark, key) => (
                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-[#c7cedb]" key={Mark.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{Mark.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{Mark.mark}</td>
                    <td className="text-sm px-6 py-4 whitespace-nowrap">
                      {Mark.student}
                    </td>
                    <td className="text-sm px-6 py-4 whitespace-nowrap">
                      {Mark.subject}
                    </td>

                    <td className="text-sm px-6 py-4 whitespace-nowrap">
                      <div className='flex gap-2'>

                        <NavLink to={`/Marks/Update/${Mark.id}`} title='edit'>
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

