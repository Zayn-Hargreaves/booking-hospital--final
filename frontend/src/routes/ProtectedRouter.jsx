import {useContext} from "react";
import {Navigate} from "react-router-dom"
import { authContext } from "../context/AuthContext";
const ProtectedRouter =({children, allowRoles}) =>{
    const {token, role} = useContext(authContext);
    const isAllowed = allowRoles.includes(role)
    const accessibleRoute = token && isAllowed ? children: <Navigate to="/login" replace={true} />
    return accessibleRoute;
}
export default ProtectedRouter;