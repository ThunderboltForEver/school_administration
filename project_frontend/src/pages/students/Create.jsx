import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import SuccessAlert from '../../Components/SuccessAlert/SuccessAlert';
import ErrorAlert from '../../Components/ErrorAlert/ErrorAlert';

export default function Create() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [Classes, setClasses] = useState([]);
    const [class_id, setClass_id] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        getClasses();
    }, []);
    useEffect(() => {
        setters();
    }, [selectValue, Classes]);


    const changeHandler = (e) => {
        setImage(e.target.files[0]);
    }
    const getClasses = async () => {
        await axios.get(`http://127.0.0.1:8000/api/rows`).then(({ data }) => { setClasses(data) })
    }
    const setters = () => {
        Classes.map((item) => {
            if (item.name === selectValue) {
                setClass_id(item.id);
            }
        })
    }
    const createStudent = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('birthday', birthday);
        formData.append('address', address);
        formData.append('image', image);
        formData.append('class_id', class_id);
        if (class_id === '') {
            alert('Choose a class');
        } else {
            await axios.post('http://127.0.0.1:8000/api/students', formData)
                .then(({ data }) => {
                    setMessage('Student added successfully');
                    handleSuccessMessage();
                }).catch(({ response }) => {
                    if (response.status == 422) {
                        setMessage('Failed to add information');
                        handleErrorMessage();
                    } else {
                        alert(response.data.message);
                    }
                })
        }


    }
    const handleSuccessMessage = () => {
        let getSuccessAlert = document.getElementById('success-alert');
        getSuccessAlert.classList.remove('hidden');

        setTimeout(() => {
            navigate('/students');
        }, 3000);
    }
    const handleErrorMessage = () => {
        let getErrorAlert = document.getElementById('error-alert');
        getErrorAlert.classList.remove('hidden');

        setTimeout(() => {
            getErrorAlert.classList.add('hidden');
        }, 3000);

    }
    return (
        <div className='max-w-[750px] mx-auto'>
            <div id='success-alert' className='hidden'>
                <SuccessAlert message={message} />
            </div>
            <div id='error-alert' className='hidden'>
                <ErrorAlert message={message} />
            </div>
            <form className="flex flex-col gap-4" onSubmit={createStudent} >
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
                <div>
                    <label htmlFor="image" className='text-mainBlue'>Image</label>
                    <input type={'file'} id='image' className="block text-sm text-gray-400 font-normal mt-2 file:font-normal file:mr-2 file:py-2 file:px-2 file:rounded-md file:border-solid file:border file:border-gray-200 file:text-sm file:bg-white file:text-gray-400 hover:file:bg-gray-100" onChange={changeHandler} />
                </div>
                <div>
                    <select className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e) => { setSelectValue(e.target.value) }} >
                        <option value="" >choose a class</option>


                        {

                            Classes.length > 0 &&
                            (

                                Classes.map((item, key) => (

                                    <option key={key} value={item.name}>{item.name}</option>

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
