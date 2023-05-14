import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainSections from './Components/Sections/MainSections'
import { Home } from './pages/index'
import { StudentHome } from './pages/index'
import { Create, Update } from './pages/students/exports'
import { CreateTeacher, UpdateTeacher, TeachersHome } from './pages/teachers/exports';
import { CreateSubject, UpdateSubject, SubjectsHome } from './pages/subjects/exports';
import { CreateMark, MarksIndex, UpdateMark } from './pages/marks/exports'
import { ClassHome, CreateClass, UpdateClass } from './pages/rows/exports'

export default function App() {
    return (
        <BrowserRouter>
            <MainSections>
                <Routes>
                    
                    <Route path='/' element={<Home />} />
                    <Route path='/Students' element={<StudentHome />} />
                    <Route path='/Students/create' element={<Create />} />
                    <Route path='/Students/update/:id' element={<Update />} />
                    <Route path='/Teachers' element={<TeachersHome />} />
                    <Route path='/Teachers/create' element={<CreateTeacher />} />
                    <Route path='/Teachers/update/:id' element={<UpdateTeacher />} />
                    <Route path='/Subjects' element={<SubjectsHome />} />
                    <Route path='/Subjects/create' element={<CreateSubject />} />
                    <Route path='/Subjects/update/:id' element={<UpdateSubject />} />
                    <Route path='/Classes' element={<ClassHome />} />
                    <Route path='/Classes/create' element={<CreateClass />} />
                    <Route path='/Classes/update/:id' element={<UpdateClass />} />
                    <Route path='/Marks' element={<MarksIndex />}/>
                    <Route path='/Marks/create' element={<CreateMark />}/>
                    <Route path='/Marks/update/:id' element={<UpdateMark />}/>
   

                </Routes>
            </MainSections>
        </BrowserRouter>


    )
}

