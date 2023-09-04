import "bootstrap/dist/css/bootstrap.min.css";
import "./Products.css"; // Assure-toi d'avoir importé le fichier de styles personnalisés
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import Badge from "../components/Badge";
import AddUser from "../components/ADD/AddUser";
import CardsUsers from "../components/CardsUsers";
import AuthContext from "../utils/AuthContext";
import UserTL from "./TL/UserTL";

function User() {
  const [users, setUsers] = useState([]);
  const [showBadge, setShowBadge] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const listAttributes = [
    "user_id",
    "user_name",
    "user_password",
    "user_email",
    "admin_id",
    "department_id",
  ];
  const { userRole } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(false);
    axios
      .get("http://localhost:5000/api/user/list-user")
      .then(function (response) {
        setUsers(response.data);
      })

      .catch(function (error) {
        console.error(error);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between">
            <div>
              <h1 className="mt-4">Users</h1>
            </div>
            <div>
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-primary btn-sm mt-4 "
              >
                <i className="fa-solid fa-plus"></i>
                NEW
              </button>
            </div>
          </div>
          <form className="d-flex mx-2 mb-3">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Rechercher"
              aria-label="Search"
            />
            <button className="btn btn-outline-dark" type="submit">
              Rechercher
            </button>
          </form>
          {isLoading ? <Loading /> : <>{showBadge && <Badge />}</>}
          {showForm && (
            <AddUser
              setUsers={setUsers}
              setIsLoading={setIsLoading}
              setShowForm={setShowForm}
              setShowBadge={setShowBadge}
            />
          )}
          {userRole == "tl" ? (
            <UserTL />
          ) : (
            <CardsUsers
              datas={users}
              attributes={listAttributes}
              setUsers={setUsers}
              setIsLoading={setIsLoading}
              setShowBadge={setShowBadge}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
