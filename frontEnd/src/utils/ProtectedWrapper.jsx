// import AuthContext from "./AuthContext";
// import { useContext } from "react";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";


function ProtectedWrapper(props){
    const token = localStorage.getItem("token");

    if(!token){
        return <Navigate to="/login" replace/>
    }
    return props.children;
}

ProtectedWrapper.propTypes = {
    children:PropTypes.node.isRequired,
};
export default ProtectedWrapper;