//modules
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

//store
import { StoreContext } from "../stores/store.context";

const JwtPrivateComponent = ({ children }: { children: JSX.Element }) => {
  const { authStore } = useContext(StoreContext);
  const [authenticated, setAuthenticated] = useState(authStore.authenticated);

  useEffect(() => {
    authStore
      .refreshToken()
      .then((value) => {
        setAuthenticated(authStore.authenticated);
      })
      .catch((reason) => {
        setAuthenticated(false);
      });
  }, [authStore.authenticated]);

  if (!authenticated)
    // not logged in so redirect to login page with the return url
    return <Navigate to="/sign-in" />;

  // authorized so return child components
  return children;
};

export const JwtRouteGuard = observer(JwtPrivateComponent);
