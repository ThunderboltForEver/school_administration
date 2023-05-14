import { HiX } from "react-icons/hi";
import { FaUniversity } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { VscHome } from 'react-icons/vsc';
import { IoIosPeople, IoMdPeople } from 'react-icons/io';
import { SiGoogleclassroom } from 'react-icons/si';
import { BsBarChartLine } from "react-icons/bs";
import { ImBooks } from "react-icons/im";

export default function Sidebar() {



    return (
        <nav className="sideBar max-[640px]:shadow-md font-semibold text-[15px] bg-mainGray pl-5 max-[767px]:pr-3 pt-3 absolute md:relative z-50 min-w-[220px] h-full left-[-220px] duration-500 md:left-[0] max-w-[220px]">
            <div className="brand h-12 font-bold flex flex-col items-center">
                <HiX className="xmark md:hidden absolute left-4 top-6 hover:cursor-pointer" />
                <FaUniversity className="text-xl translate-y-4 text-secondaryGray" />
            </div>
            <ul className="mt-4">
                <li className="rounded-[5px] mb-1">

                    <NavLink to={"/"} className="flex items-center w-full p-3">
                        <VscHome />
                        <span className="ml-2">Home</span>
                    </NavLink>
                </li>

                <li className="rounded-[5px] mb-1">
                    <NavLink to={"/Students"} className="flex items-center w-full p-3">
                        <IoIosPeople />
                        <span className="ml-2">Students</span>
                    </NavLink>
                </li>

                <li className="rounded-[5px] mb-1">
                    <NavLink to={"/Teachers"} className="flex items-center w-full p-3">
                        <IoMdPeople /><span className="ml-2">Teachers</span>
                    </NavLink>
                </li>
                <li className="rounded-[5px] mb-1">
                    <NavLink to={"/Subjects"} className="flex items-center w-full p-3">
                    <ImBooks /><span className="ml-2">Subjects</span>
                    </NavLink>
                </li>

                <li className="rounded-[5px] mb-1">
                    <NavLink to={"/Classes"} className="flex items-center w-full p-3">
                        <SiGoogleclassroom /><span className="ml-2">Classes</span>
                    </NavLink>
                </li>

                <li className="rounded-[5px] mb-1">
                    <NavLink to={"/Marks"} className="flex items-center w-full p-3">
                    <BsBarChartLine/><span className="ml-2">Marks</span>
                    </NavLink>
                </li>


            </ul>
        </nav>

    )
}
