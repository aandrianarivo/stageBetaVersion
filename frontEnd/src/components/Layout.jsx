import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import Header from "./Header"; // Importez le composant Header

function Layout() {
  return (
    <>
      <div className="d-flex">
          <div className="col-lg-2 p-0 bg-light ">
            <SideMenu />
          </div>
          <div className="col-lg-10 p-0 bg-light">
            <Header />
            <Outlet />
          </div>
        </div>
    </>
  );
}

export default Layout;
