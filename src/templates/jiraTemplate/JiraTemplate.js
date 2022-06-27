import React from "react";
import { Outlet } from "react-router-dom";
import "./jiraTemplate.css";
import Menu from "./menu/Menu";
import ModalSearch from "./modalSearch/ModalSearch";
import ModalTaskDetail from "./ModalTaskDetail/ModalTaskDetail";
import Sidebar from "./sidebar/Sidebar";

function JiraTemplate() {
  return (
    <>
      <div className="jira">
        <Sidebar />

        <Menu />

        <Outlet />
      </div>

      <div>
        {/* Search Modal */}
        <ModalSearch />
        {/* Info Modal */}
        <ModalTaskDetail />
      </div>
    </>
  );
}

export default JiraTemplate;
