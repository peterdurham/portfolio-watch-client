import React from "react";
import { useQuery } from "@apollo/client";
import { ContainerStyles } from "../styles/containerStyles";
import PleaseSignIn from "./auth/pleaseSignIn";
import { portfolioQuery } from "../graphql/portfolio";

const Portfolio = () => {
  const { data, loading, error } = useQuery(portfolioQuery);

  if (loading) return <div>...loading</div>;
  return (
    <ContainerStyles>
      <PleaseSignIn>
        <h1 className="fade-in-up">Portfolio go here</h1>
      </PleaseSignIn>
    </ContainerStyles>
  );
};

export default Portfolio;
