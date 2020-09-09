import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import SideNav from "./sideNav";
import TopNav from "./topNav";

const theme = {
  themeLight: "rgb(45, 52, 97)",
  themeMedium: "rgb(33,41, 80)",
  themeDark: "rgb(18,21,47)",
  input: "rgb(20,29,67)",
  gradientStocks: "linear-gradient(95deg, rgb(249, 58, 242), rgb(255,103,95))",
  accentBlue: "rgb(0,178,255)",
  accentTransparentBlue: "rgba(0,178,255, 0.5)",
  accentPurple: "rgb(165, 87, 246)",
  accentGreen: "rgb(65,194,55)",
  accentOrange: "rgb(255, 151, 145)",
  textLight: "rgb(255,255,255)",
  textMedium: "rgb(172, 181, 217)",
  textDark: "rgb(112, 119, 153)",
  gradient01: "linear-gradient(95deg, #31dccf, #244fe7)",
  gradient02: "linear-gradient(95deg, #01A692, #84CF00)",
  gradient03: "linear-gradient(95deg, #AC1753, #532E86)",
  gradient04: "linear-gradient(95deg, #E79330, #DA1C5C)",
  gradient05: "linear-gradient(95deg, #16D2DF, #E420FC)",
  gradient06: "linear-gradient(95deg, #FF8248, #5D099A)",
  gradient07: "linear-gradient(95deg, #FE7E47, #FD1B5F)",
  gradient08: "linear-gradient(95deg, #E79330, #16D2DF)",
  gradient09: "linear-gradient(95deg, #AC1753, #01A692)",
  gradient10: "linear-gradient(95deg, #244fe7, #DA1C5C)",
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
  color: ${theme.textLight};
  
}
button {
  padding: 6px 14px;
    color: ${theme.textLight};
    border-radius: 4px;
    transition: all 0.3s;
    background: transparent;
    cursor: pointer;
    font-size: 15px;
   
}
.text-dark {
  color: ${theme.textDark};
}
h2 {
  margin-bottom: 14px;
  font-size: 30px;
}
p {
  font-size: 20px;
}
.stocks-label {
  background: -webkit-linear-gradient(135deg, rgb(249, 58, 242), #e79330);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.cryptos-label {
  background: -webkit-linear-gradient(
      135deg,
      rgb(85, 126, 255),
      rgb(213, 62, 255)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.currencies-label {
  background: -webkit-linear-gradient(135deg, #84cf00, #01a692);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.listing {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  border-radius: 4px;
  padding: 4px 0;
}
.listing:not(:last-child) {
  border-bottom: 1px solid ${theme.textDark};

}
.listing-symbol {
  width: 120px;
  font-weight: 700;
  padding: 4px;
  transition: all .3s;
}
.listing-symbol-link {
  width: 120px;
  font-weight: 700;
  padding: 4px;
  transition: all .3s;
}

.listing-symbol-link:hover {
  color: ${theme.textDark}
}

@keyframes scaleInUnderline {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
.listing-amount {
  /* font-size: 24px; */
}
.listing:hover {
  background: ${theme.themeMedium};
}
.bold {
  font-weight: 700;
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

  @media (max-width: 800px) {
    grid-template-columns: 180px calc(100% - 180px);
  }
  @media (max-width: 720px) {
    grid-template-columns: 100%;
  }
`;

const MainStyles = styled.main`
  background: ${theme.themeDark};
  color: ${theme.textLight};
  padding: 32px;
  min-height: calc(100vh - 60px);
  @media (max-width: 720px) {
    padding-top: 74px;
    width: 100%;
    grid-column: 1/2;
  }
  @media (max-width: 540px) {
    padding: 16px;
    padding-top: 74px;
  }
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
