import { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../utils/AuthContext";
import { useContext } from "react";
import RequestUser from "./User/RequestUser";
import RequestTL from "./TL/RequestTL";
import socketIoClient from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = socketIoClient("http://localhost:5000");

function Request() {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    teamLeader_name: "",
    user_id: 2,
    request_productName: "",
    request_quantity: "",
  });

  // Fonction pour récupérer les demandes depuis l'API
  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/request/listvalidtl-request"
      );
      setRequests(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  const { userRole } = useContext(AuthContext);
  // console.log("User Role", userRole);

  // Fonction pour valider une demande
  const handleApprove = async (request_id) => {
    try {
      // Envoyer une requête HTTP pour approuver la demande avec l'ID requestId
      let id = parseInt(request_id);
      const updatedRequest = {
        request_id: id,
        request_Status: "DONE",
      };

      await axios.put(
        "http://localhost:5000/api/request/validbyadmin-request",
        updatedRequest
      );
      toast.success("Approve succes");
      // Rafraîchir la liste des demandes
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour refuser une demande
  const handleReject = async (requestId) => {
    try {
      // Envoyer une requête HTTP pour refuser la demande avec l'ID requestId
      await axios.post(
        `http://localhost:5000/api/requests/${requestId}/reject`
      );
      // Rafraîchir la liste des demandes
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/api/request/create-request", newProduct)
        .then((response) => {
          toast(response.data.message);
          socket.emit("newRequest",newProduct)
          setRequests([...requests.response.data.data]);
          setShowForm(false);
          setNewProduct({
            teamLeader_name: "",
            user_id: "",
            request_productName: "",
            request_quantity: "",
          });
          setShowForm(false);
        });
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.log("Error:", error.message);
      }
    }
  };
  return (
    <div className="container-fluid">
      <ToastContainer/>
      <div className="row">
        <div className="col-lg-10">
          <h1>Requests</h1>
          <button
            className="btn btn-primary mb-3"
            onClick={() => setShowForm(true)}
          >
            NEW REQUEST
          </button>
          {showForm && (
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="teamLeader_name">Team Leader Name : </label>
                <input
                  type="text"
                  id="teamLeader_name"
                  value={newProduct.teamLeader_name}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      teamLeader_name: e.target.value,
                    })
                  }
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="request_productName">Product Name : </label>
                <input
                  type="text"
                  id="request_productName"
                  value={newProduct.request_productName}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      request_productName: e.target.value,
                    })
                  }
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="request_quantity">Quantity : </label>
                <input
                  type="text"
                  id="request_quantity"
                  value={newProduct.request_quantity}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      request_quantity: e.target.value,
                    })
                  }
                  required
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-success mr-2">
                CONFIRM
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-danger"
              >
                CANCEL
              </button>
            </form>
          )}
          {userRole == "user" ? (
            <RequestUser />
          ) : userRole == "tl" ? (
            <RequestTL />
          ) : (
            <div className="card-container row">
              {requests.map((request) => (
                <div
                  key={request.request_id}
                  className="card col-md-4"
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {/* <img
                  src={request.request_id === 1 ? productImage1 : productImage2} // Utilise les images en fonction de la référence du produit
                  alt={request.request_productName}
                  className="img-fluid rounded-top"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                /> */}
                  <div className="card-body">
                    <p>Product: {request.request_productName}</p>
                    <p>Quantity: {request.request_quantity}</p>
                    <p>Status: {request.request_Status}</p>
                    <p>Date: {request.request_date}</p>
                    <p>
                      Valid by Team Leader:{request.request_validTeamLeader}
                    </p>
                    {request.request_Status === "IN PROGRESS" && (
                      <>
                        <button
                          className="btn btn-succes"
                          onClick={() => handleApprove(request.request_id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleReject(request.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* {userRole =="tl" ? "hello":null } */}
        </div>
      </div>
    </div>
  );
}

export default Request;
