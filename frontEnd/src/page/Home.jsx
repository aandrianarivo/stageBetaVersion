import CardHome from "../components/Card/CardHome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";
// import SimpleCharts from "../components/Chart/BasicPie";
import axios from "axios";
import { useEffect, useState } from "react";
import Simple from "../components/Chart/Simple";

function Home() {
  const [valu, setValu] = useState({});
  const [depart, setDepart] = useState([]);
  const [req, setReq] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product/getproductstock")
      .then(function (req) {
        setValu(req.data);
      });
    axios
      .get("http://localhost:5000/api/department/getdepartstat")
      .then(function (requet) {
        setDepart(
          requet.data.data.departlist.map((item) => item.department_name)
        );
        console.log(
          "depart",
          requet.data.data.departlist.map((item) => item.department_name)
        );
        axios
        .get("http://localhost:5000/api/request/getrequestinprogresscount")
        .then(function (req) {
          setReq(req.data.count);
        });
        // requet.data.data.departList.map(dep=>{ dep.department_name})
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  console.log("dep", req);
  return (
    <div className="container-fluid">
      <div>
        <div className="d-flex justify-content-between">
          <CardHome
            comp={faClipboardCheck}
            text="Most requested products"
            value={1}
          />
          <CardHome
            comp={faHourglass}
            text="Out of stock"
            value={valu.lowStockProductCount}
          />
          <CardHome
            comp={faClipboardCheck}
            text="Products in stock"
            value={valu.totalProductCount}
          />
          <CardHome comp={faClipboardCheck} text="Pending request" value={req} />
        </div>
        <hr />
        <div className="container-fluid d-flex flex-column justify-content-center">
          <h5>Users in department:</h5>
          <Simple list={depart} title={"User's in department"} />
        </div>
      </div>
    </div>
  );
}

export default Home;
