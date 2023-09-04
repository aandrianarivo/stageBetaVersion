import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddDepartment({
  setDepartmentData,
  setIsLoading,
  setShowForm,
  setShowBadge,
}) {
  const [newDepart, setNewDepart] = useState({
    department_name: "",
    admin_id: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios
        .post("http://localhost:5000/api/user/create-user", newDepart)
        .then((response) => {
          toast(response.data.message);
          setNewDepart({
            department_name: "",
            admin_id: "",
          });
          setShowBadge(false);
        });
      const afterAddUser = await axios.get(
        "http://localhost:5000/api/user/list-user"
      );
      setDepartmentData(afterAddUser.data.data);
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
      <ToastContainer />
      <div className="form-group">
        <label htmlFor="user_name">Name :</label>
        <input
          type="text"
          id="user_name"
          value={newDepart.department_name}
          onChange={(e) =>
            setNewDepart({
              ...newDepart,
              department_name: e.target.value,
            })
          }
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="admin_id">Admin :</label>
        <input
          type="text"
          id="admin_id"
          value={newDepart.admin_id}
          onChange={(e) =>
            setNewDepart({
              ...newDepart,
              admin_id: e.target.value,
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
AddDepartment.propTypes = {
  setDepartmentData: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
  setShowBadge: PropTypes.func.isRequired,
};

export default AddDepartment;
