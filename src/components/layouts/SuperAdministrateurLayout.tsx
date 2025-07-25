import React from "react";
import { Outlet } from "react-router-dom";

const SuperAdministrateurLayout: React.FC = () => {
  return (
    <div>
      <h2>Super Administrateur</h2>
      <Outlet />
    </div>
  );
};

export default SuperAdministrateurLayout;
