import React, { useContext } from "react";
import { withSSRAuth } from "../utils/withSSRAuth";
import { AuthContext } from "../contexts/AuthContext";
import { setupAPIClient } from "../services/Api";
import Can from "../components/Can";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>{user?.email}</h1>
      <Can>
        <h1>Metricas</h1>
      </Can>
    </div>
  );
}

export default Dashboard;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiclient = setupAPIClient(ctx);
  const { data } = await apiclient.get("/me");

  return {
    props: {
      data,
    },
  };
});
