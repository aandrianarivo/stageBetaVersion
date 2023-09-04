import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { DataGrid } from "@mui/x-data-grid";

function UserList() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [users, setUsers] = useState([]);
  
  const col = [
    { field: "user_id", headerName: "ID", width: 100 },
    { field: "user_name", headerName: "NAME", width: 200 },
    { field: "user_email", headerName: "EMAIL", width: 200 },
    { field: "admin_id", headerName: "ADMIN" ,width:200},
    { field: "department_id", headerName: "DEPARTMENT" },
  ];

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((user_id) =>
    users.find((row) => row.user_id === user_id)
    );
    setSelectedRows(selectedRowsData);
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(selectedRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "exportedData.xlsx");
  };

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
      .get("http://localhost:5000/api/product/list-product")
      .then(function (response) {
        setUsers(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <div className="d-flex">
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={col}
          getRowId={(row) => row.user_id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
          disableSelectionOnClick
          checkboxSelection
        />
        <button
          className="btn btn-primary mb-2"
          onClick={() => handleExportToExcel()}
        >
          Export to Excel
        </button>
      </div>
    </div>
  );
}

export default UserList;
