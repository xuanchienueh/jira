import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_DETAIL_PROJECT_SAGA_API } from "redux/saga/JiraSaga/actions/constName";

import ContentMain from "./contentMain/ContentMain";
import HeaderMain from "./HeaderMain/HeaderMain";
import InfoMain from "./infoMain/InfoMain";

function Main() {
  let { projectId } = useParams();
  const dispatch = useDispatch();
  const { detailProject } = useSelector((state) => state.ProjectReducer);
  //--
  useEffect(() => {
    dispatch({ type: GET_DETAIL_PROJECT_SAGA_API, payload: projectId });
    return () => {};
  }, []);

  return (
    <div className="main">
      <HeaderMain detailProject={detailProject} />
      <h3>{detailProject.projectName}</h3>
      <InfoMain detailProject={detailProject} />

      <ContentMain />
    </div>
  );
}

export default Main;
