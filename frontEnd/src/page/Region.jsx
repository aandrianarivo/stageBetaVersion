/* eslint-disable react-refresh/only-export-components */
// import { Button } from "react-bootstrap";
import ModalCentered from "../components/Modal/ModalCentered";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Badge from "../components/Badge";
import AddRegion from "../components/ADD/AddRegion";
import Card from "../components/Card";
import withRoleAccess from "../HOCs/withRolesAcces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Region() {
  const [regionData, setRegionData] = useState([]);
  const [showForm,setShowForm] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    axios
      .get("http://localhost:5000/api/region/list-region")
      .then(function (response) {
        setRegionData(response.data.data);
      });
  }, []);
  const attributes = [{ key: "region_name", value: "Name" }];
  const handleDelete = (data) => {
    toast("Card action clicked with data:", data);
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
              <h1 className="mt-4">Regions</h1>
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
            <AddRegion
              setDepartmentData={setRegionData}
              setIsLoading={setIsLoading}
              setShowForm={setShowForm}
              setShowBadge={setShowBadge}
            />
          )}
          <div>
            <div className="card-container">
              {regionData.map((data, index) => (
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
          {/* <Button variant="primary" onClick={() => setModalShow(true)}>
            Launch vertically centered modal
          </Button> */}
          <ModalCentered
            show={modalShow}
            onHide={() => {
              setModalShow(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default withRoleAccess(["admin"],Region);
