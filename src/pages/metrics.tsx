import React from "react";
import Can from "../components/Can";
import { withSSRAuth } from "../utils/withSSRAuth";
import { setupAPIClient } from "../services/Api";

function Metrics() {
  return (
    <div>
      <h1>Metricas</h1>
    </div>
  );
}

export default Metrics;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiclient = setupAPIClient(ctx);
  const { data } = await apiclient.get("/me");

  const user = 

  return {
    props: {
      data,
    },
  };
});
