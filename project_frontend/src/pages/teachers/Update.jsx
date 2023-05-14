import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Update() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        fetchTeachersInfo();
    }, [])

    const fetchTeachersInfo = async () => {
        await axios.get(`http://127.0.0.1:8000/api/teachers/${id}`)
            .then(({ data }) => {
                const { name, birthday, address } = data.teacher;
                setName(name);
                setBirthday(birthday);
                setAddress(address);
            }).catch(({ response: { data } }) => {
                alert(response.data.message);
            })

    }
 

    const updateTeacher = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('name', name);
        formData.append('birthday', birthday);
        formData.append('address', address);

        await axios.post(`http://127.0.0.1:8000/api/teachers/${id}`, formData)
            .then(({ data }) => {
                alert('Teacher updated successfully');
                navigate('/Teachers');
            }).catch(({ response }) => {
                if (response.status == 422) {
                    alert('Failed to update information');
                } else {
                    alert(response.data.message);
                }
            })

    }
    return (
        <div>

            <form className="max-w-[750px] mx-auto flex flex-col gap-4" onSubmit={updateTeacher} >
                <div>
                    <label htmlFor="name" className='text-mainBlue'>Name</label>
                    <input required placeholder="Enter student name" type={'text'} value={name} onChange={(e) => { setName(e.target.value) }} id="name" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" />
                </div>
                <div>
                    <label htmlFor="Birthday" className='text-mainBlue'>Birthday</label>
                    <input required type={'date'} id="Birthday" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white text-gray-400 font-normal shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" value={birthday} onChange={(e) => { setBirthday(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="Address" className='text-mainBlue'>Address</label>
                    <input required type={'text'} id="Address" placeholder='Enter student address' className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                </div>

                <div className='flex justify-end'>
                    <button type={'submit'} className="py-2 px-4 border border-transparent shadow-sm font-bold rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">Update</button>
                </div>

            </form>

        </div >
    )
}
