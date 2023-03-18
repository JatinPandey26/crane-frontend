import { Route, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route {...rest} element={auth ? <Component /> : <Navigate replace to={"/explore"} />}
    />
  );
};
