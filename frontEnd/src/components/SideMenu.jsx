import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SideMenu.css";
import { useContext } from "react";
import AuthContext from "../utils/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faTruckFieldUn } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";




// import "bootstrap/js/dist/dropdown"
// import { Dropdown } from "react-bootstrap";


const menuItems = [
  { path: "/", text: "Home", roles: ["admin", "user","tl"] ,icon:faHouse},
  { path: "/users", text: "User", roles: ["admin","tl"] ,icon:faUser},
  { path: "/requests", text: "Request", roles: ["admin", "user","tl"],icon:faComment },
  { path: "/requests/list", text: "Request List", roles: ["admin"],icon:faList },
  { path: "/products", text: "Product", roles: ["admin", "user","tl"],icon:faStore },
  { path: "/products/list", text: "Product List", roles: ["admin"],icon:faList },
  { path: "/suppliers", text: "Suppliers", roles: ["admin"] ,icon:faTruckFieldUn},
  // { path: "/teamleaders", text: "Team Leader", roles: ["admin", "user"] },
  { path: "/regions", text: "Region", roles: ["admin"] ,icon:faLocationDot},
  { path: "/departments", text: "Departments", roles: ["admin"] ,icon:faBuilding},

];
function SideMenu() {
  const authContext = useContext(AuthContext);
  const userRole = authContext.userRole;
  return (
    <div className="bg-dark fixed-side-menu" style={{ height: "100vh" }}>
      <div className="px-4">
        <h3 className="text-center text-light">e-manage</h3>
      </div>
      <ul className="nav flex-column flex-grow-1">
        {menuItems.map((item) =>
          item.roles.includes(userRole) ? (
            <li key={item.path} className="nav-item p-2">
              <NavLink className="nav-link text-light" to={item.path}>
              <span><FontAwesomeIcon icon={item.icon} />  {item.text}</span>
              </NavLink>
            </li>
          ) : null
        )}
      </ul>
    </div>




    
    // <div className="bg-dark fixed-side-menu" style={{ height: "100vh" }}>
    //   <div className="px-4">
    //     <h3 className="text-center text-light">Votre Logo</h3>
    //   </div>
    //   <ul className="nav flex-column flex-grow-1">
    //     <li className="nav-item p-2">
    //       <NavLink className="nav-link text-light" to="/">
    //         Home
    //       </NavLink>
    //     </li>
    //     <li className="nav-item p-2 dropdown">
    //       <NavLink
    //         className="nav-link text-light dropdown-toggle"
    //         to="/users"
    //         id="usersDropdown"
    //         role="button"
    //         data-toggle="dropdown"
    //         aria-haspopup="true"
    //         aria-expanded="false"
    //       >
    //         User
    //       </NavLink>
    //       <div className="dropdown-menu" aria-labelledby="usersDropdown">
    //         {/* Ajouter les liens du dropdown ici */}
    //         <NavLink className="dropdown-item text-light" to="/users/add">
    //           Add User
    //         </NavLink>
    //         <NavLink className="dropdown-item text-light" to="/users/list">
    //           User List
    //         </NavLink>
    //         {/* Ajouter d'autres liens du dropdown ici */}
    //       </div>
    //     </li>
    //     <li className="nav-item p-2 text-secondary dropdown">
    //       <NavLink
    //         className="nav-link  dropdown-toggle"
    //         to="/requests"
    //         id="requestsDropdown"
    //         role="button"
    //         data-toggle="dropdown"
    //         aria-haspopup="true"
    //         aria-expanded="false"
    //       >
    //         Request
    //       </NavLink>
    //       <div className="dropdown-menu" aria-labelledby="requestsDropdown">
    //         {/* Ajouter les liens du dropdown ici */}
    //         <NavLink
    //           className="dropdown-item text-light"
    //           to="/requests/pending"
    //         >
    //           Pending Requests
    //         </NavLink>
    //         <NavLink
    //           className="dropdown-item text-light"
    //           to="/requests/approved"
    //         >
    //           Approved Requests
    //         </NavLink>
    //         {/* Ajouter d'autres liens du dropdown ici */}
    //       </div>
    //     </li>
    //     {/* <Dropdown>
    //       <Dropdown.Toggle id="dropdown-basic">Dropdown Button</Dropdown.Toggle>
    //       <Dropdown.Menu>
    //         <NavLink className="dropdown-item text-light" to="/products/list">
    //           Product List
    //         </NavLink>
    //         <NavLink className="dropdown-item text-light" to="/products">
    //           Product
    //         </NavLink>
    //       </Dropdown.Menu>
    //     </Dropdown> */}
    //     <li className="nav-item p-2">
    //       <NavLink className="nav-link text-light " to="/products">
    //         Product
    //       </NavLink>
    //     </li>
    //     {/* Ajouter d'autres Dropdowns pour Region et Department ici */}
    //     <li className="nav-item p-2">
    //       <NavLink className="nav-link text-light" to="/products/list">
    //         List Product
    //       </NavLink>
    //     </li>
    //     <li className="nav-item p-2">
    //       <NavLink className="nav-link text-light" to="/suppliers">
    //         Supplier
    //       </NavLink>
    //     </li>
    //     <li className="nav-item p-2">
    //       <NavLink className="nav-link text-light" to="/regions">
    //         Region
    //       </NavLink>
    //     </li>
    //     <li className="nav-item p-2">
    //       <NavLink className="nav-link text-light" to="/departments">
    //         Department
    //       </NavLink>
    //     </li>
    //   </ul>
    // </div>
  );
}

export default SideMenu;
