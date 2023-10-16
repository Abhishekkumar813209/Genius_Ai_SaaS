import Navbar from "@/components/navbar";
<<<<<<< HEAD
import Sidebar from "@/components/sidebar"
=======
>>>>>>> master

const DashboardLayout = ({
    children
}:{
    children:React.ReactNode;
<<<<<<< HEAD
}

) => {
    return ( 
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
              <Sidebar />
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
     );
=======
}) => {
    return ( 
    <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72
        md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900
        ">
            <div>
                Hello Sidebar
            </div>
        </div>
        <main className="md:pl-72">
            <Navbar />
        {children}
        </main>
    </div> 
    );
>>>>>>> master
}
 
export default DashboardLayout;