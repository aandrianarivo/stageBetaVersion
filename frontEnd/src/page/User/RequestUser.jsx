import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../utils/AuthContext";
import { useContext } from "react";

function RequestUser() {
  const [requests, setRequests] = useState([]);
  const col = [
    { field: "request_id", headerName: "ID", width: 100 },
    { field: "request_productName", headerName: "PRODUCT", width: 200 },
    { field: "request_quantity", headerName: "QUANTITY", width: 100 },
    { field: "request_date", headerName: "DATE", width: 200 },
  ];
  const { id } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/request/getrequest/${id}`)
      .then(function (response) {
        setRequests(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [id]);
  return (
    <div className="d-flex">
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={requests}
          columns={col}
          getRowId={(row) => row.request_id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableSelectionOnClick
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default RequestUser;
