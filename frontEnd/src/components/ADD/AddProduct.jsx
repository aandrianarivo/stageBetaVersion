import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddProduct({ setProducts ,setIsLoading,setShowForm,setShowBadge}) {
    const [newProduct, setNewProduct] = useState({
        product_ref: "",
        product_name: "",
        product_unitprice: "",
        product_availableQuantity: "",
        supplier_name: "",
      });
      const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
          await axios
            .post("http://localhost:5000/api/product/create-product", newProduct)
            .then((response) => {
              toast(response.data.message);
              setNewProduct({
                product_ref: "",
                product_name: "",
                product_unitprice: "",
                product_availableQuantity: "",
                supplier_name: "",
              });
              setShowForm(false);
            });
          const updatedProductsResponse = await axios.get(
            "http://localhost:5000/api/product/list-product"
          );
          setProducts(updatedProductsResponse.data.data);
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
        <label htmlFor="product_ref">Product reference:</label>
        <input
          type="text"
          id="product_ref"
          value={newProduct.product_ref}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              product_ref: e.target.value,
            })
          }
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="product_name">Product Name:</label>
        <input
          type="text"
          id="product_name"
          value={newProduct.product_name}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              product_name: e.target.value,
            })
          }
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="product_unitprice">Product unit price:</label>
        <input
          type="text"
          id="product_unitprice"
          value={newProduct.product_unitprice}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              product_unitprice: e.target.value,
            })
          }
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="product_availableQuantity">Product quantity:</label>
        <input
          type="number"
          id="product_availableQuantity"
          value={newProduct.product_availableQuantity}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              product_availableQuantity: e.target.value,
            })
          }
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="supplier_name">Supplier:</label>
        <input
          type="text"
          id="supplier_name"
          value={newProduct.supplier_name}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              supplier_name: e.target.value,
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
AddProduct.propTypes = {
  setProducts: PropTypes.func.isRequired,
  setIsLoading:PropTypes.func.isRequired,
  setShowForm:PropTypes.func.isRequired,
  setShowBadge:PropTypes.func.isRequired
};

export default AddProduct;
