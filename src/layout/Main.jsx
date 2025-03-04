import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Main = () => {
  return (
    <div>
      <div className="flex min-h-screen">
        <div className="fixed z-30 w-[200px] ">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className=" fixed xl:ml-[290px] lg:ml-[250px] md:ml-[200px] sm:ml-[120px] ml-[80px] lg:w-[60%] xl:w-[85%] 3xl:w-[90%] mx-auto z-30  sm:pl-5">
            <Header />
          </div>

          <div className="overflow-y-auto sm:ml-8 h-full flex-1 lg:pt-[50px] xl:pt-[70px] pt-[220px] lg:pl-[220px] xl:pl-[280px] md:pl-[170px] sm:pl-[90px] pl-[80px] md:mt-10 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
