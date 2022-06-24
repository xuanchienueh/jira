import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import { confirm } from "react-bootstrap-confirmation";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";
import ReactHtmlParser from "react-html-parser";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_PROJECT_SAGA_API, KEY_SEARCH_PROJECT } from "redux/saga/JiraSaga/actions/constName";
import { GET_ALL_PROJECT_SAGA_API } from "redux/saga/JiraSaga/actions/constName";
import { getCategory } from "redux/saga/JiraSaga/actions/actions";
import { OPEN_MODAL } from "redux/modal/modalReducer";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import EditProject from "./EditProject";
import RenderMember from "./RenderMember";
import { NavLink } from "react-router-dom";

const sizePerPageOptionRenderer = ({ text, page, onSizePerPageChange }) => (
  <li key={text} role="presentation" className="dropdown-item">
    <a
      href="#"
      tabIndex="-1"
      role="menuitem"
      data-page={page}
      onMouseDown={(e) => {
        e.preventDefault();
        onSizePerPageChange(page);
      }}
      style={{ color: "red", display: "block" }}
    >
      {text}
    </a>
  </li>
);

const options = {
  // sizePerPage: 5,
  sizePerPageOptionRenderer,
  onSizePerPageChange: (sizePerPage, page) => {
    console.log("Size per page change!!!");
    console.log("Newest size per page:" + sizePerPage);
    console.log("Newest page:" + page);
  },
  onPageChange: (page, sizePerPage) => {
    console.log("Page change!!!");
    console.log("Newest size per page:" + sizePerPage);
    console.log("Newest page:" + page);
  },
};

function ManagementPJ() {
  const dispatch = useDispatch();
  const timerID = useRef();
  const columns = useRef();

  const [valueSearch, setValueSearch] = useState(undefined);
  const { allProject, category } = useSelector((state) => state.ProjectReducer);

  //--
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_SAGA_API, payload: valueSearch });
    getCategory(dispatch);
    return () => clearTimeout(timerID.current);
  }, [valueSearch]);

  const handleSearch = (e) => {
    let valueSearchInput = e.target.value;
    if (timerID.current) clearTimeout(timerID.current);
    timerID.current = setTimeout(() => {
      setValueSearch(valueSearchInput);
      dispatch({ type: KEY_SEARCH_PROJECT, payload: valueSearchInput });
    }, 500);
  };

  columns.current = [
    {
      dataField: "projectName",
      text: "Project Name",
      editable: false,
      formatter: (cell, row) => {
        return <NavLink to={`/projectDetail/${row.id}`}>{cell}</NavLink>;
      },
    },
    { dataField: "creator.name", text: "Creator", editable: false },
    /* {
      dataField: "description",
      text: "Description",
      editable: false,
      formatter: (cell, row) => {
        let jsxContent = ReactHtmlParser(cell);
        return <>{jsxContent}</>;
      },
    }, */
    {
      dataField: "members",
      text: "Members",
      editable: false,
      formatter: (cell, row) => <RenderMember cell={cell} row={row} />,
    },
    { dataField: "categoryName", text: "Category Project", editable: false },
    {
      dataField: "id",
      text: "Action",
      editable: true,
      formatter: (cell, row) => renderAction(cell, row, dispatch),
    },
  ];

  //---
  return (
    <div className="container">
      <h3 className="text-center">List Project</h3>

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Search
          </span>
        </div>
        <input className="form-control" onChange={handleSearch} />
      </div>

      <BootstrapTable
        keyField="id"
        data={allProject}
        columns={columns.current}
        pagination={paginationFactory(options)}
        cellEdit={cellEditFactory({
          mode: "click",
          onStartEdit: (row, column, rowIndex, columnIndex) => {
            console.log("start to edit!!!");
          },
          beforeSaveCell: (oldValue, newValue, row, column) => {
            console.log("Before Saving Cell!!");
          },
          afterSaveCell: (oldValue, newValue, row, column) => {
            console.log("After Saving Cell!!");
          },
        })}
      />
    </div>
  );
}

export default ManagementPJ;

const deleteProject = async (dispatch, cell) => {
  const result = await confirm("Are you really sure?");
  result && dispatch({ type: DELETE_PROJECT_SAGA_API, payload: cell });
};

const updateProject = (dispatch, row) => {
  dispatch({
    type: OPEN_MODAL,
    payload: {
      componentBody: <EditProject project={row} />,
      headerModal: "Update Project",
      dialogClassName: "modal-90w",
      size: "",
    },
  });
};

const renderAction = (cell, row, dispatch) => (
  <span>
    <button className="btn" onClick={() => deleteProject(dispatch, cell)}>
      <i className="fas fa-trash fa-2x text-danger"></i>
    </button>
    <button className="btn" onClick={() => updateProject(dispatch, row)}>
      <i className="fas fa-edit fa-2x text-success"></i>
    </button>
  </span>
);
