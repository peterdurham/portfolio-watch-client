import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaChartPie } from "react-icons/fa";
import { GiChart, GiMoneyStack } from "react-icons/gi";
import { RiBitCoinLine } from "react-icons/ri";

const SideNavStyles = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.themeMedium};
  color: ${(props) => props.theme.textDark};
  font-size: 17px;
  @media (max-width: 720px) {
    display: none;
  }

  #user-select {
    height: 52px;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding-left: 16px;
    color: ${(props) => props.theme.textLight};
  }

  h3 {
    font-size: 14px;
    height: 42px;
    line-height: 42px;
    color: ${(props) => props.theme.textLight};
    padding-left: 16px;
  }
  svg {
    margin-right: 8px;
    font-size: 22px;
  }
  a {
    height: 52px;
    line-height: 52px;
    width: 100%;
    display: inline-block;
    color: ${(props) => props.theme.textDark};
    padding-left: 32px;
    display: flex;
    align-items: center;
  }
  a.selected,
  a:hover {
    background: linear-gradient(
      to right,
      ${(props) => props.theme.accentTransparentBlue},
      ${(props) => props.theme.themeMedium}
    );
    color: ${(props) => props.theme.textLight};
  }
`;

const SideNav = () => {
  return (
    <SideNavStyles>
      <h3>Main</h3>
      <NavLink to="/portfolio" activeClassName="selected">
        <FaChartPie />
        <span>Portfolio</span>
      </NavLink>

      <h3>Assets</h3>
      <NavLink to="/stocks" activeClassName="selected">
        <GiChart />
        <span>Stocks</span>
      </NavLink>
      <NavLink to="/cryptos" activeClassName="selected">
        <RiBitCoinLine />
        <span>Cryptos</span>
      </NavLink>
      <NavLink to="/currencies" activeClassName="selected">
        <GiMoneyStack />
        <span>Currencies</span>
      </NavLink>
    </SideNavStyles>
  );
};

export default SideNav;
