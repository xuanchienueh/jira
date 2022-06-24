import { useState, useEffect, useRef } from "react";
import { Overlay, Popover, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL, OPEN_MODAL } from "redux/modal/modalReducer";
import {
  ADD_USER_IN_PROJECT_SAGA_API,
  GET_MEMBER_BY_PROJECT_ID_SAGA_API,
  GET_USER_SAGA_API,
  REMOVE_USER_FROM_PROJECT_SAGA_API,
  GET_ALL_PROJECT_SAGA_API,
} from "redux/saga/JiraSaga/actions/constName";
import debounceFnc from "hooks/useDebounce";

const RenderMember = ({ cell, row, ...props }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const { memberOfProject } = useSelector((state) => state.UserReducer);
  const { keySearchPJ } = useSelector((state) => state.ProjectReducer);

  //--
  const handleOpenPopover = (e) => {
    setTarget(e.target);
    setShow(!show);
    dispatch({ type: GET_MEMBER_BY_PROJECT_ID_SAGA_API, payload: row.id });
  };

  //--
  const handleDeleteMemberFromProject = (member) => {
    const payload = { userId: member.userId, projectId: row.id };
    dispatch({ type: REMOVE_USER_FROM_PROJECT_SAGA_API, payload });
  };

  //--
  return (
    <>
      <div ref={ref}>
        <span role="button" onClick={handleOpenPopover}>
          {cell?.slice(0, 3).map((item) => (
            <img key={item.userId} className="mr-1 rounded-circle" src={item.avatar} width={30} />
          ))}
          {cell?.length >= 3 && <span>...</span>}
        </span>

        <button
          className="btn"
          onClick={() => {
            dispatch({
              type: OPEN_MODAL,
              payload: {
                componentBody: <AddMember projectId={row.id} />,
                headerModal: "Add User in Project",
                dialogClassName: "",
                size: "sm",
              },
            });
          }}
        >
          <i className="fas fa-plus-circle fa-2x text-warning"></i>
        </button>
      </div>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref.current}
        containerPadding={20}
        rootClose={true}
        onHide={() => setShow(false)}
        onExit={() => dispatch({ type: GET_ALL_PROJECT_SAGA_API, payload: keySearchPJ })}
      >
        <Popover id="popover-member">
          <Popover.Title as="h3">Member of project</Popover.Title>
          <Popover.Content>
            <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>UserId</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {memberOfProject?.map((member) => (
                    <tr key={member.userId}>
                      <td>{member.userId}</td>
                      <td>{member.name}</td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => handleDeleteMemberFromProject(member)}
                        >
                          <i className="fas fa-trash fa-2x text-danger"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Popover.Content>
        </Popover>
      </Overlay>
    </>
  );
};

export default RenderMember;

//---
function AddMember({ projectId }) {
  const dispatch = useDispatch();
  const [keySearch, setKeySearch] = useState(null);
  const { listUser } = useSelector((state) => state.UserReducer);

  //--
  useEffect(() => {
    dispatch({ type: GET_USER_SAGA_API, payload: keySearch });
    return () => {};
  }, [keySearch]);

  // debounce Search
  const handleChangeSearch = debounceFnc((e) => {
    setKeySearch(e.target.value);
  }, 400);

  //--
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: CLOSE_MODAL });
      }}
    >
      <div className="form-group">
        <input
          onChange={handleChangeSearch}
          type="text"
          className="form-control"
          placeholder="Search"
        />
      </div>

      <div className="form-group" style={{ maxHeight: "500px", overflowY: "scroll" }}>
        {listUser?.map((item, i) => (
          <div key={i} className="form-check">
            <button
              type="button"
              className="btn"
              onClick={() => {
                dispatch({
                  type: ADD_USER_IN_PROJECT_SAGA_API,
                  payload: { userId: item.userId, projectId },
                });
              }}
            >
              <img className="rounded-circle" src={item.avatar} alt={item.name} width={30} />
              {item.name}
            </button>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-success ">
          Close
        </button>
      </div>
    </form>
  );
}
