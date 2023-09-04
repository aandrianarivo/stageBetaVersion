import {
    Grid,
  } from '@devexpress/dx-react-grid-bootstrap4';
  import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
  import PropTypes from "prop-types";
  import DataTable from 'react-data-table-component';
  
  const ResponsiveDataTable = ({ data ,selectableRows,pagination}) => {
    const columns = [
      { name: 'product_ref', title: 'product_ref' },
      { name: 'product_name ', title: 'product_name' },
      { name: 'Quantitye', title: 'Quantity' },
      { name: 'Requested', title: 'Requested' },
      { name: 'Supplier', title: 'Supplier' },
    ];
  
    return (
      <div className="table-responsive">
        <Grid
          rows={data}
          columns={columns}
        >
            <DataTable columns={columns} data={data} selectableRows={selectableRows} pagination={pagination}/> 

        </Grid>
      </div>
    );
  };
  
  ResponsiveDataTable.propTypes = {
    data: PropTypes.array.isRequired,
    selectableRows:PropTypes.bool,
    pagination:PropTypes.bool,

  };
  
  export default ResponsiveDataTable;
  