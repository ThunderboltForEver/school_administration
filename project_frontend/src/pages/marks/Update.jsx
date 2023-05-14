import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Update() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [mark, setMark] = useState('');
    const [students,setStudents] = useState([]);
    const [subjects,setSubjects] = useState([]);
    const [fetch_student_id,setFetch_student_id] = useState('');
    const [fetch_subject_id,setFetch_subject_id] = useState('');
    let getStudentSelects = document.querySelectorAll('#student-id');
    let getSubjectSelects = document.querySelectorAll('#subject-id');
    useEffect(() => {
        fetchMarks();
        getStudents();
        getSubjects();
     
    }, [])

    const fetchMarks = async () => {
        await axios.get(`http://127.0.0.1:8000/api/marks/${id}`)
            .then(({ data }) => {
                const { mark, student_id, subject_id } = data.mark;
               
                setMark(mark);
                setFetch_student_id(student_id);
                setFetch_subject_id(subject_id);
            }).catch(({ response: { data } }) => {
                alert(response.data.message);
            })

    }
 

    const updateMark = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('mark', mark);
        formData.append('student_id', fetch_student_id);
        formData.append('subject_id', fetch_subject_id);

        await axios.post(`http://127.0.0.1:8000/api/marks/${id}`, formData)
            .then(({ data }) => {
                alert('Mark updated successfully');
                navigate('/Marks');
            }).catch(({ response }) => {
                if (response.status == 422) {
                    alert('Failed to update information');
                } else {
                    alert(response.data.message);
                }
            })

    }
    const getStudents = async () => {
        await axios.get('http://127.0.0.1:8000/api/students').then(({ data }) => { setStudents(data.students); })
    }
    const getSubjects = async () => {
        await axios.get('http://127.0.0.1:8000/api/subjects').then(({data})=>{setSubjects(data.subjects)})
    }
    const setSelectValue = () => {
        getStudentSelects.forEach((item)=>{
            console.log(item.value , fetch_student_id)
            if(item.value == fetch_student_id) {
                item.setAttribute('selected','');
            }
        })
        getSubjectSelects.forEach((item)=>{
            if(item.value == fetch_subject_id) {
                item.setAttribute('selected','');
            }
        })
    }
    setSelectValue();
    return (
        <div>

            <form className="max-w-[750px] mx-auto flex flex-col gap-4" onSubmit={updateMark} >
                <div>
                    <label htmlFor="mark" className='text-mainBlue'>Mark</label>
                    <input required placeholder="Enter student mark" type={'number'} min={'1'} max={'100'} value={mark} onChange={(e) => { setMark(e.target.value) }} id="name" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" />
                </div>
                <div>
                    <select className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e) => { setFetch_student_id(e.target.value) }} >
                        <option value="" >choose a student</option>

                        {

                            students.length > 0 &&
                            (

                                students.map((student, key) => (
                                    
                                    <option key={key} value={student.id} id={'student-id'}>{student.name}</option>

                                ))

                            )


                        }
                    </select>
                </div>
                <div>
                    <select className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e) => { setFetch_subject_id(e.target.value) }} >
                        <option value="" >choose a subject</option>

                        {

                            subjects.length > 0 &&
                            (

                                subjects.map((subject, key) => (
                                    <option key={key} value={subject.id} id={'subject-id'}>{subject.name}</option>

                                ))

                            )


                        }
                    </select>
                </div>

                <div className='flex justify-end'>
                    <button type={'submit'} className="py-2 px-4 border border-transparent shadow-sm font-bold rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">Update</button>
                </div>

            </form>

        </div >
    )
}
