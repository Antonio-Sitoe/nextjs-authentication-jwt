import React, { useContext } from "react";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { AuthContext } from "../contexts/AuthContext";
import { setupAPIClient } from "../services/Api";

function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>{user?.email}</h1>
    </div>
  );
}

export default Dashboard;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiclient = setupAPIClient(ctx);
  const { data } = apiclient.get("/me");
  console.log({ data });
  return {
    props: {},
  };
});
