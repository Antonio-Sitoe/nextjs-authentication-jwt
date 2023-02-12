import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>{user?.email}</h1>
    </div>
  );
}

export default Dashboard;
