import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Update() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');

    useEffect(() => {
        fetchClasses();
    }, [])

    const fetchClasses = async () => {
        await axios.get(`http://127.0.0.1:8000/api/rows/${id}`)
            .then(({ data }) => {
                const { name } = data.row;
                setName(name);
            }).catch(({ response: { data } }) => {
                alert(response.data.message);
            })

    }
 

    const updateClass = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('name', name);

        await axios.post(`http://127.0.0.1:8000/api/rows/${id}`, formData)
            .then(({ data }) => {
                alert('Class updated successfully');
                navigate('/Classes');
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

            <form className="max-w-[750px] mx-auto flex flex-col gap-4" onSubmit={updateClass} >
              
                <div>
                    <label htmlFor="Name" className='text-mainBlue'>Name</label>
                    <input required type={'text'} id="Student" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>
                

                <div className='flex justify-end'>
                    <button type={'submit'} className="py-2 px-4 border border-transparent shadow-sm font-bold rounded-md text-white bg-mainBlue hover:bg-sky-700 focus:outline-none">Update</button>
                </div>

            </form>

        </div >
    )
}
