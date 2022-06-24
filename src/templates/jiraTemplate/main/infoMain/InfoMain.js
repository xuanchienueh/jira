import React from "react";

function renderMember(members) {
  return members?.map((member, i) => (
    <div className="avatar" key={i}>
      <img src={member.avatar} alt={member.name} />
    </div>
  ));
}

function InfoMain({ detailProject }) {
  const { members } = detailProject;
  console.log(detailProject);
  ///--
  return (
    <div className="info" style={{ display: "flex" }}>
      <div className="search-block">
        <input className="search" />
        <i className="fa fa-search" />
      </div>
      <div className="avatar-group" style={{ display: "flex" }}>
        {renderMember(members)}
        {/* 
        <div className="avatar">
          <img src="./assets/img/download (2).jfif" alt="alt" />
        </div>
        */}
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Only My Issues
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Recently Updated
      </div>
    </div>
  );
}

export default InfoMain;
