import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';

export default function Create() {
    const navigate = useNavigate();
    const [mark, setMark] = useState('');
    const [student_id, setStudent_id] = useState('');
    const [subject_id, setSubject_id] = useState('');
    const [student, setStudent] = useState('');
    const [subject, setSubject] = useState('');
    const [students, setStudents] = useState([]);
    const [subjects,setSubjects] = useState([]);

    useEffect(()=>{
        getStudents();
        getSubjects();
    },[])
    useEffect(()=>{
        setters();
    },[student && subject])
    const getStudents = async () => {
        await axios.get('http://127.0.0.1:8000/api/students').then(({ data }) => { setStudents(data.students); })
    }
    const getSubjects = async () => {
        await axios.get('http://127.0.0.1:8000/api/subjects').then(({data})=>{setSubjects(data.subjects)})
    }

    const setters = () => {
        students.map((item)=> {
            if(item.name === student){
                setStudent_id(item.id);
            }
        })
        subjects.map((item)=> {
            if(item.name === subject){
                setSubject_id(item.id);
            }
        })
    }
    const createMark = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('student_id',student_id);
        formData.append('subject_id',subject_id);
        formData.append('mark', mark);

        await axios.post('http://127.0.0.1:8000/api/marks', formData)
            .then(({ data }) => {
                alert('Mark added successfully');
                navigate('/Marks');
            }).catch(({ response }) => {
                if (response.status == 422) {
                    alert('Failed to add information');
                } else {
                    alert(response.data.message);
                }
            })

    }
    return (
        <div>

            <form className="max-w-[750px] mx-auto flex flex-col gap-4" onSubmit={createMark} >
                <div>
                    <label htmlFor="Marks" className='text-mainBlue'>Mark</label>
                    <input required type={'number'} min='1' max='100' id="Marks" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white text-gray-400 font-normal shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" placeholder='Enter student mark' value={mark} onChange={(e) => { setMark(e.target.value) }} />
                </div>
                <div>
                    <select className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e) => { setStudent(e.target.value) }} >
                        <option value="" >choose a student</option>

                        {

                            students.length > 0 &&
                            (

                                students.map((student, key) => (
                                    
                                    <option key={key} value={student.name}>{student.name}</option>

                                ))

                            )


                        }
                    </select>
                </div>
                <div>
                    <select className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e) => { setSubject(e.target.value) }} >
                        <option value="" >choose a subject</option>

                        {

                            subjects.length > 0 &&
                            (

                                subjects.map((subject, key) => (
                                    <option key={key} value={subject.name}>{subject.name}</option>

                                ))

                            )


                        }
                    </select>
                </div>

                <div className='flex justify-end'>
                    <button type={'submit'} className="py-2 px-4 border border-transparent shadow-sm font-bold rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">Add</button>
                </div>

            </form>

        </div >
    )
}
