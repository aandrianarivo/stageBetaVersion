import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import Loading from "../components/Loading";
import Badge from "../components/Badge";
import AddDepartment from "../components/ADD/AddDepartment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Departement() {
  const [departmentData, setDepartmentData] = useState([]);

  const [showBadge, setShowBadge] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  // const dataFromDatabase = {
  //   name: 'Anthony',
  //   first_name: 'Andria',
  //   email: 'anthony@gmail.com',
  // };
  useEffect(() => {
    setIsLoading(false);
    axios
      .get("http://localhost:5000/api/department/list-department")
      .then(function (response) {
        setDepartmentData(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  },[]);

  const attributes = [
    { key: "department_id", value: "id" },
    { key: "department_name", value: "Name" },
    { key: "admin_id", value: "Admin" },
  ];

  const handleDelete = (data) => {
    toast.succes("Card action clicked with data:", data);
    // Perform any action with the data here
  };

  const handleUpdate = () =>{
    toast("Card handle update")
  }
  return (
    <div className="container-fluid">
      <ToastContainer/>
      <div className="row">
        <div className="col-lg-10">
        <div className="d-flex justify-content-between">
            <div>
              <h1 className="mt-4">Departments</h1>
            </div>
            <div>
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-primary btn-sm mt-4 "
              >
                <i className="fa-solid fa-plus"></i>
                NEW
              </button>
            </div>
          </div>
          <form className="d-flex mx-2 mb-3">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Rechercher"
              aria-label="Search"
            />
            <button className="btn btn-outline-dark" type="submit">
              Rechercher
            </button>
          </form>
          {isLoading ? (
            <Loading/>
          ) : (
            <>
              {showBadge && (
                <Badge/>
              )}
            </>
          )}
          {showForm && (
            <AddDepartment
              setDepartmentData={setDepartmentData}
              setIsLoading={setIsLoading}
              setShowForm={setShowForm}
              setShowBadge={setShowBadge}
            />
          )}
          <div>
            <div className="card-container">
              {departmentData.map((data, index) => (
                <Card
                  key={index}
                  data={data}
                  attributes={attributes}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Departement;
