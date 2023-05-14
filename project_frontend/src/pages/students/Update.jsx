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
    const [image, setImage] = useState(null);
    const [fetch_class_id, setFetch_class_id] = useState('');
    const [classes,setClasses] = useState([]);
    let getStudentSelects = document.querySelectorAll('#class-select');
    useEffect(() => {
        fetchStudentInfo();
        fetchClasses();
    }, [])
    const fetchClasses = async () => {
        await axios.get('http://127.0.0.1:8000/api/rows').then(({data})=>{setClasses(data)})
    }
    const fetchStudentInfo = async () => {
        await axios.get(`http://127.0.0.1:8000/api/students/${id}`)
            .then(({ data }) => {
                const { name, birthday, address, class_id } = data.student;
                setName(name);
                setBirthday(birthday);
                setAddress(address);
                setFetch_class_id(class_id);
            }).catch(({ response: { data } }) => {
                alert(response.data.message);
            })

    }
    const changeHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const updateStudent = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('name', name);
        formData.append('birthday', birthday);
        formData.append('address', address);
        if (image !== null) {
            formData.append('image', image);
        }
        formData.append('class_id', fetch_class_id);

        await axios.post(`http://127.0.0.1:8000/api/students/${id}`, formData)
            .then(({ data }) => {
                alert('Student updated successfully');
                navigate('/students');
            }).catch(({ response }) => {
                if (response.status == 422) {
                    alert('Failed to update information');
                } else {
                    alert(response.data.message);
                }
            })

    }
    const setSelectValue = () => {
        getStudentSelects.forEach((item)=>{
            if(item.value == fetch_class_id) {
                item.setAttribute('selected','');
            }
        })
        
    }
    setSelectValue();
    return (
        <div>

            <form className="max-w-[750px] mx-auto flex flex-col gap-4" onSubmit={updateStudent} >

                <div>
                    <label htmlFor="name" className='text-mainBlue'>Name</label>
                    <input required type={'text'} value={name} onChange={(e) => { setName(e.target.value) }} id="name" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" />
                </div>
                <div>
                    <label htmlFor="Birthday" className='text-mainBlue'>Birthday</label>
                    <input required type={'date'} id="Birthday" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white text-gray-400 font-normal shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" value={birthday} onChange={(e) => { setBirthday(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="Address" className='text-mainBlue'>Address</label>
                    <input required type={'text'} id="Address" className="w-full rounded-md border border-gray-300 mt-2 py-2 px-2 bg-white placeholder:text-sm placeholder:font-normal placeholder:text-600 text-gray-600 shadow-sm focus:outline-none focus:ring-1 focus:ring-mainBlue focus:border-transparent" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="image" className='text-mainBlue'>Image</label>
                    <input type={'file'} id='image' className="block text-sm text-gray-400 font-normal mt-2 file:font-normal file:mr-2 file:py-2 file:px-2 file:rounded-md file:border-solid file:border file:border-gray-200 file:text-sm file:bg-white file:text-gray-400 hover:file:bg-gray-100" onChange={changeHandler} />
                </div>
                <div>
                    <select className="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" onChange={(e) => { setFetch_class_id(e.target.value) }} >
                        <option value="" >choose a student</option>

                        {

                            classes.length > 0 &&
                            (

                                classes.map((item, key) => (

                                    <option key={key} value={item.id} id={'class-select'}>{item.name}</option>

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
