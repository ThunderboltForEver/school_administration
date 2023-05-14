import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Update() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [teacher_id, setTeacher_id] = useState('');
    const [teachers,setTeachers] = useState('');

    useEffect(() => {
        fetchSubjectsInfo();
        getTeachers();
    }, [])

    const fetchSubjectsInfo = async () => {
        await axios.get(`http://127.0.0.1:8000/api/subjects/${id}`)
            .then(({ data }) => {
                const { name, teacher_id } = data.subject;
                setName(name);
                setTeacher_id(teacher_id);
            }).catch(({ response: { data } }) => {
                alert(response.data.message);
            })

    }
 
console.log
    const updateSubject = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('name', name);
        formData.append('teacher_id', teacher_id)

        await axios.post(`http://127.0.0.1:8000/api/subjects/${id}`, formData)
            .then(({ data }) => {
                alert('Subject updated successfully');
                navigate('/Subjects');
            }).catch(({ response }) => {
                if (response.status == 422) {
                    alert('Failed to update information');
                } else {
                    alert(response.data.message);
                }
            })

    }
    const getTeachers = async () => {
        await axios.get('http://127.0.0.1:8000/api/teachers').then(({ data }) => { setTeachers(data.teachers); })
    }
    return (
        <div>

            <form className="max-w-[750px] mx-auto flex flex-col gap-4" onSubmit={updateSubject} >
                <div>
                    <label htmlFor="name" className='text-mainBlue'>Name</label>
                    <input required placeholder="Enter student name" type={'text'} value={name} onChange={(e) => { setName(e.target.value) }} id="name" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" />
                </div>
                <div>
                    <select className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e) => { setTeacher_id(e.target.value) }} >
                        <option value="" >choose a teacher</option>

                        {

                            teachers.length > 0 &&
                            (

                                teachers.map((teacher, key) => (
                                    
                                    <option key={key} value={teacher.id} id={'teacher-id'}>{teacher.name}</option>

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
