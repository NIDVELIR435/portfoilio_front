import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../stores/store.context";

const JwtPrivateComponent = ({ children }: { children: JSX.Element }) => {
  const { authStore } = useContext(StoreContext);

  // useEffect(()=> {
  //     console.log('effect', authStore.authenticated)
  // }, [authStore.authenticated])
  if (!authStore.authenticated)
    // not logged in so redirect to login page with the return url
    return <Navigate to="/sign-in" />;

  // authorized so return child components
  return children;
};

export const JwtRouteGuard = observer(JwtPrivateComponent);
