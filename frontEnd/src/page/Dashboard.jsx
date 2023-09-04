import "bootstrap/dist/css/bootstrap.min.css";
import AuhtContext from "../utils/AuthContext";
import { useContext } from "react";
import HomeTl from "./TL/HomeTl";
import Home from "./Home";
import HomeUser from "./User/HomeUser";

function Dashboard() {
  const { userRole } = useContext(AuhtContext);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-10">
          <h1>Home</h1>
          {userRole == "admin" ? (
            <Home />
          ) : userRole == "tl" ? (
            <HomeTl />
          ) : (
            <HomeUser />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
