import { IoIosPeople, IoMdPeople } from 'react-icons/io'
import { ImBooks } from 'react-icons/im';
import { SiGoogleclassroom } from 'react-icons/si';
import { Box } from '../Components/exports';
import { BsBarChartLine } from 'react-icons/bs';
import TotalBox from '../Components/TotalBox/TotalBox';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
    const [Students, setStudents] = useState('');
    const [Teachers, setTeachers] = useState('');
    const [Subjects, setSubjects] = useState('');
    const [Classes, setClasses] = useState('');

    useEffect(() => {
      StudentsNumbers();
      TeachersNumbers();
      SubjectsNumbers();
    }, [])
  
    const StudentsNumbers = async () => {
      await axios.get(`http://127.0.0.1:8000/api/students`).then(({ data }) => { setStudents(data.studentsNumbers)})
    }
    const TeachersNumbers = async () => {
      await axios.get(`http://127.0.0.1:8000/api/teachers`).then(({ data }) => { setTeachers(data.teachersNumbers)})
    }
    const SubjectsNumbers = async () => {
      await axios.get(`http://127.0.0.1:8000/api/subjects`).then(({ data }) => { setSubjects(data.subjectsNumbers)})
    }
    return (
       <div>
            <div className='grid grid-cols-3 max-[991px]:grid-cols-2 max-[991px]:gap-4 max-[550px]:grid-cols-1 gap-20 mb-10'>
                <TotalBox icon={<IoIosPeople/>} total={Students} description="Total students" />
                <TotalBox icon={<IoMdPeople />} total={Teachers} description="Total teachers" />
                <TotalBox icon={<ImBooks />} total={Subjects} description="Total subjects" />
            </div>

            <div className='grid grid-cols-2 xl:grid-cols-boxesGrid max-sm:grid-cols-1  text-lg gap-6 '>
                <Box icon={<IoIosPeople />} description="Manage students" link="/Students" />
                <Box icon={<IoMdPeople />} description="Manage Teachers" link="/Teachers" />
                <Box icon={<ImBooks />} description="Manage Subjects" link="/Subjects" />
                <Box icon={<SiGoogleclassroom />} description="Manage Classes" link="/Classes" />
                <Box icon={<BsBarChartLine/>} description="Manage Marks" link="/Marks" />

            </div>
            </div>
    )
}
