import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <>
      {/* menu */}
      <div className="menu">
        <div className="account">
          <div className="avatar">
            <img src="./assets/img/download.jfif" alt="alt" />
          </div>
          <div className="account-info">
            <p>CyberLearn.vn</p>
            <p>Report bugs</p>
          </div>
        </div>
        <div className="control">
          <div>
            <i className="fa fa-credit-card mr-2" />
            <NavLink
              to="/jira"
              // className={({ isActive }) => (isActive ? "text-dark font-weight-bold" : "text-dark")}
              style={({ isActive }) => (isActive ? { color: "red" } : { color: "black" })}
            >
              Cyber Board
            </NavLink>
          </div>
          <div>
            <i className="fa fa-credit-card mr-2" />
            <NavLink
              to="/project_management"
              // className={({ isActive }) => (isActive ? "text-dark font-weight-bold" : "text-dark")}
              style={({ isActive }) => (isActive ? { color: "red" } : { color: "black" })}
            >
              Project management
            </NavLink>
          </div>
          <div>
            <i className="fa fa-cog mr-2" />
            <NavLink
              to="/createproject"
              // className={({ isActive }) => (isActive ? "text-dark font-weight-bold" : "text-dark")}
              style={({ isActive }) => (isActive ? { color: "red" } : { color: "black" })}
            >
              Create Project
            </NavLink>
          </div>
        </div>
        <div className="feature">
          <div>
            <i className="fa fa-truck" />
            <span>Releases</span>
          </div>
          <div>
            <i className="fa fa-equals" />
            <span>Issues and filters</span>
          </div>
          <div>
            <i className="fa fa-paste" />
            <span>Pages</span>
          </div>
          <div>
            <i className="fa fa-location-arrow" />
            <span>Reports</span>
          </div>
          <div>
            <i className="fa fa-box" />
            <span>Components</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
