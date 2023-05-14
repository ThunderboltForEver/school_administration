import { FaBars, FaRegBell } from "react-icons/fa";

export default function Header() {

    let getSideBarStatus = false, sideBarAlias;

   function clickEventHandler() {
        getSideBarStatus = true;
        let getSideBar = document.querySelector(".sideBar");
        let getXmark = document.querySelector(".xmark");
        getXmark.onclick = (e) => {
            getSideBar.style =
                "left:-220px !important;box-shadow:none;";
            getSideBarStatus = true;
            if (getSideBar.classList.contains("sidebar-active")) {
                getSideBar.classList.remove("sidebar-active");
            }
        };
        sideBarAlias = getSideBar;
        getSideBar.style = "left:0px !important;";
        getSideBar.classList.add("sidebar-active");

        document.onclick = (e) => {
            if (getSideBar.classList.contains("sidebar-active")) {
                if (
                    !e.target.classList.contains("bar-item") &&
                    e.target.tagName !== "path" &&
                    !e.target.classList.contains("sideBar") &&
                    !e.target.classList.contains("brand")
                ) {
                    getSideBar.style =
                        "left:-220px !important;box-shadow:none;";
                    getSideBar.classList.remove("sidebar-active");
                    getSideBarStatus = true;
                }
            }
        };
    }
    window.addEventListener("resize", (e) => {
        if (getSideBarStatus === true) {
            if (e.target.innerWidth > 768) {
                sideBarAlias.style = "left:0px !important;"
            } else {
                sideBarAlias.style =
                    "left:-220px !important";
            }
        }

    })

    return (
        <div className=" h-16 bg-white p-4 flex justify-between items-center shadow-sm">

                <div className=" flex gap-4 items-center">
                    <FaBars className="bar-item hover:cursor-pointer md:hidden " onClick={clickEventHandler} />
                    <div className="relative font-bold text-gray-700">
                        <h1>School Administration System</h1>
                    </div>
                </div>
         
        </div>
    )
}