import React from "react";

import { ContainerStyles } from "../styles/containerStyles";
import PleaseSignIn from "./auth/pleaseSignIn";
import { useQuery } from "@apollo/client";
import { getUserQuery } from "../graphql/auth";

const Dashboard = () => {
  const { data, loading } = useQuery(getUserQuery);

  if (loading) return <div>...loading</div>;

  return (
    <ContainerStyles>
      <PleaseSignIn>
        <h1 className="fade-in-up">Dashboard go here</h1>
        <p>Logged in as: {data && data.getUser && data.getUser.email}</p>
      </PleaseSignIn>
    </ContainerStyles>
  );
};

export default Dashboard;
