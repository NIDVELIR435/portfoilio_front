//modules
import React from "react";
import { Outlet } from "react-router-dom";

//styles
import "./App.css";

export const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};
