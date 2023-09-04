import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddUser({setUsers ,setIsLoading,setShowForm,setShowBadge}) {
  const [newUser, setNewUser] = useState({
    user_name: "",
    user_password: "",
    user_email: "",
    admin_id: "",
    department_name: "",
  });
  
  const handleFormSubmit = async(e)=>{
    e.preventDefault();
    setIsLoading(true)
    try {
        await axios
        .post("http://localhost:5000/api/user/create-user", newUser)
        .then((response) => {
          toast(response.data.message);
          setNewUser({
            user_name: "",
            user_password: "",
            user_email: "",
            admin_id: "",
            department_id: "",
          });
          setShowBadge(false);
        });
        const afterAddUser = await axios.get(
            "http://localhost:5000/api/user/list-user"
          );
          setUsers(afterAddUser.data.data);
          setShowBadge(true);
          setTimeout(() => {
            setShowBadge(false);
          }, 5000);
    } catch (error) {
        if (error.response) {
            console.log("Response data:", error.response.data);
            console.log("Response status:", error.response.status);
            console.log("Response headers:", error.response.headers);
          } 
          else if (error.request) {
            console.error("Request:", error.request);
          }
          else {
            console.log("Error:", error.message);
          }
    }finally {
        setIsLoading(false);
    }    
}
  
  return (
    <form onSubmit={handleFormSubmit}>
      <ToastContainer/>
      <div className="form-group">
        <label htmlFor="user_name">Name :</label>
        <input
          type="text"
          id="user_name"
          value={newUser.user_name}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              user_name: e.target.value,
            })
          }
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="user_password">Password :</label>
        <input
          type="text"
          id="user_password"
          value={newUser.user_password}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              user_password: e.target.value,
            })
          }
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="user_email">Email:</label>
        <input
          type="text"
          id="user_email"
          value={newUser.user_email}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              user_email: e.target.value,
            })
          }
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="admin_id">Admin : </label>
        <input
          type="text"
          id="admin_id"
          value={newUser.admin_id}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              admin_id: e.target.value,
            })
          }
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="department_name">Department:</label>
        <input
          type="text"
          id="supplier_name"
          value={newUser.department_name}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              department_name: e.target.value,
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
AddUser.propTypes = {
    setUsers: PropTypes.func.isRequired,
    setIsLoading:PropTypes.func.isRequired,
    setShowForm:PropTypes.func.isRequired,
    setShowBadge:PropTypes.func.isRequired
  };



export default AddUser;
