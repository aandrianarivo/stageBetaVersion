import { useContext, useState } from "react";
import AuthContext from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.email === "" || form.password == "") {
      alert("Enter details to proceed");
    } else {
      await axios
        .post("http://localhost:5000/api/user/login-user", {
          login_email: form.email,
          login_password: form.password,
        })
        .then(function (response) {
          console.log("message from login message", response.data.message);
          if (response.data.message === "Authentication successful as User") {
            console.log(response.data.token);
            localStorage.setItem("token", response.data.token);
            toast.success("Authentication successful as User",{
              position: toast.POSITION.TOP_CENTER
            });
            authContext.signin(response.data.token, () => {
              navigate("/");
            });
          } else if (
            response.data.message === "Authentication successful as Admin"
          ) {
            localStorage.setItem("token", response.data.token);
            authContext.signin(response.data.token, () => {
              navigate("/");
            });
            toast.success("Authentication successful as Admin",{
              position: toast.POSITION.TOP_CENTER
            });
          } else if (
            response.data.message === "Authentication successful as TeamLeader"
          ) {
            toast.success("Authentication successful as Team Leader",{
              position: toast.POSITION.TOP_CENTER
            });
            localStorage.setItem("token", response.data.token);
            authContext.signin(response.data.token, () => {
              navigate("/");
            });
          } else {
            toast.error("Authentication faild",{
              position: toast.POSITION.TOP_CENTER
            });
          }
        });
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body bg-light">
              <ToastContainer />
              <h2 className="card-title text-center mb-4">Login</h2>
              {/* Formulaire de connexion */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="username"
                    placeholder="Enter your email"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
