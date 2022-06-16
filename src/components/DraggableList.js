import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TrashIcon } from "@heroicons/react/solid";
import { PencilAltIcon, CheckIcon } from "@heroicons/react/outline";
import EmptyRenderer from "./EmptyRenderer";

export default function DraggableList({
  list,
  setList,
  markupRef,
  deviceView,
  theme,
}) {
  const [contentEditable, setContentEditable] = useState(false);
  const [isEditButtonsVisible, setIsEditButtonsVisible] = useState(false);
  const [componentName, setComponentName] = useState("");

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
  };

  return (
    <main className={`overflow-y-scroll h-screen mt-10`}>
      <div className="py-6">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ${deviceView} ${theme}`}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {(provided, snapshot) => (
                <main
                  className="py-4 pb-20"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {list?.length < 1 ? (
                    <EmptyRenderer />
                  ) : (
                    list?.map((component, index) => {
                      return (
                        <Draggable
                          index={index}
                          draggableId={component.name}
                          key={component.name}
                        >
                          {(provided, snapshot) => (
                            <div>
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="relative">
                                  {isEditButtonsVisible &&
                                  component.name === componentName ? (
                                    <>
                                      <button
                                        className="absolute right-5 top-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                                        onClick={() =>
                                          setContentEditable(!contentEditable)
                                        }
                                      >
                                        {!contentEditable ? (
                                          <PencilAltIcon className="h-5 w-5" />
                                        ) : (
                                          <CheckIcon className="h-5 w-5" />
                                        )}
                                      </button>
                                      <button
                                        className="absolute left-5 border top-5 border-blue-200 text-blue-500 font-bold py-2 px-2 rounded"
                                        onClick={() =>
                                          setList((prevList) => {
                                            return prevList.filter(
                                              (item) =>
                                                item.name !== component.name
                                            );
                                          })
                                        }
                                      >
                                        <TrashIcon className="h-5 w-5" />
                                      </button>{" "}
                                    </>
                                  ) : null}
                                  <div
                                    ref={markupRef}
                                    onInput={(e) =>
                                      console.log(e.currentTarget.textContent)
                                    }
                                    contentEditable={contentEditable}
                                    onMouseOver={() => {
                                      setIsEditButtonsVisible(true);
                                      setComponentName(component.name);
                                    }}
                                  >
                                    {component}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })
                  )}
                  {provided.placeholder}
                </main>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </main>
  );
}
