import React from "react";

import { ContainerStyles } from "../styles/containerStyles";
import PleaseSignIn from "./auth/pleaseSignIn";

const Settings = () => {
  return (
    <ContainerStyles>
      <PleaseSignIn>
        <h1 className="fade-in-up">Settings go here</h1>
      </PleaseSignIn>
    </ContainerStyles>
  );
};

export default Settings;
