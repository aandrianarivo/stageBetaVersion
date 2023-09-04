import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function PopupModal({
  setShowEditModal,
  data,
  setDatas,
  setProducts,
  setShowBadge,
}) {
  const [localData, setLocalData] = useState(data.data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prevLocalData) => ({
      ...prevLocalData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setLocalData(data.data); // Mettre à jour localData lorsque data.data change
  }, [data.data]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/product/update-product/${localData.product_ref}`,
        localData
      );
      toast.success("Product updated successfully!");

      setDatas({
        ...data,
        data: localData,
      });
      try {
        const afterUpdate = await axios.get(
          "http://localhost:5000/api/product/list-product"
        );
        setProducts(afterUpdate.data.data);
        setShowBadge(true);
        setTimeout(() => {
          setShowBadge(false);
        }, 5000);
      } catch (error) {
        console.error("Error updating product:", error);
      }
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again.");
    }
    console.log("HandleChange Access data?", localData);
  };

  return (
    <div className="modal-dialog">
      <ToastContainer/>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{data.tittle}</h5>
          <button
            type="button"
            className="close"
            onClick={() => setShowEditModal(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label htmlFor="edit_product_name">Product Name:</label>
              <input
                type="text"
                name="product_name"
                id="edit_product_name"
                value={localData.product_name}
                onChange={handleInputChange}
                required
                className="form-control"
              />
            </div>
            {data.action === "add" ? (
              <>
                <div className="form-group">
                  <label htmlFor="product_availableQuantity">Quantity:</label>
                  <input
                    type="text"
                    id="product_availableQuantity"
                    name="product_availableQuantity"
                    value={localData.product_availableQuantity}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
              </>
            ) : null}

            {data.action === "edit" && (
              <>
                <div className="form-group">
                  <label htmlFor="product_unitprice">Unit price:</label>
                  <input
                    type="text"
                    id="product_unitprice"
                    name="product_unitprice"
                    value={localData.product_unitprice}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="product_availableQuantity">
                    Available Quantity:
                  </label>
                  <input
                    type="text"
                    id="product_availableQuantity"
                    name="product_availableQuantity"
                    value={localData.product_availableQuantity || ""}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="product_requestedQuantity">
                    Requested quantity:
                  </label>
                  <input
                    type="text"
                    id="product_requestedQuantity"
                    name="product_requestedQuantity"
                    value={localData.product_requestedQuantity || ""}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
              </>
            )}
            {/* Ajoutez d'autres champs pour les autres détails du produit ici */}
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowEditModal(false)}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
PopupModal.propTypes = {
  setShowEditModal: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setDatas: PropTypes.func.isRequired,
  setProducts: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setShowBadge: PropTypes.func.isRequired,
};

export default PopupModal;
