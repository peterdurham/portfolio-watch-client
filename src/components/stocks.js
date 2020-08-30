import React from "react";

import { ContainerStyles } from "../styles/containerStyles";
import PleaseSignIn from "./auth/pleaseSignIn";

const Stocks = () => {
  return (
    <ContainerStyles>
      <PleaseSignIn>
        <h1 className="fade-in-up">Stocks go here</h1>
      </PleaseSignIn>
    </ContainerStyles>
  );
};

export default Stocks;
