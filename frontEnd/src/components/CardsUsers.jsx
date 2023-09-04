import PropTypes from "prop-types";
import PopupModal from "./PopupModal";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CardsUsers({
  datas,
  attributes,
  setUsers,
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
    const istittle = `Edit Product :${data.user_name}`;
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
      setUsers(afterDelete.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again.");
    }
  };

  return (
    <div className="card-container row">
      <ToastContainer/>
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
            {showEditModal && modalDatas && (
              <div className="modal fade show" style={{ display: "block" }}>
                {
                  <PopupModal
                    data={modalDatas}
                    setDatas={setModalDatas}
                    setShowEditModal={setShowEditModal}
                    setUsers={setUsers}
                    setIsLoading={setIsLoading}
                    setShowBadge={setShowBadge}
                  />
                }
              </div>
            )}

            <p>Name: {data.user_name}</p>
            <p>Password : {data.user_password}</p>
            <p>Email:{data.user_email}</p>
            <p>Admin: {data.admin_id}</p>
            <p>Department: {data.department_id}</p>
            <div className="d-flex justify-content-between m-2">
              <div>
                <button
                  onClick={() => {
                    handleAdd(data);
                  }}
                  className="btn btn-outline-secondary "
                >
                  ADD
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    handleDelete(data.user_id);
                  }}
                  className="btn btn-danger "
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

CardsUsers.propTypes = {
  datas: PropTypes.array.isRequired,
  attributes: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setShowBadge: PropTypes.func.isRequired,
};

export default CardsUsers;
