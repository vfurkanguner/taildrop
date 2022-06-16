import React, { useState, useRef, useEffect } from "react";
import List from "./components/ComponentList";
import getIcons from "./icons";
import { CodeIcon } from "@heroicons/react/solid";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Modal from "./components/Modal";
import DraggableList from "./components/DraggableList";
import DeviceToolbar from "./components/DeviceToolbar";

const iconList = getIcons();

function App() {
  const [list, setList] = useState([]);
  const [theme, setTheme] = useState("green");
  const [darkMode, setDarkMode] = useState(false);
  const [markup, setMarkup] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deviceView, setDeviceView] = useState("desktop");

  const myRef = useRef(null);
  const markupRef = useRef(null);

  const handleScrollToLastElement = () => {
    myRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  function beautifyHTML(codeStr) {
    if (!codeStr) {
      return "";
    }
    const process = (str) => {
      let div = document.createElement("div");
      div.innerHTML = str.trim();
      return format(div, 0).innerHTML.trim();
    };

    const format = (node, level) => {
      let indentBefore = new Array(level++ + 1).join("  "),
        indentAfter = new Array(level - 1).join("  "),
        textNode;

      for (let i = 0; i < node.children.length; i++) {
        textNode = document.createTextNode("\n" + indentBefore);
        node.insertBefore(textNode, node.children[i]);

        format(node.children[i], level);

        if (node.lastElementChild === node.children[i]) {
          textNode = document.createTextNode("\n" + indentAfter);
          node.appendChild(textNode);
        }
      }

      return node;
    };
    return process(codeStr);
  }

  useEffect(() => {
    let newCode = beautifyHTML(markupRef?.current?.innerHTML);
    setMarkup((prevProps) => {
      return (newCode += "\n" + prevProps);
    });
  }, [list]);

  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SyntaxHighlighter style={vs2015} language="javascript" showLineNumbers>
          {markup}
        </SyntaxHighlighter>
      </Modal>

      <div>
        <div className="hidden md:flex md:w-48 md:flex-col md:fixed md:inset-y-0">
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
            <div className="flex-1 px-4 flex justify-between items-center ">
              <DeviceToolbar setDeviceView={setDeviceView} />
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  disabled={list.length === 0}
                  onClick={openModal}
                  className="disabled:bg-blue-200 flex items-center px-4 py-2 bg-blue-600 rounded-lg text-white"
                >
                  <CodeIcon className="h-5 w-5 mr-1" />
                  <p>View Code</p>
                </button>
              </div>
            </div>
          </div>

          <DraggableList
            deviceView={deviceView}
            theme={theme}
            markupRef={markupRef}
            list={list}
            setList={setList}
          />
        </div>
      </div>
    </>
  );
}

export default App;
