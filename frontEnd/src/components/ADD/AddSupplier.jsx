import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddSupplier({ setSupplierData, setIsLoading, setShowForm, setShowBadge }) {
  const [newSupplier, setNewSupplier] = useState({
    supplier_name: "",
    supplier_adrs: "",
    supplier_delivryMethod: "",
    supplier_paymentMethod: "",
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios
        .post("http://localhost:5000/api/supplier/create-supplier", newSupplier)
        .then((response) => {
          toast(response.data.message);
          setNewSupplier({
            supplier_name: "",
            supplier_adrs: "",
            supplier_delivryMethod: "",
            supplier_paymentMethod: "",
          });
          setShowForm(false);
        });
      const updatedSuppliersResponse = await axios.get(
        "http://localhost:5000/api/supplier/list-supplier"
      );
      setSupplierData(updatedSuppliersResponse.data.data);
      setShowBadge(true);
      setTimeout(() => {
        setShowBadge(false);
      }, 5000);
    } catch (error) {
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.log("Error:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <ToastContainer/>
      <div className="form-group">
        <label htmlFor="supplier_name">Name :</label>
        <input
          type="text"
          id="supplier_name"
          value={newSupplier.supplier_name}
          onChange={(e) =>
            setNewSupplier({
              ...newSupplier,
              supplier_name: e.target.value,
            })
          }
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="supplier_adrs">Adress :</label>
        <input
          type="text"
          id="supplier_adrs"
          value={newSupplier.supplier_adrs}
          onChange={(e) =>
            setNewSupplier({
              ...newSupplier,
              supplier_adrs: e.target.value,
            })
          }
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="supplier_delivryMethod">Delivry method :</label>
        <input
          type="text"
          id="supplier_delivryMethod"
          value={newSupplier.supplier_delivryMethod}
          onChange={(e) =>
            setNewSupplier({
              ...newSupplier,
              supplier_delivryMethod: e.target.value,
            })
          }
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="supplier_payementMethod">Payment method :</label>
        <input
          type="text"
          id="supplier_payementMethod"
          value={newSupplier.supplier_paymentMethod}
          onChange={(e) =>
            setNewSupplier({
              ...newSupplier,
              supplier_paymentMethod: e.target.value,
            })
          }
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-outline-success mr-2">
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
  );
}
AddSupplier.propTypes = {
    setSupplierData: PropTypes.func.isRequired,
    setIsLoading:PropTypes.func.isRequired,
    setShowForm:PropTypes.func.isRequired,
    setShowBadge:PropTypes.func.isRequired
  };
export default AddSupplier;
