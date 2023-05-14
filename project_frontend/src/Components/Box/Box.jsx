import { Link } from "react-router-dom";

export default function Box(props) {
    return (
        <Link to={props.link} className="group">
        <div className="flex flex-col items-center relative transition before:absolute before:w-0 before:duration-[400ms] before:ease-linear before:bg-[#3B82F6] before:h-[2px] before:left-0 before:-top-[1px] group-hover:before:w-1/2 after:absolute after:w-0 after:duration-[400ms] after:ease-linear after:bg-[#3B82F6] after:h-[2px] after:right-0 after:-top-[1px] group-hover:after:w-1/2 gap-2 py-8 border border-gray-300 font-semibold">
            <span className="text-4xl text-blue-500">{props.icon}</span>
            <p>{props.description}</p>
        </div>
        </Link>
    )
}
