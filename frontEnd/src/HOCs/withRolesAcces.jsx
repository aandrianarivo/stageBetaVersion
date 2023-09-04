import { useContext } from "react";
import AuthContext from "../utils/AuthContext";


const withRoleAccess = (allowedRoles, WrappedComponent) => {
  const WithRoleAccess = (props) => {
    const authContext = useContext(AuthContext);
    const userRole = authContext.userRole;

    if (allowedRoles.includes(userRole)) {
      return <WrappedComponent {...props} />;
    } else {
      return <p>Access denied for this role.</p>;
    }
  };

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithRoleAccess.displayName = `withRoleAccess(${displayName})`;

  return WithRoleAccess;
};

export default withRoleAccess;
