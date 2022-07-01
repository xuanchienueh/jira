import HeaderHomeTemplate from "components/headerHomeTemplate/HeaderHomeTemplate";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { USER_JIRA } from "utils/config";
import { useNavigate } from "react-router-dom";

function HomeTemplate() {
  const navigate = useNavigate();
  let infoUserLogin = JSON.parse(localStorage.getItem(USER_JIRA));
  useEffect(() => {
    infoUserLogin ? navigate("jira") : navigate("login");
  }, []);

  return (
    <>
      <HeaderHomeTemplate />
      <Outlet />
    </>
  );
}

export default HomeTemplate;
