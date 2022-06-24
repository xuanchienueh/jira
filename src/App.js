import "./App.css";
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Loading from "./pages/loading/Loading";
import Homepage from "pages/homepage/Homepage";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import HomeTemplate from "templates/hometemplate/HomeTemplate";
import JiraTemplate from "templates/jiraTemplate/JiraTemplate";
import Main from "templates/jiraTemplate/main/Main";
import CreateProject from "templates/jiraTemplate/createProject/CreateProject";
import ManagementPJ from "templates/jiraTemplate/managementProject/ManagementPJ";
import ModalComponent from "components/modal/ModalComponent";

export const history = createBrowserHistory({ window });
const CustomRouter = ({ children, ...props }) => {
  return (
    <HistoryRouter history={history} {...props}>
      {children}
    </HistoryRouter>
  );
};

//
function App() {
  return (
    <div className="App">
      <Loading />
      <ModalComponent />
      {/* <BrowserRouter> */}
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<HomeTemplate />}>
            <Route path="/home" element={<Homepage />} />
          </Route>

          <Route path="/login" element={<Login />} />

          <Route element={<JiraTemplate />}>
            <Route path="jira" element={<Main />} />
            <Route path="createproject" element={<CreateProject />} />
            <Route path="project_management" element={<ManagementPJ />} />
            <Route path="projectDetail">
              <Route path=":projectId" element={<Main />} />
            </Route>
          </Route>
        </Routes>
      </HistoryRouter>
      {/* </BrowserRouter> */}
    </div>
  );
}
export default App;
