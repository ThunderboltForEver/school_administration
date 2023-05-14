import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';

export default function Create() {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const createClass = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);

        await axios.post('http://127.0.0.1:8000/api/rows', formData)
            .then(({ data }) => {
                alert('Class added successfully');
                navigate('/Classes');
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

            <form className="max-w-[750px] mx-auto flex flex-col gap-4" onSubmit={createClass} >
        
                <div>
                    <label htmlFor="Class" className='text-mainBlue'>Class</label>
                    <input required placeholder="Enter class name" type={'text'} value={name} onChange={(e) => { setName(e.target.value) }} id="Class" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" />
                </div>
              

                <div className='flex justify-end'>
                    <button type={'submit'} className="py-2 px-4 border border-transparent shadow-sm font-bold rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">Add</button>
                </div>

            </form>

        </div >
    )
}
