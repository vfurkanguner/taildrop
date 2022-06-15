import React, { useState, useRef } from "react";
import List from "./components/ComponentList";
import getIcons from "./icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  DesktopComputerIcon,
  DeviceMobileIcon,
  DeviceTabletIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import EmptyRenderer from "./components/EmptyRenderer";

const iconList = getIcons();

function App() {
  const [list, setList] = useState([]);
  const [theme, setTheme] = useState("indigo");
  const [darkMode, setDarkMode] = useState(false);

  const myRef = useRef(null);

  const handleScrollToLastElement = () => {
    myRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
  };

  const ViewIcons = [
    {
      icon: <DesktopComputerIcon className="h-6 w-6" />,
      name: "Desktop",
    },
    {
      icon: <DeviceMobileIcon className="h-6 w-6" />,
      name: "Mobile",
    },
    {
      icon: <DeviceTabletIcon className="h-6 w-6" />,
      name: "Tablet",
    },
    {
      icon: <TrashIcon className="h-6 w-6" />,
      name: "Clean",
      onClick: () => setList([]),
    },
  ];

  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-48 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-5 bg-blue-700 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-3xl font-bold text-white">TailDrop</h1>
            </div>
            <div className="mt-5 flex-1 flex flex-col px-4">
              <List
                handleScrollToLastElement={handleScrollToLastElement}
                iconList={iconList}
                theme={theme}
                darkMode={darkMode}
                list={list}
                setList={setList}
              />
            </div>
          </div>
        </div>
        <div className="md:pl-48 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none"></div>
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                {ViewIcons.map((icon) => {
                  return (
                    <button
                      key={icon.name}
                      className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={icon.onClick}
                    >
                      {icon.icon}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <main className="overflow-y-scroll h-screen">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="list">
                    {(provided, snapshot) => (
                      <main
                        className="py-4 pb-20"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {list.length < 1 ? (
                          <EmptyRenderer />
                        ) : (
                          list.map((component, index) => {
                            return (
                              <Draggable
                                index={index}
                                draggableId={component.name}
                                key={component.name}
                              >
                                {(provided, snapshot) => (
                                  <>
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {component}
                                    </div>
                                    <div ref={myRef}></div>
                                  </>
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
        </div>
      </div>
    </>
  );
}

export default App;

// Listeden sürüklediğim componentleri main'a yerleştiriyorum.
// Drag and Drop işlemi için draggable="true" ve onDragOver="onDragOver"
// attributeleri ekliyorum.
// Daha sonra main'de sürüklenen elemanları kendi içerisinde drag & drop yapıyorum
