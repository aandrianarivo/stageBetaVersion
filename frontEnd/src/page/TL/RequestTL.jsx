import { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../utils/AuthContext";
import { useContext } from "react";
import socketIoClient from "socket.io-client";

const socket = socketIoClient("http://localhost:5000");

function RequestTL() {
  const [requests, setRequests] = useState([]);
  const { id } = useContext(AuthContext);
  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/request/listbytl-request/${id}`
      );
      setRequests(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  });

  // Fonction pour valider une demande
  const handleApprove = async (request_id) => {
    try {
      // Envoyer une requête HTTP pour approuver la demande avec l'ID requestId
      let reqid = parseInt(request_id);
      const updatedRequest = {
        teamLeader_id: id,
        request_id: reqid,
        valid:true
      };
      await axios.put("http://localhost:5000/api/request/validbytl-request",updatedRequest);
      socket.emit("alertAdmin",{message:"A request is pending"})
      alert("Approve succes");
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
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-10">
          <div className="card-container row">
            {requests.reverse().map((request) => (
              <div
                key={request.request_id}
                className="card col-md-4"
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <div className="card-body">
                  <p>Product: {request.request_productName}</p>
                  <p>Quantity: {request.request_quantity}</p>
                  <p>Status: {request.request_Status}</p>
                  <p>Date: {request.request_date}</p>
                  <p>Valid by Team Leader:{request.request_validTeamLeader === true?'1':"0"}</p>
                  {request.request_validTeamLeader === false && (
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
        </div>
      </div>
    </div>
  );
}

export default RequestTL;
