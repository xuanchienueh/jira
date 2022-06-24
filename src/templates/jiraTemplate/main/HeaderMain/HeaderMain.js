import React from "react";

function HeaderMain({ detailProject }) {
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">CyberLearn</li>
          <li className="breadcrumb-item active" aria-current="page">
            {detailProject.projectName}
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default HeaderMain;
