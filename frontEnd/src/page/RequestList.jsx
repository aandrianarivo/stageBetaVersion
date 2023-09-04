import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { DataGrid } from "@mui/x-data-grid";


function RequestList() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [products, setProducts] = useState([]);
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
    { field: "request_id", headerName: "ID", width: 100 },
    { field: "request_productName", headerName: "PRODUCT", width: 200 },
    { field: "request_quantity", headerName: "QUANTITY", width: 100 },
    { field: "request_date", headerName: "DATE" },
    { field: "request_validTeamLeader", headerName: "VALID TL" },
  ];
  console.log(products);

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((request_id) =>
      products.find((row) => row.request_id === request_id)
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
      .get("http://localhost:5000/api/request/list-request")
      .then(function (response) {
        setProducts(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <div className="d-flex">
      <div style={{ height: 400, width: "100%" }}>
        <div className="container-fluid d-flex justify-content-between">
          <h1>Requests list:</h1>
          <button
            className="btn btn-primary mb-2 sm"
            onClick={() => handleExportToExcel()}
          >
            Export to Excel
          </button>
        </div>
        <hr />
        <DataGrid
          rows={products}
          columns={col}
          getRowId={(row) => row.request_id}
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
      </div>
    </div>
  );
}

export default RequestList;
