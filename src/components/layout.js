import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import SideNav from "./sideNav";
import TopNav from "./topNav";

const theme = {
  themeLight: "rgb(45, 52, 97)",
  themeMedium: "rgb(33,41, 80)",
  themeDark: "rgb(18,21,47)",
  input: "rgb(20,29,67)",
  accentBlue: "rgb(0,178,255)",
  accentTransparentBlue: "rgba(0,178,255, 0.5)",
  accentPurple: "rgb(165, 87, 246)",
  accentGreen: "rgb(65,194,55)",
  accentOrange: "rgb(255, 151, 145)",
  textLight: "rgb(255,255,255)",
  textDark: "rgb(112, 119, 153)",
  gain: "#26a69a",
  loss: "#ef5350",
  greenGradient: "linear-gradient(to right, rgb(78,200,48), rgb(26, 178, 78))",
  fontFamily: "'Noto Sans JP', sans-serif",
};

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: ${theme.fontFamily};
}

a {
  text-decoration: none;

}
.text-dark {
  color: ${theme.textDark};
}
.gain {
  color: ${theme.gain};
}
.loss {
  color: ${theme.loss}
}
.fade-in-up {
    animation: fadeInUp 0.3s;
  }
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LayoutStyles = styled.div`
  display: grid;
  grid-template-columns: 240px calc(100% - 240px);
  grid-template-rows: 60px calc(100% - 60px);
`;

const MainStyles = styled.main`
  background: ${theme.themeDark};
  color: ${theme.textLight};
  padding: 32px;
`;

const Layout = ({ children, auth, setAuth, user }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <LayoutStyles>
        <TopNav auth={auth} setAuth={setAuth} />
        <SideNav auth={auth} user={user} />
        <MainStyles>{children}</MainStyles>
      </LayoutStyles>
    </ThemeProvider>
  );
};
export default Layout;
