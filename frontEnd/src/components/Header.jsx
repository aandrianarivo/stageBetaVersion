import "bootstrap/dist/css/bootstrap.min.css";
import image from "../assets/avatars/avatar-alcides-antonio.png";
import "./header.css";
import AuthContext from "../utils/AuthContext";
import { useContext, useEffect, useState } from "react";
import socketIoClient from "socket.io-client";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import iconn from '../assets/avatars/avatar-cao-yu.png'
const socket = socketIoClient("http://localhost:5000");

const Header = () => {
  const authContext = useContext(AuthContext);
  const userName = authContext.user;
  const { userRole } = useContext(AuthContext);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    authContext.signout();
    localStorage.removeItem("token");
    toast.success("Signout succes");
  };

  useEffect(() => {
    // socket.on('newRequestTL',()=>{
    //   setNotificationCount(add)
    // })});
    socket.on("newRequestTL", () => {
      setNotificationCount((prevCount) => prevCount + 1);
    });
    socket.on("forAdmin", (data) => {
      setNotificationCount((prevCount) => prevCount + 1);
      const title = "New request";
      const options = {
        body: data.message,
        icon: "../assets/avatars/avatar-cao-yu.png", // Remplacez par le chemin de votre icône
      };

      if (Notification.permission === "granted") {
        new Notification(title, options);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(title, options);
          }
        });
      }

      return () => {
        socket.disconnect();
      };
    });
  }, []);
  const handleBadgeClick = () => {
    navigate("/requests");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <ToastContainer/>
      <div className="container-fluid d-flex justify-content-end">
        {/* collapse navbar-collapse */}
        <div style={{ }} className=" d-flex align-items-center ms-auto"  id="navbarSupportedContent">
          <div className="d-flex align-items-center ">
            <div>
              {userRole == "tl" ? (
                <IconButton onClick={handleBadgeClick}>
                  <Badge
                    color="secondary"
                    badgeContent={notificationCount}
                    variant="dot"
                  >
                    <NotificationsIcon fontSize="large" color="action" />
                  </Badge>
                </IconButton>
              ) : userRole == "admin" ? (
                <IconButton onClick={handleBadgeClick}>
                  <Badge
                    color="secondary"
                    badgeContent={notificationCount}
                    variant="dot"
                  >
                    <NotificationsIcon fontSize="large" color="action" />
                  </Badge>
                </IconButton>
              ) : null}
            </div>
            <img
              src={image}
              alt="User"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px" }}
            />
            <div className="me-2">
              <p className="mb-0">{userName}</p>
              {/* Affichez ici l'email de l'utilisateur */}
              {/* <span> {userEmail} </span> */}
            </div>
            <button className="btn btn-lg" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;

// {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         {/* Logo ou titre de la navbar */}
//         <Link className="navbar-brand" to="/">
//           Votre Logo
//         </Link>

//         {/* Bouton pour activer/désactiver le menu déroulant sur les écrans plus petits */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Menu déroulant avec les éléments de la navbar */}
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Accueil
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/users">
//                 Utilisateurs
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/requests">
//                 Demandes
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/regions">
//                 Régions
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/departments">
//                 Départements
//               </Link>
//             </li>
//           </ul>

//           {/* Section pour afficher le nom et l'email de l'utilisateur connecté */}
//           {/* Vous pouvez ajouter ici un code similaire à celui dans SideMenu */}
//         </div>
//       </div>
//     </nav> */}

//fonctionnel(AZO EKENA)
// return (
//   <nav className="navbar navbar-expand-lg navbar-light bg-light">
//     <div className="container-fluid">
//       {/* Logo ou titre de la navbar */}
//       {/* <a className="navbar-brand" href="/">
//         Votre Logo
//       </a> */}

//       {/* Bouton pour activer/désactiver le menu déroulant sur les écrans plus petits */}
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarSupportedContent"
//         aria-controls="navbarSupportedContent"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       {/* Menu déroulant avec les éléments de la navbar */}
//       <div className="collapse navbar-collapse" id="navbarSupportedContent">
//         <ul className="navbar-nav me-auto mb-1 mb-lg-0">
//           {/* Vous pouvez ajouter des éléments ici si nécessaire */}
//         </ul>

//         {/* Barre de recherche */}
//         <form className="d-flex mx-2">
//           <input
//             className="form-control me-2"
//             type="search"
//             placeholder="Rechercher"
//             aria-label="Search"
//           />
//           <button className="btn btn-outline-success" type="submit">
//             Rechercher
//           </button>
//         </form>

//         {/* Section pour afficher le nom et la photo de l'utilisateur connecté */}
//         <div className="d-flex align-items-center">
//           <img
//             src={image}
//             alt="User"
//             className="rounded-circle me-2"
//             style={{ width: "40px", height: "40px" }}
//           />
//           <div className="me-2">
//             <p className="mb-0">{userName}</p>
//             {/* Affichez ici l'email de l'utilisateur */}
//             {/* <span> {userEmail} </span> */}
//           </div>
//           <button className="btn btn-outline-danger" onClick={handleLogout}>
//             Déconnexion
//           </button>
//         </div>
//       </div>
//     </div>
//   </nav>
// );
