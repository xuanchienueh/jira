import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";

let defaultobj = {
  todo: {
    id: "todo",
    items: [
      { id: "1todo", name: "todo 1" },
      { id: "2todo", name: "todo 2" },
      { id: "3todo", name: "todo 3" },
    ],
  },
  inProcess: {
    id: "inProcess",
    items: [
      { id: "1inProcess", name: "process1" },
      { id: "2inProcess", name: "process2" },
      { id: "3inProcess", name: "process3" },
    ],
  },
  done: {
    id: "done",
    items: [
      { id: "1done", name: "done1" },
      { id: "2done", name: "done2" },
      { id: "3done", name: "done3" },
    ],
  },
};
function Homepage() {
  const [state, setState] = useState(defaultobj);
  const hanldeDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    // console.log("destination", destination);
    // console.log("source", source);
    let fromDarg = state[source.droppableId];
    let toDarg = state[destination.droppableId];
    // console.log("fromDarg", fromDarg);
    // console.log("toDarg", toDarg);
    if (destination.droppableId != source.droppableId) {
      setState((prev) => {
        let itemsFrom = [...fromDarg.items];
        itemsFrom.splice(source.index, 1);

        let itemsTo = toDarg.items;
        itemsTo.splice(destination.index, 0, fromDarg.items[source.index]);
        return {
          ...prev,
          [source.droppableId]: { ...fromDarg, items: itemsFrom },
          [destination.droppableId]: { ...toDarg, items: itemsTo },
        };
      });
    } else {
      setState((prev) => {
        let itemsFrom = [...fromDarg.items];
        itemsFrom[source.index] = fromDarg.items[destination.index];
        itemsFrom[destination.index] = fromDarg.items[source.index];

        return {
          ...prev,
          [source.droppableId]: { ...fromDarg, items: itemsFrom },
        };
      });
    }
  };
  return (
    <div className="container">
      <NavLink to="/login">login</NavLink>
      <DragDropContext onDragEnd={hanldeDragEnd}>
        <div className="row">
          {_.map(state, (item, key) => {
            return (
              <Droppable key={key} droppableId={key}>
                {(provided, snapshot) => {
                  // console.log(provided, snapshot);
                  return (
                    <div className="col-4 ">
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="p-4 py-5 bg-primary text-center"
                        key={key}
                      >
                        {item.id}
                        {provided.placeholder}
                        {item.items.map((item1, i) => {
                          // console.log(item1, i);
                          return (
                            <Draggable key={item1.id} index={i} draggableId={item1.id}>
                              {(provided, snapshot) => {
                                console.log(snapshot);
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-2 py-5 bg-warning"
                                  >
                                    {item1.name}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                      </div>
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Homepage;
