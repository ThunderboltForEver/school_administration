import { Sidebar ,Header } from "../exports"

export default function MainSections(props) {
    return (
        <div className="flex md:grid md:grid-cols-mainGrid h-screen">
            <div className="min-h-full relative" >
                <Sidebar />
            </div>


            <div className="flex-1">
                <Header />
                <div className="p-8 overflow-x-auto">
                    {props.children}
                </div>
                
            </div>
        </div>
    )
}
