import { Navigate } from "react-router-dom";
import { useAuthServer } from "./auth/myServerAuthContext";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
  const { currentUser } = useAuthServer();
  return currentUser ? children : <Navigate to="/About" />;
}
