import axios from "axios";
import { useEffect, useState } from "react";
import AuthContext from "../../utils/AuthContext";
import { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
// import * as XLSX from "xlsx";


function UserTL() {
  // const [users, setUsers] = useState([]);
  // const columns = [
  //   { name: "name", selector: (row) => row.user_name },
  //   { name: "Quantity ", selector: (row) => row.request_quantity },
  //   { name: "Status", selector: (row) => row.request_Status },
  //   { name: "Date", selector: (row) => row.request_date },
  // ];
  // const {id} = useContext(AuthContext);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/teamleader/getusers/${id}`)
  //     .then(function (response) {
  //       setUsers(response.data.data);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // }, [id]);
  // console.log()
  // return (
  //   <div className="container-fluid">
  //     <div className="row">
  //       <div className="col-lg-10">
  //         <h1>Team leader users:</h1>
  //         <DataTable
  //           title="Product list"
  //           columns={columns}
  //           data={users}
  //           pagination
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
  // const [selectedRows, setSelectedRows] = useState([]);
  const [requests, setRequests] = useState([]);
  // const columns = [
  //   { field: "id", headerName: "ID", width: 70 },
  //   { field: "firstName", headerName: "First name", width: 130 },
  //   { field: "lastName", headerName: "Last name", width: 130 },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     width: 90,
  //   },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  //   },
  // ];
  const col = [
    { field: "user_id", headerName: "ID",width: 100 },
    { field: "user_name", headerName: "NAME",width: 200 },
    { field: "user_email", headerName: "MAIL",width: 200 },
  ];
  const { id } = useContext(AuthContext);

  // const onRowsSelectionHandler = (ids) => {
  //   const selectedRowsData = ids.map((request_id) => requests.find((row) => row.request_id === request_id));
  //   setSelectedRows(selectedRowsData);
  // };

  // const exportToExcel = () => {
  //   console.log(selectedRows)
  //   // const worksheet = XLSX.utils.json_to_sheet(selectedRows);
  //   // const workbook = XLSX.utils.book_new();
  //   // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //   // XLSX.writeFile(workbook, "exportedData.xlsx");
  // };

  // const rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  // ];

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/teamleader/getusers/${id}`)
      .then(function (response) {
        setRequests(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [id]);
  console.log(requests);
  return (
    <div className="d-flex">
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={requests}
          columns={col}
          getRowId={(row) => row.user_id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
          disableSelectionOnClick
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default UserTL;
