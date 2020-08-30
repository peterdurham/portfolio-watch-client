import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaChartPie } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GiChart, GiMoneyStack } from "react-icons/gi";
import { RiBitCoinLine } from "react-icons/ri";
import { useQuery } from "@apollo/client";
import { getUserQuery } from "../graphql/auth";

const SideNavStyles = styled.div`
  height: 100vh;
  background: ${(props) => props.theme.themeMedium};
  color: ${(props) => props.theme.textDark};

  font-size: 17px;

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
  const { data } = useQuery(getUserQuery);

  const user = data && data.getUser ? data.getUser.email : null;

  return (
    <SideNavStyles>
      {/* <div id="user-select">{user && <span> {user} ▼</span>}</div> */}

      <h3>Main</h3>
      <NavLink to="/portfolio" activeClassName="selected">
        <FaChartPie />
        <span>Portfolio</span>
      </NavLink>
      <NavLink to="/settings" activeClassName="selected">
        <FiSettings />
        <span>Settings</span>
      </NavLink>
      <h3>Assets</h3>
      <NavLink to="/stocks" activeClassName="selected">
        <GiChart />
        <span>Stock</span>
      </NavLink>
      <NavLink to="/cryptos" activeClassName="selected">
        <RiBitCoinLine />
        <span>Crypto</span>
      </NavLink>
      <NavLink to="/currencies" activeClassName="selected">
        <GiMoneyStack />
        <span>Currency</span>
      </NavLink>
    </SideNavStyles>
  );
};

export default SideNav;
