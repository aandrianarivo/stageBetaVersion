import PropTypes from "prop-types";
import PopupModal from "./PopupModal";
import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../utils/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CardsProducts({
  datas,
  attributes,
  setProducts,
  setIsLoading,
  setShowBadge,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalDatas, setModalDatas] = useState({
    action: "",
    tittle: "",
    data: {},
  });

  const handleUpdate = (data) => {
    const istittle = `Edit Product :${data.product_name}`;
    const isData = data;
    setModalDatas({
      ...modalDatas,
      action: "edit",
      tittle: istittle,
      data: isData,
    });
    setShowEditModal(true);
  };
  const handleAdd = (data) => {
    setModalDatas({
      ...modalDatas,
      action: "add",
      tittle: `Add Product :${data.product_name}`,
      data,
    });
    setShowEditModal(true);
  };
  const handleDelete = async (data) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/product/delete-product/${data}`
      );
      toast.success("Product delete successfully!");
      setIsLoading(true);
      const afterDelete = await axios.get(
        "http://localhost:5000/api/product/list-product"
      );
      setProducts(afterDelete.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again.");
    }
  };
  const { userRole } = useContext(AuthContext);
  return (
    <div className="card-container row">
      {datas.map((data) => (
        <div
          className="card col-md-4"
          key={data[attributes[0]]}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h3>{data[attributes[1]]}</h3>
              </div>
              <div>
                {userRole == "admin" ? (
                  <button
                    onClick={() => {
                      handleUpdate(data);
                    }}
                    className="btn btn-sm ml-2"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                ) : null}
              </div>
            </div>
            {showEditModal && modalDatas && (
              <div className="modal fade show" style={{ display: "block" }}>
                {
                  <PopupModal
                    data={modalDatas}
                    setDatas={setModalDatas}
                    setShowEditModal={setShowEditModal}
                    setProducts={setProducts}
                    setIsLoading={setIsLoading}
                    setShowBadge={setShowBadge}
                  />
                }
              </div>
            )}

            <p>Price : {data.product_unitprice}</p>
            <p>Available : {data.product_availableQuantity}</p>
            {userRole == "admin" ? (
              <p>
                Requested :
                {data.product_requestedQuantity === null
                  ? " 0"
                  : data.product_requestedQuantity}
              </p>
            ) : null}
            <p>Date Added: {data.product_dateAdded}</p>
            <div className="d-flex justify-content-between m-2">
              <div>
                {userRole == "admin" ? (
                  <button
                    onClick={() => {
                      handleAdd(data);
                    }}
                    className="btn btn-outline-secondary "
                  >
                    ADD
                  </button>
                ) : null}
              </div>
              <div>
                {userRole == "admin" ? (
                  <button
                    onClick={() => {
                      handleDelete(data.product_ref);
                    }}
                    className="btn btn-danger "
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                ) : null}
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
CardsProducts.propTypes = {
  datas: PropTypes.array.isRequired,
  attributes: PropTypes.array.isRequired,
  setProducts: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setShowBadge: PropTypes.func.isRequired,
};
export default CardsProducts;

{
  /* <img
                  src={
                    product.product_ref? image : productImage2
                  } // Utilise les images en fonction de la référence du produit
                  alt={product.product_name}
                  className="img-fluid rounded-top"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                /> */
}

{
  /* <div className="card-body">
  {datas.map((data) => (
    <div
      className="card col-md-4"
      key={data.product_ref}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <div className="card-body">
        {attributes.map((attr) => (
          <div key={attr} style={{ marginBottom: "5px" }}>
            <strong>{attr}:</strong> {data[attr]}
          </div>
        ))}
        <div className="d-flex justify-content-between">
          <div>
            <h3>{data.product_name}</h3>
          </div>
          <div>
            <button
              onClick={() => {
                handleUpdate(data);
              }}
              className="btn btn-sm ml-2"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}

  {/* Bouton "EDIT" et fenêtre modale d'édition */
}
//   {showEditModal && modalDatas && (
//     <div className="modal fade show" style={{ display: "block" }}>
//       <PopupModal
//         data={modalDatas}
//         setDatas={setModalDatas}
//         setShowEditModal={setShowEditModal}
//       />
//     </div>
//   )}
// </div>; */}
