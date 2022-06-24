import React from "react";
import { NavLink } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <NavLink to="/login">login</NavLink>
    </div>
  );
}

export default Homepage;
