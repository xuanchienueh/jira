import HeaderHomeTemplate from "components/headerHomeTemplate/HeaderHomeTemplate";
import React from "react";
import { Outlet } from "react-router-dom";

function HomeTemplate() {
  return (
    <>
      <HeaderHomeTemplate />
      <Outlet />
    </>
  );
}

export default HomeTemplate;
