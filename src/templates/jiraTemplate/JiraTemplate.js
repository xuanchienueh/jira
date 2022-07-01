import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { USER_JIRA } from "utils/config";
import "./jiraTemplate.css";
import Menu from "./menu/Menu";
import ModalSearch from "./modalSearch/ModalSearch";
import ModalTaskDetail from "./ModalTaskDetail/ModalTaskDetail";
import Sidebar from "./sidebar/Sidebar";

function JiraTemplate() {
  let infoUserLogin = JSON.parse(localStorage.getItem(USER_JIRA));
  const navigate = useNavigate();
  useEffect(() => {
    if (!infoUserLogin) navigate("login");
  }, []);

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
