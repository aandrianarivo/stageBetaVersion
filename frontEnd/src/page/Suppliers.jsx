import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Badge } from "react-bootstrap";
import Card from "../components/Card";
import ModalCentered from "../components/Modal/ModalCentered";
import axios from "axios";
import AddSupplier from "../components/ADD/AddSupplier";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Suppliers()  {
  const [supplierData, setSupplierData] = useState([]);
  const [showForm,setShowForm] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    setIsLoading(false);
    axios
      .get("http://localhost:5000/api/supplier/list-supplier/")
      .then(function(response){
        setSupplierData(response.data.data)
      });
  },[])
  const attributes = [
    { key: "supplier_name", value: "Name" },
    { key: "supplier_adrs", value: "Adress" },
    { key: "supplier_delivryMethod", value: "Delivry Method" },
    { key: "supplier_paymentMethod", value: "Payment Method" },
  ];
  const handleDelete = (data) => {
    toast("Card action clicked with data:", data);
    // Perform any action with the data here
  };

  const handleUpdate = async (data) =>{
    console.log("data in handleUpdate if he works",data)
    try {
      const update = await axios.put(`http://localhost:5000/api/supplier/update-supplier/${data.supplier_id}`,data)
      if(update){
        setShowBadge(true)
        // const dataAfterUpdate = await axios.get("http://localhost:5000/api/supplier/list-supplier")
        // setSupplierData(dataAfterUpdate)
      }
    } catch (error) {
      console.error(error)
    }
    
  }
  return (
    <div className="container-fluid">
      <ToastContainer/>
      <div className="row">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between">
            <div>
              <h1 className="mt-4">Suppliers</h1>
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
              Search
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
            <AddSupplier
              setSupplierData={setSupplierData}
              setIsLoading={setIsLoading}
              setShowForm={setShowForm}
              setShowBadge={setShowBadge}
            />
          )}
          <div>
            <div className="card-container">
              {supplierData.map((data, index) => (
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
  )
}

export default Suppliers