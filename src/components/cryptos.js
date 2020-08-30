import React from "react";

import { ContainerStyles } from "../styles/containerStyles";
import PleaseSignIn from "./auth/pleaseSignIn";

const Cryptos = () => {
  return (
    <ContainerStyles>
      <PleaseSignIn>
        <h1 className="fade-in-up">Cryptos go here</h1>
      </PleaseSignIn>
    </ContainerStyles>
  );
};

export default Cryptos;
