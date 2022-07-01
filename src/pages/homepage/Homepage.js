import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Homepage() {
  return (
    <div className="container">
      <NavLink to="/login">login</NavLink>
      {/*  <DragDropContext onDragEnd={hanldeDragEnd}>
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
      </DragDropContext> */}
    </div>
  );
}

export default Homepage;
