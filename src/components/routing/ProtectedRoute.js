import React from "react";
import { useRecoilValue } from "recoil";
import { Route, Redirect } from "react-router-dom";
import { globalAuthState } from "../../index";

const ProtectedRoute = ({
  component: Component,

  path,
  ...rest
}) => {
  const currentUser = useRecoilValue(globalAuthState);
  return (
    <Route path={path} exact {...rest}>
      {currentUser ? <Component /> : <Redirect to="/signin" />}
    </Route>
  );
};

export default ProtectedRoute;
